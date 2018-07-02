  
export function linkPracticeWithEditor(questionId){
  return{
    type:'LINK_EDITOR',
    questionId
  };
}

export function setTocken(token,userType){
  return{
    type:'SET_TOKEN',
    token,
    userType
  };
}
  
  