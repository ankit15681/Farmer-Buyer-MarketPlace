import { combineReducers } from 'redux';

import farmers from './farmers';
import auth from './auth';
import error from './error';

export const reducers = combineReducers({ farmers, auth, error });
