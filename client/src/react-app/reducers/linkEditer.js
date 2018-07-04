
function linkEditor(state=[],action){
  switch(action.type){
  case 'LINK_EDITOR':
    return Object.assign({},state,{questionId: action.questionId});
  default:
    if(!state.questionId){
      return Object.assign({},state,{questionId: 'undefined'});
    }
    return state;
  }
}

export default linkEditor;
