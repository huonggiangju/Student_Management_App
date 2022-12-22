// import httpClient from '../http-common';
import axios from "axios";

const API_URL = 'http://localhost:8080/api/student';

const getAll = () =>{
    return axios.get(API_URL + '/list' );

}

const create = (data) =>{
    return axios.post(API_URL + '/add', data);
}

const getById = id =>{
    return axios.get(API_URL + `/${id}`);
}

const update = (id, data)=>{
    return axios.put(API_URL + `/update/${id}`, data);
}

const remove = (id) =>{
    return axios.delete(API_URL + `/delete/${id}`);
}

export default {getAll, create, getById, update, remove}