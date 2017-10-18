import axios from 'axios';

export default function setAuthorizationToken (token) {
    (token) ? axios.defaults.headers.common['Authorization'] = token : delete axios.defaults.headers.common['Authorization'];
}