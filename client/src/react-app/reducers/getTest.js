
function getTest(state=[],action){
  switch(action.type){
  case 'SET_TEST':
    return Object.assign({},state,{testId:action.testId});
  default:
    return state;
  }
};

export default getTest;