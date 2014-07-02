Projects = new Meteor.Collection("projects");
/*

	label
	description
	website
	isPublic
	acl

*/

Lists = new Meteor.Collection("lists");
/*

	label
	projects
	acl

*/

Groups = new Meteor.Collection("groups");
/*

	label
	description
	website

*/

Tasks = new Meteor.Collection("tasks");
/*

	label
	description
	votes
	tags
	assignees
	project

*/

