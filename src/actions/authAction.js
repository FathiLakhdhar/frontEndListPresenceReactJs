import axios from 'axios';
import {setAuthorizationToken} from '../axiosConfig';

export function setCurrentUserAction(data) {
    return {
        type: 'SET_CURRENT_USER',
        payload: data
    }
}

export function loginAction(data) {
    return dispatch => {
        return axios.post('api/auth/login', data);
    }
}


export function signUpAction(data) {
    return dispatch => {
        return axios.post('api/auth/signup', data);
    }
}


export function logout(){
    localStorage.removeItem('jwtoken');
    setAuthorizationToken();
    return {
        type: 'LOGOUT_ACTION'
    }
}