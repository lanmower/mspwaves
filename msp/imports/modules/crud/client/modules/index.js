import select from './select';
import textInput from './textInput';
import imageSelect from './imageSelect';
import slider from './slider';

const elements = {select, textInput, imageSelect, slider};

export default ({field, state, onChange=null})=>{
  return elements[field.element?field.element:'textInput'][field.view]({field, state, onChange});
}
