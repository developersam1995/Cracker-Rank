import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import linkEditor from './linkEditor';
import getToken from './getToken';
import getTest from './getTest';
import question from './question';
import submitTest from './submitTest';

const combinedReducer=combineReducers({linkEditor,getToken,getTest,question,submitTest,routing:routerReducer});

export default combinedReducer;

