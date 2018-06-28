function getBusinessTest(state=[],action){
  switch(action.type){
  case 'ADD-BUSINESS_TEST':
    return Object.assign({},state,{businessTestId:action.businessTestId});
  default: 
    return state;
  }
}

export default getBusinessTest;