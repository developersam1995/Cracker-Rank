  
export function linkWithEditor(questionId,editorFor){
  return{
    type:'LINK_EDITOR',
    questionId,
    editorFor
  };
}

export function setQuestionIds(questionIds){
  return{
    type:'SET_QUESTION_IDS',
    questionIds
  };
}

export function setTestId(testId){
  return{
    type:'SET_TEST',
    testId
  };
}

export function submitTest(testActivity){
  return{
    type:'SUBMIT_TEST',
    testActivity
  };
}
  
