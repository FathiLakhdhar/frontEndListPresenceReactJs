import axios from 'axios';
import {setAxiosBaseUrl} from '../axiosConfig';

export function addListPresenceAction(data){
    return dispatch => axios.post('api/admin/newlp', data);
}

export function getAllUsersByRole(role){
    setAxiosBaseUrl();
    return dispatch => axios.get('api/admin/getUsersByRole?role='+role);
}