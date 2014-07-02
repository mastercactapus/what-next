if (Meteor.isClient) {

    Template.projectLists.lists = function() {
        return Lists.find({projectKey: this.key});
    };

    Template.projectLists.events({
        "click .list .panel-title": function(e) {
            console.log("edit")
        },
        "dragstart .list .panel-title": function(e) {
            console.log("dragstart")
            e.style.opacity = 0.4;
        },
        "click .new-list": function(e) {
            $(".new-list .frm").removeClass("hide");
            $(".new-list .stub").addClass("hide");
        },
        "click .create": function(e) {
            var name = $("#new-list-name").val().trim();

            if (!name) return false;
            $("#new-list-name").val("");

            Lists.insert({
                projectKey: this.key,
                name: name
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
