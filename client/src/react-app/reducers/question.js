
function question(state=[],action){
  switch(action.type){
  case 'SET_QUESTION_IDS':
    return Object.assign({},state,{questionIds: action.questionIds});
  default:
    if(!state.questionIds){
      return Object.assign({},state,{questionIds: []});
    }
    return state;
  }
}
  
export default question;
  