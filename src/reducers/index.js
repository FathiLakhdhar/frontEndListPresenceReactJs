import {combineReducers} from 'redux';
import authReducer from './authReducer';
export default combineReducers({
    current_user: authReducer
});