@Projects = new Meteor.Collection("projects")
@Lists = new Meteor.Collection("lists")
@Cards = new Meteor.Collection("cards")

Lists.allow
	update: -> true
	insert: -> true
	remove: -> true

Cards.allow
	update: -> true
	insert: -> true
	remove: -> true

Projects.allow
	update: -> true
	insert: -> true
	remove: -> true


if Meteor.isServer
	Meteor.publish "projects", ->
		Projects.find()
	Meteor.publish "lists", ->
		Lists.find()
	Meteor.publish "cards", ->
		Cards.find()
if Meteor.isClient
	Meteor.subscribe "projects"
	Meteor.subscribe "lists"
	Meteor.subscribe "cards"
