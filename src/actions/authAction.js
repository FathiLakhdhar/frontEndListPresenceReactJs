import axios from 'axios';


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
    return {
        type: 'LOGOUT_ACTION'
    }
}