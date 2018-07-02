
function linkEditor(state = [], action) {
  switch (action.type) {
    case 'LINK_EDITOR':
    state = Object.assign({}, state, { questionId: action.questionId });
    break;
  }
  return state;
}

export default linkEditor;