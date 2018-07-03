function getToken(state=[],action){
  if(localStorage.getItem('ptok')){
    let curToken = localStorage.getItem('ptok');
    return Object.assign({},state,{token:curToken});
  }else{
    return Object.assign({},state,{token:'unauthorized'});
  }
}

export default getToken;