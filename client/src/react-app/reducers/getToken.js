function getToken(state=[],action){
  if(localStorage.getItem('ptok') && localStorage.getItem('ptok')!=''){
    let curToken = localStorage.getItem('ptok');
    return Object.assign({},state,{token:curToken});
  }else{
    if(!state.token){
      return Object.assign({},state,{token:'unauthorized'});
    }
    return state;
  }
}

export default getToken;