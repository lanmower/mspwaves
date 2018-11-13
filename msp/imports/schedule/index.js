import PM from "platemale";
const config =
{
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
      name:'weekday',
      type: String,
      element: 'select',
      options: [
        {label:"Monday", value:"Monday"},
        {label:"Tuesday", value:"Tuesday"},
        {label:"Wednesday", value:"Wednesday"},
        {label:"Thursday", value:"Thursday"},
        {label:"Friday", value:"Friday"},
        {label:"Saturday", value:"Saturday"},
        {label:"Sunday", value:"Sunday"}
      ],
      label:'Weekday',
      default:'',
      required:true,
      requiredMessage: 'specify hosts.'
    },
    {
      name:'start',
      type: String,
      label:'Start',
      element: 'time',
      default:'',
      required:true,
      requiredMessage: 'specify start time.'
    },
    {
      name:'end',
      type: String,
      label:'End',
      element: 'time',
      default:'',
      required:true,
      requiredMessage: 'specify end time.'
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
}
//console.log(PM);
export default PM.initCollections(PM.defaults(config));
