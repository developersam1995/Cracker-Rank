
function linkEditor(state=[],action){
  switch(action.type){
  case 'LINK_EDITOR':
    return Object.assign({},state,{questionId: action.questionId});
  default: 
    return state;
  }
}

export default linkEditor;
