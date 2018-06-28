
function linkEditor(state=[],action){
  switch(action.type){
  case 'LINK_EDITOR':
    return Object.assign({},state,{questionId: action.questionId});
  default: 
    return Object.assign({},state,{questionId: ''});
  }
}

export default linkEditor;