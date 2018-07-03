import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import linkEditer from './linkEditer';
import getToken from './getToken';


const combinedReducer=combineReducers({linkEditer,getToken,routing:routerReducer});

export default combinedReducer;

