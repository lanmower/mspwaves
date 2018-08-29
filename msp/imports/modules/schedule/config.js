import defaults from '../crud/defaults';

export default defaults({
  name: "schedule",
  schema:
  [
    {
      name:'name',
      type: String,
      label:'Title',
      default:'',
      required:true,
      requiredMessage: 'specify title.'
    },
    {
      name:'hosts',
      type: String,
      label:'Hosts',
      default:'',
      required:true,
      requiredMessage: 'specify hosts.'
    },
    {
      name:'image',
      type: String,
      label:'Image url',
      default:'',
      required:true,
      requiredMessage: 'specify image url.'
    },
    {
      name:'description',
      type: String,
      label:'Description',
      default:'',
      inputType:"textArea",
      required:true,
      requiredMessage: 'specify description.'
    }

  ]
});
