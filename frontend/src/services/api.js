import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:8000"
})

export const createSession = (username, password) => {
    return api.post('/auth/', { username, password });
};
