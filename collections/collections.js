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

Cards = new Meteor.Collection("cards");
/*

	label
	description
	votes
	tags
	assignees
	project

*/
