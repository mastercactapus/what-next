if (Meteor.isClient) {

	editor = new ReactiveAce



	Template.createProject.rendered = function() {
		var edit = ace.edit("createProjectDescription");
		editor.attach(edit)
		edit.setTheme("ace/theme/monokai");
		edit.getSession().setMode("ace/mode/markdown");
		edit.setHighlightActiveLine(true);


		var setval = lodash.throttle(function(){
				Session.set("createProjectDescription", edit.getValue());
			}, 1000);


		edit.getSession().on('change', setval); 
	};
	Template.createProject.descriptionPreview = function() {
		var desc = Session.get("createProjectDescription");

		if (!desc) return;

		return marked(desc);
	};

	Template.createProject.events({
		"click [rel=create]": function(e) {
			var name = $("#createProjectName").val();
			var web = $("#createProjectWebsite").val();
			var desc = $("#createProjectDescription").val();

			var key = name.toLowerCase().replace(/ /g,"-").replace(/[^a-z0-9-]/g,"");


			var ins = Projects.insert({
				name: name,
				website: web,
				description: desc,
				key: key
			});

			Router.go("projectPage", Projects.findOne(ins));

			return false;

		}
	});
}
