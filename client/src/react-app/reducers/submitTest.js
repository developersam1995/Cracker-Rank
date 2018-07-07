//Sumiting test on time over
function submitTest(state=[],action){
  switch(action.type){
  case 'SUBMIT_TEST':
    return Object.assign({},state,{testActivity:action.testActivity});
  default:
    if(localStorage.getItem('timer')!='00:00:00'){
      return Object.assign({},state,{testActivity:'Time Not Over'});
    }
    return Object.assign({},state,{testActivity:''});
  }
}

export default submitTest;