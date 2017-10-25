import { combineReducers } from 'redux';
import authReducer from './authReducer';
import todosReducer from './todosReducer';
export default combineReducers({
    current_user: authReducer,
    todos: todosReducer,
});