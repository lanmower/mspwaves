import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import rateLimit from './rate-limit';

const init = (collection, config) => {
  const verify = {};
  for(x in config.schema) {
    const {name, type} = config.schema[x];
    verify[name] = type;
  }
  if(config.methods.insert) {
    const methods = {};
    console.log("METHOD:"+collection._name+'.insert');
    methods[collection._name+'.insert'] = (doc)=>{
      check(doc, verify);
      return collection.insert({ owner: this.userId, ...doc });
    };
    Meteor.methods(methods);
  }
  if(config.methods.update) {
    const methods = {};
    console.log("METHOD: "+collection._name+'.update');
    methods[collection._name+'.update'] = (doc)=>{
        verify._id = String;
        check(doc, verify);
        const documentId = doc._id;
        collection.update(documentId, { $set: doc });
        return documentId; // Return _id so we can redirect to document after update.
    }
    Meteor.methods(methods);
  }
  if(config.methods.delete) {
    const methods = {};
    console.log("METHOD: "+collection._name+'.remove');
    methods[collection._name+'.remove'] = (doc)=>{
      check(documentId, String);
      return collection.remove(documentId);
    }
    Meteor.methods(methods);
  }
  rateLimit({
    methods: [
      collection._name+'.insert',
      collection._name+'.update',
      collection._name+'.remove',
    ],
    limit: 5,
    timeRange: 1000,
  });
};
export default init;
