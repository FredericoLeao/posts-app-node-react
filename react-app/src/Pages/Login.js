import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function LoginPage () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [formError, setFormError] = useState('');

    const navigate = useNavigate()

    const submit = () => {
        const loginData = {
            email: email,
            password: password,
        }
        axios.post('http://localhost:8000/api/login', loginData)
            .then(async (res) => {
                setFormError('')
                setLoginSuccess(true)
                sessionStorage.setItem('postsapp-login-token', res.data.token);
                navigate('/meus-dados')
            })
            .catch((err) => {
                setLoginSuccess(false)
                if (err.response?.data?.errors)
                    setFormError(err.response.data.errors[0].msg)
                else if (err.response?.data?.message)
                    setFormError(err.response.data.message)
                else setFormError('Erro de login')
            });
    }

    const FormError = () => {
        if (formError != '')
            return (
                <div className="alert alert-danger my-2">{formError}</div>
            )
    }
    const LoginSuccess = () => {
        if (loginSuccess === true)
            return (
                <div className="alert alert-success my-2">Login efetuado!</div>
            )
    }

    return (
            <div className="signup">
                <div className="head">
                    <FormError />
                    <LoginSuccess />
                </div>
                <form>
                <div className="row my-1">
                    <div className="">
                    <label>Email:</label>
                    <input
                        id="email"
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className="row mt-2">
                    <div className="">
                    <input
                        id="email"
                        type="button"
                        value="Entrar"
                        className="btn btn-primary form-control"
                        onClick={(e) => submit()}
                    />
                    </div>
                </div>
                </form>
            </div>
    )
}
