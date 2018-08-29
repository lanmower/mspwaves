const defaults = {
  offline:true,
  subscribe:true,
  insert:true,
  listView: {
    primary: ({name})=>{return name?name:''},
    secondary: () => {return null},
    extra: ()=>{return null}
  },
  views: {
    view: (data)=>{return data},
    print: (data)=>{return data},
    form: (data)=>{return data},
  },
  methods: {
    insert:true,
    remove:true,
    update:true
  },
  publish: {
    view:true,
    list:true
  },
  defaultRoutes: {
    view:true,
    new:true,
    edit:true,
    list:true
  }
};


export default (data) => {
  return Object.assign(defaults, data);
};
