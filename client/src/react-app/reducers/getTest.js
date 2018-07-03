
function getTest(state=[],action){
  switch(action.type){
  case 'SET_TEST':
    return Object.assign({},state,{testId:action.testId});
  default:
    return Object.assign({},state,{testId:'5b3b2097e5705812ad665de3'});
  }
};

export default getTest;