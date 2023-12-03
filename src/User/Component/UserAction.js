import axios from 'axios';
import {
    LOGIN_USER,
    SIGNUP_USER,
} from './types';

export function loginUser(dataToSubmit) {

    const request = axios.post('/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function SignuprUser(dataToSubmit) {

    const request = axios.post('/users/signup', dataToSubmit)
        .then(response => response.data)

    return {
        type: SIGNUP_USER,
        payload: request
    }
}