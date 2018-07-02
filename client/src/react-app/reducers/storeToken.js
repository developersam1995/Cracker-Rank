function storeToken(state=[],action){
  switch(action.type){
    case 'SET_TOKEN':
      return Object.assign({},state,{token:action.token});
    default :
      return Object.assign({},state,{token:'unauthorized'});
  }
}

export default storeToken;