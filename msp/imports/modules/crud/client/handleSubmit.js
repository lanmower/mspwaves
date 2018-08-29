export default handleSubmit(history, collection, config, doc, state) {
  const {schema} = config;
  const collectionName = collection._name;
  const existing = doc && doc._id;
  const methodToCall = existing ? collectionName+'.update' : collectionName+'.insert';
  const doc = {};
  schema.map((field)=>{
    doc[field.name] = this.state[field.name];
  });

  if (existing) doc._id = existing;

  Meteor.call(methodToCall, doc, (error, id) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    }
    else {
      const confirmation = existing ? 'Updated!' : 'Added!';
      this.form.reset();
      Bert.alert(confirmation, 'success');
      history.push(`/${collectionName}/${id}`);
    }
  });
}
