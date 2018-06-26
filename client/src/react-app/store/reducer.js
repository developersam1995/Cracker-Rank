// import { createStore } from 'redux';
const redux = require('redux');
createStore = redux.createStore;
const initalstate = {
  data: '1'
};
//store
//Reducer
const rootReducer = (state = initalstate, action) => {
  return state;
};


const store = createStore(rootReducer);
console.log(store.getState());



//Dispanching Action



//substraction Action