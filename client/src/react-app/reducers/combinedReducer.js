import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import linkEditer from './linkEditer';
import getToken from './getToken';
import getTest from './getTest';


const combinedReducer=combineReducers({linkEditer,getToken,getTest,routing:routerReducer});

export default combinedReducer;

