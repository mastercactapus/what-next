if (Meteor.isClient) {
function selectText(element) {
    var doc = document
        , range, selection
    ;
    if (doc.body.createTextRange) { //ms
        range = doc.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) { //all others
        selection = window.getSelection();
        range = doc.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
    Template.projectLists.lists = function() {
        return Lists.find({projectKey: this.key}, {sort: {sortIndex: 1}});
    };
    Template.projectLists.rendered = function() {
        $("ul.lists").sortable({
            handle: ".panel-heading",
            placeholder: "list-shadow",
            axis: "x",
            delay: 200,
            tolerance: "pointer",
            cancel: "[contenteditable]"
        });
        $("ul.lists").disableSelection();

    }

    Template.projectLists.events({
        "sortstart ul.lists": function(e) {
            $("li.new-list").addClass("hide");
        },
        "sortstop ul.lists": function(e) {
            $("li.new-list").removeClass("hide");

            $("li.list").each(function(index, li){
                var _id = $(li).data("id");
                Lists.update({_id: _id}, {
                    $set: {sortIndex: index}
                });
            });

        },
        "click .list .panel-title": function(e) {
            $(e.target).addClass("form-control form-control-sm");
            $(e.target).attr("contenteditable", true);
            $("ul.lists").enableSelection();
            $(e.target).focus();
            selectText(e.target);
        },
        "blur [contenteditable]": function(e) {
            $(e.target).removeClass("form-control form-control-sm");
            $(e.target).removeAttr("contenteditable");
            $("ul.lists").disableSelection();

            Lists.update({_id: this._id}, {
                $set: {name: $(e.target).text()}
            });
        },

        "click .new-list": function(e) {
            $(".new-list .frm").removeClass("hide");
            $(".new-list .stub").addClass("hide");
        },
        "click .create": function(e) {
            var name = $("#new-list-name").val().trim();

            if (!name) return false;
            $("#new-list-name").val("");

            var index = Lists.find({projectKey: this.key}).count();

            Lists.insert({
                projectKey: this.key,
                name: name,
                sortIndex: index
            });

            $(".new-list .frm").removeClass("hide");
            $(".new-list .stub").addClass("hide");

            return false;
        },
        "mouseenter .list-creator": function(e) {
            var $t = $(e.target);

            $t.find(".list").removeClass("hide");
            $t.find(".stub").addClass("hide");
        }
    })
}
