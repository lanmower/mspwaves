/* eslint-disable consistent-return */
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import initMethods from './methods.js';

const getSchema = (config)=> {
  const {name} = config;
  schema = {
    owner: {
      type: String,
      label: 'The ID of the user this '+name+' belongs to',
      required:false,
      autoValue() {
        if (this.isInsert) return Meteor.userId();
      }
    },
    createdAt: {
      type: String,
      label: 'The creation date',
      autoValue() {
        if (this.isInsert) return (new Date()).toISOString();
      },
    },
    updatedAt: {
      type: String,
      label: 'The last update date',
      autoValue() {
        if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
      },
    }
 };
 for(x in config.schema) {
   const {type, label, name} = config.schema[x];
   schema[name] = { type,label }
 }
  return new SimpleSchema(schema);
}

const init = (config) => {
  console.log("COLLECTION: ", config.name);
  const {schema, name, offline} = config
  const serverCollection = new Meteor.Collection(name);
  serverCollection.attachSchema(getSchema(config));
  if(!Meteor.collections) Meteor.collections = {};
  if(Meteor.isServer) initMethods(serverCollection, config);
  if(Meteor.isClient && offline) {
    const clientCollection = new Ground.Collection(name);
    const submissionsCollection = new Ground.Collection(name+'-submissions');
    clientCollection.observeSource(serverCollection.find());
    clientCollection._name = name;
    submissionsCollection._name = name;
    const collections = {
      clientCollection,
      submissionsCollection,
      serverCollection
    };
    Meteor.collections[name] = collections;
    const {defaultRoutes} = require('./client/crudRoutes.js');
    return defaultRoutes({clientCollection, serverCollection, submissionsCollection, config});
  }
  if(Meteor.isServer) {
    const initPublications = require('./server/publications.js');
    export const publications = initPublications.default(serverCollection, config);
    return {serverCollection, publications}
  }
 }


export default init;
