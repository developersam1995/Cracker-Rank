
function question(state=[],action){
  switch(action.type){
  case 'ADD_QUESTION':
    state = Object.assign({},state,{question: action.question});
    break;
  }
    
  return state;
}
    
export default question;