reindexCards = (ul) ->
    $ul = $(ul)
    listId = $ul.data "listId"
    $ul.find("li.card").each (index, li)->
        cardId = $(li).data("cardId")
        Cards.update {_id: cardId},
            $set:
                listId: listId
                sortIndex: index

createCard = (listId, label) ->
    index = Cards.find(listId: listId).count()
    Cards.insert
        listId: listId
        label: label
        sortIndex: index

Template.list.cards = ->
    Cards.find
        listId: @_id
    ,
        sort:
            sortIndex: 1

Template.list.rendered = ->
    $("ul.cards").sortable
        connectWith: "ul.cards"
        handle: ".panel-body"
        placeholder: "card-shadow"
        delay: 200
        tolerance: "pointer"

Template.list.events
    sortstart: (e) ->
        $("body").addClass "sort-cards"
    sortstop: (e) ->
        $("body").removeClass "sort-cards"
    "sortreceive ul.cards": (e) ->
        mrElement = $(e.originalEvent.target).closest("li")
        reindexCards e.target
        mrElement.remove()
    "sortremove ul.cards": (e) ->
        reindexCards e.target
    "click .new-card": (e) ->
        $(e.target).closest("[rel=new]").addClass "active"
        $(e.target).find("textarea").focus()
    "blur textarea": (e) ->
        data = $(e.target).val().trim()
        $(e.target).closest("[rel=new]").removeClass "active"
        addCard @_id, data  if data
        $(e.target).val ""
    "keyup textarea": (e) ->
        if e.keyCode is 13 and not e.shiftKey
            data = $(e.target).val().trim()
            addCard @_id, data  if data
            $(e.target).val ""
        else if e.keyCode is 27
            $(e.target).val ""
            $(e.target).closest("[rel=new]").removeClass "active"
