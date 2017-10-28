import { isEmpty } from 'lodash';
import jwt from 'jsonwebtoken';

let InitialUser = localStorage.getItem("jwtoken") ? { isAuthenticated: true, user: jwt.decode(localStorage.getItem("jwtoken")) } : { isAuthenticated: false, user: {} }


export default function (state = InitialUser, action) {
    const { type, payload } = action;
    switch (type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                isAuthenticated: !isEmpty(payload),
                user: payload
            };
        case 'LOGOUT_ACTION':
            return {
                isAuthenticated: false,
                user: {}
            };
        default:
            return state;
    }
}