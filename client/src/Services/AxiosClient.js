import axios from 'axios'
import { useAuth } from '../Hooks/useAuth'

const client = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

client.interceptors.request.use(async (config) => {
    const t = await localStorage.getItem('accessToken')
    config.headers['Authorization'] = `Bearer ${t}`
    return config
}, undefined)

client.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        let res = error.response;
        if (res.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken')
            const { data } = await client.post('/auth/refreshToken', { refreshToken })
            localStorage.getItem('accessToken', data.accessToken)
        }
        if (error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export default client