import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import linkEditer from './linkEditer';
import storeToken from './storeToken';


const combinedReducer=combineReducers({linkEditer,storeToken,routing:routerReducer});

export default combinedReducer;

