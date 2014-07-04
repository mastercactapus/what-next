selectText = (el) ->
    if document.body.createTextRange
        range = document.body.createTextRange()
        range.moveToElementText el
        range.select()
    else if window.getSelection
        selection = window.getSelection()
        range = document.createRange()
        range.selectNodeContents el
        selection.removeAllRanges()
        selection.addRange range

startEdit = (el) ->
    $("ul.lists").enableSelection()
    $el = $(el)
    $el.addClass("editing")
    $el.find(".editor").focus()
    $el.find(".editor").select()

stopEdit = (el) ->
    $("ul.lists").disableSelection()
    $el = $(el)
    $el.removeClass("editing")

Template.lists.lists = ->
    Lists.find {projectKey: @key}, {sort: {sortIndex: 1}}

Template.lists.rendered = ->
    $("ul.lists").sortable
        handle: ".panel-heading"
        placeholder: "list-shadow"
        axis: "x"
        delay: 200
        tolerance: "pointer"
        cancel: "[contenteditable]"

Template.lists.events
    "sortstart ul.lists": (e)->
        $("li.new-list").addClass "hide"
    "sortstop ul.lists": (e) ->
        $("li.new-list").removeClass "hide"
        $("li.list").each (index,li)->
            id = $(li).data "id"
            Lists.update {_id: id},
                $set: {sortIndex: index}
    "click .list .panel-title": (e) ->
        startEdit $(e.target).closest(".panel-heading")
    "blur .panel-heading .editor": (e)->
        $t = $(e.target)
        val = $t.val().trim()
        if val then Lists.update {_id: @_id},
            $set: {name: val}
        $t.val(@name)
        stopEdit $t.closest ".panel-heading"

    "keyup .panel-heading .editor": (e)->
        $t = $(e.target)
        if e.keyCode is 13 and not e.shiftKey
            val = $t.val().trim()
            if val then Lists.update {_id: @_id},
                $set: {name: val}
            $t.val(@name)
            stopEdit $t.closest ".panel-heading"
        else if e.keyCode is 27
            $t.val(@name)
            stopEdit $t.closest ".panel-heading"
    "click .new-list": (e)->
        $(".new-list .frm").removeClass "hide"
        $(".new-list .stub").addClass "hide"
    "click .create": (e)->
        name = $("#new-list-name").val().trim()
        return false unless name
        $("#new-list-name").val("")
        index = Lists.find(projectKey: @key).count()
        Lists.insert
            projectKey: @key
            name: name
            sortIndex: index
        $(".new-list .frm").removeClass "hide"
        $(".new-list .stub").addClass "hide"
        false
