if (Meteor.isServer) {
	Meteor.startup(function(){
		Projects._ensureIndex({ "name": 1});
	});
}

if (Meteor.isClient) {
	Session.setDefault("projectSearchFilter", "");

	Template.projectSearch.results = function() {
		return Projects.find({name: {
			$regex: ".*" + Session.get("projectSearchFilter") + ".*",
			$options: "i"
		}});
	};


	Template.projectListView.events({
		"input [rel=searchFilter]": function(e) {
			Session.set("projectSearchFilter", $(e.target).val());
		}
	});
}
