import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api'
})

axiosClient.interceptors.response.use(
    (res) => { return res },
    (err) => {
        if (err.response?.status === 401) {
            window.location.href = '/'
        }
        return err
    }
)

export default axiosClient