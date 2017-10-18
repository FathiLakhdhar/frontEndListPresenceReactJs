import { isEmpty } from 'lodash';

const InitialUser = {
    isAuthenticated: false,
    user: {}
}


export default function (state = InitialUser, action) {
    const { type, payload } = action;
    switch (type) {
        case 'SET_CURRENT_USER':
            return {
                isAuthenticated: !isEmpty(payload),
                user: payload
            };
        case 'LOGOUT_ACTION':
            return InitialUser;
        default:
            return state = { ...state };
    }
}