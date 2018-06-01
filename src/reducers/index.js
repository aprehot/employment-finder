import { combineReducers } from 'redux';
import projects from './projects_reducers';

const rootReducer = combineReducers({
  projects
})

export default rootReducer;
