import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'http://localhost:8000/api'
})

axiosApi.interceptors.response.use(
    (res) => { return res },
    (err) => {
        if (
            err.response?.status === 401 &&
            window.location.pathname.substring(0, 6) !== '/login'
        ) {
            sessionStorage.removeItem('postsapp-login-token')
            window.location.href = '/login'
        }
        return Promise.reject(err)
    }
)

export default axiosApi