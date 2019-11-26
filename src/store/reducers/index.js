import { combineReducers } from 'redux';
import { issuesReducer } from './issues';

export const rootReducer = combineReducers({
  issues: issuesReducer,
});
