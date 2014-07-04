Router.map(function(){

	this.route("home", {
		path: "/",
		template: "projectListView"
	});

	this.route("createProject", {
		path: "/projects.create",

	});

	this.route("projectPage", {
		path: "/projects/:key",
		data: function() {
			return Projects.findOne({key: this.params.key});
		}
	});
});
