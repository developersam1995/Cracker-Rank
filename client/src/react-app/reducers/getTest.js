
function getTest(state=[],action){
  switch(action.type){
  case 'SET_TEST':
    return Object.assign({},state,{testId:action.testId});
  default:
    return Object.assign({},state,{testId:'undefined'});
  }
};

export default getTest;