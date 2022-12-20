import axios from 'axios'

export const api = axios.create({
    baseURL: "http://10.0.0.150:8000"
})

export const createSession = (username, password) => {
    return api.post('/auth/', { username, password });
};
