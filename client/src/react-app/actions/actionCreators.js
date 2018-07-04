  
export function linkWithEditor(questionId){
  return{
    type:'LINK_EDITOR',
    questionId
  };
}

export function setTestId(testId){
  return{
    type:'SET_TEST',
    testId
  };
}
  
