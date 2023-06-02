import axios from 'axios'
import useSWR from 'swr'

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

export const createSession = (username, password) => {
    return api.post('/auth/', { username, password });
};


export const useAxios = (url) => {
    const { data, error, mutate} = useSWR(url, async url => {
        const response = await api.get(url);

        return response.data
        
    })
    // })
    return {data, mutate}
}