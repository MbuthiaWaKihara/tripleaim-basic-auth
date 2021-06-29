import axios, { AxiosResponse } from 'axios';
import {Credentials} from '../components/login-form';

export const signup = async (credentials: Credentials) => {
    try {
        const res: AxiosResponse = await axios.post('/signup', credentials);
        return res.data;
    } catch(error) {
        console.error(error);
        throw new Error(error.message);
    }
}

export const login = async (credentials: Credentials) => {
    try {
        const res: AxiosResponse = await axios.post('/login', credentials);
        return res.data;
    } catch(error) {
        console.error(error);
        throw new Error(error.message);
    }
}