function getBusinessTest(state=[],action){
  switch(action.type){
  case 'ADD-BUSINESS_TEST':
    state = Object.assign({},state,{businessTestId:action.businessTestId});
    break;
  }
  return state;
}

export default getBusinessTest;