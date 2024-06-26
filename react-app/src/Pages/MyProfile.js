import { componentDidMount, useEffect, useState } from "react"
import axios from "axios"

export default function SignUpPage () {
    const [myProfileData, setMyProfileData] = useState({})
    const [httpLoading, setHttpLoading] = useState(false)
    const [formSuccess, setFormSuccess] = useState(false)
    const [formError, setFormError] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        setHttpLoading(true)
        axios
            .get(
                'http://localhost:8000/api/profile',
                { headers: { Authorization: sessionStorage.getItem('postsapp-login-token') } }
            )
            .then((res) => {
                setMyProfileData(res.data)
                setName(res.data.name)
            })
            .catch((res) => {
              console.log('erro ??')
              console.log(res.response?.data)
              setMyProfileData({ error: true })
            })
            .finally(() => setHttpLoading(false))
    }, []);

    const submit = () => {
        axios
            .put(
                'http://localhost:8000/api/profile',
                {
                    name: name,
                    password: password,
                    confirmPassword: confirmPassword,
                },
                { headers: { Authorization: sessionStorage.getItem('postsapp-login-token') } }
            )
            .then((res) => {
                setFormSuccess(true)
                setFormError('')
            })
            .catch((err) => {
                setFormSuccess(false)
                if (err.response?.data?.errors)
                    setFormError(err.response.data.errors[0].msg)
                else if (err.response?.data?.message)
                    setFormError(err.response.data.message)
            })
    }
    const FormError = () => {
        if (formError != '')
            return (
                <div className="alert alert-danger my-2">{formError}</div>
            )
    }
    const FormSuccess = () => {
        if (formSuccess === true)
            return (
                <div className="alert alert-success my-2">Atualizado!</div>
            )
    }

    return (
            <div className="">

                <div className="head">
                    <FormSuccess />
                    <FormError />
                </div>
                <form>
                <div className="row mb-3">
                    <div class="border-bottom">
                    {myProfileData.email}
                    </div>
                </div>
                <div className="row mb-1">
                    <div>
                        <label>Nome:</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row my-1">
                    <div className="">
                    <label>Senha:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                </div>
                <div className="row my-1">
                    <div className="">
                    <label>Confirme a senha:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="">
                    <input
                        id="email"
                        type="button"
                        value="Atualizar"
                        className="btn btn-primary form-control"
                        onClick={(e) => submit()}
                    />
                    </div>
                </div>
                </form>
            </div>
    )
}
