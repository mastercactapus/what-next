if (Meteor.isClient) {

    Template.list.cards = function() {
        return Cards.find({listId: this._id}, {sort: {sortIndex: 1}});
    }

    Template.list.rendered = function() {

        $("ul.cards").sortable({
            connectWith: "ul.cards",
            handle: ".panel-body",
            placeholder: "card-shadow",
            delay: 200,
            tolerance: "pointer"
        });
    };

    Template.list.events({
        "sortstart": function(e) {
            $("body").addClass("sort-cards");
        },
        "sortstop": function(e) {
            $("body").removeClass("sort-cards");
        },
        "sortreceive ul.cards": function(e) {
            var listId = $(e.target).data("listId");

            var mrElement = $(e.originalEvent.target).closest("li");

            $(e.target).find("li.card").each(function(index, el){
                var id = $(el).data("cardId");

                Cards.update({_id: id}, {
                    $set: {
                        listId: listId,
                        sortIndex: index
                    }
                });

                //duplication fix
                mrElement.remove();
            });
        },
        "sortremove ul.cards": function(e) {
            var listId = $(e.target).data("listId");
            $(e.target).find("li.card").each(function(index, el){
                var id = $(el).data("cardId");

                Cards.update({_id: id}, {
                    $set: {
                        listId: listId,
                        sortIndex: index
                    }
                });
            })
        },


        "click .new-card": function(e) {
            $(e.target).closest("[rel=new]").addClass("active");
            $(e.target).find("textarea").focus();
        },
        "blur textarea": function(e) {
            var data = $(e.target).val().trim();

            $(e.target).closest("[rel=new]").removeClass("active");

            if (data) {
                var index = Cards.find({listId: this._id}).count();
                Cards.insert({
                    label: data,
                    listId: this._id,
                    projectKey: this.projectKey,
                    index: index
                });
            }

            $(e.target).val("");
        },
        "keyup textarea": function(e) {
            if (e.keyCode === 13 && !e.shiftKey) {
                var data = $(e.target).val().trim();
                if (data) {
                    var index = Cards.find({listId: this._id}).count();
                    Cards.insert({
                        label: data,
                        listId: this._id,
                        projectKey: this.projectKey,
                        index: index
                    });
                }

                $(e.target).val("");
            } else if (e.keyCode === 27) {
                $(e.target).val("");
                $(e.target).closest("[rel=new]").removeClass("active");
            }
        }
    });
















}
