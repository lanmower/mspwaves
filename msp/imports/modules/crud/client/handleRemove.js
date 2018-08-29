
export default handleRemove = (_id, collection) => {
  if (confirm('Are you sure? This is permanent!')) {
    collection.remove(_id, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      else {
        Bert.alert('Deleted!', 'success');
      }
    });
  }
};
