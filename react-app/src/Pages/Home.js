import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function HomePage () {
    const [myProfileData, setMyProfileData] = useState({})
    const [httpLoading, setHttpLoading] = useState(false)

    const MyProfileData = () => {
        if (httpLoading === true) return;
        if (!myProfileData || Object.keys(myProfileData).length === 0) {
            setHttpLoading(true)
            axios
                .get(
                    'http://localhost:8000/api/profile',
                    { headers: { Authorization: sessionStorage.getItem('postsapp-login-token') } }
                )
                .then((res) => {
                    setMyProfileData(res.data)
                })
                .catch((res) => {
                    setMyProfileData({ error: true })
                })
                .finally(() => setHttpLoading(false))
        }
        return
    }

    return (
        <div className="nav">
            <MyProfileData />
        </div>
    )
}
