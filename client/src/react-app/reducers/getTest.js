
function getTest(state=[],action){
  switch(action.type){
  case 'SET_TEST':
    return Object.assign({},state,{testId:action.testId});
  default:
    if(!state.testId){
      return Object.assign({},state,{testId:'undefined'});
    }
    return state;
  }
};

export default getTest;