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

Template.projectLists.lists = ->
    Lists.find {projectKey: @key}, {sort: {sortIndex: 1}}

Template.projectLists.rendered = ->
    $("ul.lists").sortable
        handle: ".panel-heading"
        placeholder: "list-shadow"
        axis: "x"
        delay: 200
        tolerance: "pointer"
        cancel: "[contenteditable]"

Template.projectLists.events
    "sortstart ul.lists": (e)->
        $("li.new-list").addClass "hide"
    "sortstop ul.lists": (e) ->
        $("li.new-list").removeClass "hide"
        $("li.list").each (index,li)->
            id = $(li).data "id"
            Lists.update {_id: id},
                $set: {sortIndex: index}
    "click .list .panel-title": (e) ->
        $t = $(e.target)
        $t.addClass "form-control form-control-sm"
        $t.attr "contenteditable", true
        $("ul.lists").enableSelection()
        $t.focus()
        selectText e.target
    "blur .panel-title[contenteditable]": (e)->
        $t = $(e.target)
        $t.removeClass "form-control form-control-sm"
        $t.removeAttr("contenteditable")
        $("ul.lists").disableSelection()
        Lists.update {_id: @_id},
            $set: {name: $t.text().trim()}
    "keyup .panel-title[contenteditable]": (e)->
        if e.keyCode is 13 and not e.shiftKey
            $t = $(e.target)
            $t.removeClass "form-control form-control-sm"
            $("ul.lists").disableSelection()
            val = $t.text().trim()
            Lists.update {_id: @_id},
                $set: {name: val}
            $t.text val
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
    "mouseenter .list-creator": (e) ->
        $t = $(e.target);
        $t.find(".list").removeClass("hide");
        $t.find(".stub").addClass("hide");
