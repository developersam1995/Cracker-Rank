

export function addQuestion(question){
  return{
    type:'ADD_QUESTION',
    question
  };
}
  
export function linkWithEditor(questionId){
  return{
    type:'LINK_EDITOR',
    questionId
  };
}

export function addBusinessTest(businessTestId){
  return{
    type:'ADD-BUSINESS_TEST',
    businessTestId
  };
}
  
  