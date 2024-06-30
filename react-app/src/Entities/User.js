import { useState } from "react"
import axiosApi from "../Plugins/axios"
import { useDispatch } from "react-redux"
import { setIsLoguedIn } from "../Store/authUserSlice"

export function useUser () {
    const [myProfileData, setMyProfileData] = useState({})
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [updateMyProfileErrorMessage, setUpdateMyProfileErrorMessage] = useState('')
    const [updateMyProfileSuccess, setUpdateMyProfileSuccess] = useState({})

    const dispatch = useDispatch()

    const getToken = () => {
        return sessionStorage.getItem('postsapp-login-token')
    }

    const isLoguedIn = () => {
        let token = getToken()
        if(token && token !== null) {
            dispatch(setIsLoguedIn(true))
            return true
        }
        dispatch(setIsLoguedIn(false))
        return false
    }

    const getMyProfileData = async () => {
        isLoguedIn()

        return await axiosApi
            .get(
                '/profile',
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
        setLoginSuccess(false)
        return await axiosApi.post('/login', loginData)
            .then((res) => {
                setLoginErrorMessage('')
                setLoginSuccess(true)
                sessionStorage.setItem('postsapp-login-token', res.data.token);
                dispatch(setIsLoguedIn(true))
                return res
            })
            .catch((err) => {
                setLoginSuccess(false)
                dispatch(setIsLoguedIn(false))
                if (err.response?.data?.errors)
                    setLoginErrorMessage(err.response.data.errors[0].msg)
                else if (err.response?.data?.message)
                    setLoginErrorMessage(err.response.data.message)
                else setLoginErrorMessage('Erro de login')
            });

    }

    const updateMyProfileData = async (updateProfileData) => {
        return await axiosApi
            .put(
                '/profile',
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
        dispatch(setIsLoguedIn(false))
        return;
    }

    return {
        getMyProfileData,
        getToken,
        isLoguedIn,
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