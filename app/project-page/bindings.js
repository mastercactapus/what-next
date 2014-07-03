if (Meteor.isClient) {

    Template.projectLists.lists = function() {
        return Lists.find({projectKey: this.key}, {sort: {sortIndex: 1}});
    };
    Template.projectLists.rendered = function() {
        $("ul.lists").sortable({
            handle: ".panel-title",
            placeholder: "list-shadow",
            axis: "x",
            delay: 200,
            tolerance: "pointer"
        });
        $("ul.lists").disableSelection();
    }

    Template.projectLists.events({
        "sortstart ul": function(e) {
            $("li.new-list").addClass("hide");
        },
        "sortstop ul": function(e) {
            $("li.new-list").removeClass("hide");

            $("li.list").each(function(index, li){
                var _id = $(li).data("id");
                Lists.update({_id: _id}, {
                    $set: {sortIndex: index}
                });
            });

        },
        "click .list .panel-title": function(e) {
            console.log("edit")
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
