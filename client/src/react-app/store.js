import { createStore } from 'redux';
import combinedReducer from './reducers/combinedReducer';


function saveToLocalStorage(state){
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state',serializedState);
  }catch(e){
    console.log(e);
  }
}

function loadFromLocalStorage(){
  try{
    const serializedState = localStorage.getItem('state');
    if(!serializedState) return undefined;
    return JSON.parse(serializedState);
  }catch(e){
    console.log(e);
    return undefined;
  }
}

let storedState ={};
if(loadFromLocalStorage()!=undefined){
  storedState = loadFromLocalStorage();
}

export const store = createStore(combinedReducer,storedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(()=>saveToLocalStorage(store.getState()));