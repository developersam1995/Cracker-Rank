import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import question from './questionReducer';
import linkEditer from './linkEditer';


const combinedReducer=combineReducers({question,linkEditer,routing:routerReducer});

export default combinedReducer;

