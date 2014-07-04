if (Meteor.isClient) {

    function reindexCards(ul) {
        var $ul = $(ul);
        var listId = $ul.data("listId");

        $ul.find("li.card").each(function(index, li){
            var cardId = $(li).data("cardId");

            Cards.update({_id: cardId},{
                $set: {
                    listId: listId,
                    sortIndex: index
                }
            });
        });
    }

    function addCard(listId, label) {
        var index = Cards.find({listId: listId}).count();
        Cards.insert({
            listId: listId,
            label: label,
            sortIndex: index
        });
    }

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
            var mrElement = $(e.originalEvent.target).closest("li");

            reindexCards(e.target);
            mrElement.remove();
        },
        "sortremove ul.cards": function(e) {
            reindexCards(e.target);
        },
        "click .new-card": function(e) {
            $(e.target).closest("[rel=new]").addClass("active");
            $(e.target).find("textarea").focus();
        },
        "blur textarea": function(e) {
            var data = $(e.target).val().trim();
            $(e.target).closest("[rel=new]").removeClass("active");
            if (data) {
                addCard(this._id, data);
            }
            $(e.target).val("");
        },
        "keyup textarea": function(e) {
            if (e.keyCode === 13 && !e.shiftKey) {
                var data = $(e.target).val().trim();
                if (data) {
                    addCard(this._id, data);
                }
                $(e.target).val("");
            } else if (e.keyCode === 27) {
                $(e.target).val("");
                $(e.target).closest("[rel=new]").removeClass("active");
            }
        }
    });
















}
