import axios from 'axios';

export  function setAuthorizationToken (token) {
    (token) ? axios.defaults.headers.common['Authorization'] = 'Bearer '+token : delete axios.defaults.headers.common['Authorization'];
}

export function setAxiosBaseUrl(base = 'http://localhost:3030/'){
    axios.defaults.baseURL = base;
}