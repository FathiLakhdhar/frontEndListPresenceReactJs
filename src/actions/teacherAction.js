import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3030/';
export function addListPresenceAction(data){
    return dispatch => axios.post('api/admin/newlpt', data);
}

export function getAllTeachersAction(){
    return dispatch => axios.get(`api/admin/getUsersByRole?role=ROLE_TEACHER`);
}

