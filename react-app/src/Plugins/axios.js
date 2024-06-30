import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api'
})

axiosClient.interceptors.response.use(
    (res) => { return res },
    (err) => {
        if (
            err.response?.status === 401 &&
            window.location.pathname.substring(0, 6) !== '/login'
        ) {
            sessionStorage.removeItem('postsapp-login-token')
            window.location.href = '/login'
        }
        return err
    }
)

export default axiosClient