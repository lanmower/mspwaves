import '/imports/modules/serverModules';
Schedule = new Mongo.Collection("schedule");
Meteor.publish("schedule", ()=>{
  return Schedule.find();
});
