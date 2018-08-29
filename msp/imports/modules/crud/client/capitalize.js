export default (str)=>{
  return str.replace(/^\w/, c => c.toUpperCase());
}
