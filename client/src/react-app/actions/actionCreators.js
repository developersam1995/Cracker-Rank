

export function addQuestion(question){
  return{
    type:'ADD_QUESTION',
    question
  };
}
  
export function linkPracticeWithEditor(questionId){
  return{
    type:'LINK_EDITOR',
    questionId
  };
}
  
  