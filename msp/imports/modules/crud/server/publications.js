import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
const init = (serverCollection, config) => {
  const {_name} = serverCollection;
  if(config.publish.list) {
    console.log("PUBLICATION:", _name);
    Meteor.publish(_name, function collection() {
      return serverCollection.find({ owner: this.userId });
    });
  }
  if(config.publish.view) {
    console.log("PUBLICATION:", _name+".view");
    Meteor.publish(_name+'.view', function decksView(_id) {
      check(_id, String);
      const owner = this.userId;
      return serverCollection.find({ _id, owner });
    });
  }
}
export default init;
