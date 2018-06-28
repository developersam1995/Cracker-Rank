import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import linkEditer from './linkEditer';


const combinedReducer=combineReducers({linkEditer,routing:routerReducer});

export default combinedReducer;

