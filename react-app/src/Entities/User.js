import { useState } from "react"
import axios from "axios"

export function useUser () {
    const [myProfileData, setMyProfileData] = useState({})
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const [loginSuccess, setLoginSuccess] = useState({})
    const [updateMyProfileErrorMessage, setUpdateMyProfileErrorMessage] = useState('')
    const [updateMyProfileSuccess, setUpdateMyProfileSuccess] = useState({})

    const getToken = () => {
        return sessionStorage.getItem('postsapp-login-token')
    }

    const isLogguedIn = () => {
        let token = getToken()
        if(token && token !== null) {
          return true
        }
        return false
    }

    const getMyProfileData = async () => {
        return await axios
            .get(
                'http://localhost:8000/api/profile',
                { headers: { Authorization: sessionStorage.getItem('postsapp-login-token') } }
            )
            .then((res) => {
                setMyProfileData(res.data)
            })
            .catch((res) => {
              setMyProfileData({})
            })
        return
    }

    const login = async (loginData) => {
        return await axios.post('http://localhost:8000/api/login', loginData)
            .then(async (res) => {
                setLoginErrorMessage('')
                setLoginSuccess(true)
                sessionStorage.setItem('postsapp-login-token', res.data.token);
            })
            .catch((err) => {
                setLoginSuccess(false)
                if (err.response?.data?.errors)
                    setLoginErrorMessage(err.response.data.errors[0].msg)
                else if (err.response?.data?.message)
                    setLoginErrorMessage(err.response.data.message)
                else setLoginErrorMessage('Erro de login')
            });

    }

    const updateMyProfileData = async (updateProfileData) => {
        return await axios
            .put(
                'http://localhost:8000/api/profile',
                updateProfileData,
                { headers: { Authorization: getToken() } }
            )
            .then((res) => {
                setUpdateMyProfileSuccess(true)
                setUpdateMyProfileErrorMessage('')
            })
            .catch((err) => {
                setUpdateMyProfileSuccess(false)
                if (err.response?.data?.errors)
                    setUpdateMyProfileErrorMessage(err.response.data.errors[0].msg)
                else if (err.response?.data?.message)
                    setUpdateMyProfileErrorMessage(err.response.data.message)
            })
    }

    const logout = () => {
        sessionStorage.removeItem('postsapp-login-token')
        return;
    }

    return {
        getMyProfileData,
        getToken,
        isLogguedIn,
        login,
        loginErrorMessage,
        loginSuccess,
        logout,
        myProfileData,
        updateMyProfileData,
        updateMyProfileErrorMessage,
        updateMyProfileSuccess,
    }
}