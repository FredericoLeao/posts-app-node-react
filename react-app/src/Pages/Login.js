import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../Entities/User"

export default function LoginPage () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const User = useUser()

    const submit = async () => {
        const loginData = {
            email: email,
            password: password,
        }

        await User.login(loginData)
            .then((res) => {
                if (res.status === 200)
                    setTimeout(() => navigate('/meus-dados'), 720)
            })
            .catch(() => {})
    }

    const LoginError = () => {
        if (User.loginErrorMessage != '')
            return (
                <div className="alert alert-danger my-2">{User.loginErrorMessage}</div>
            )
    }
    const LoginSuccess = () => {
        if (User.loginSuccess === true)
            return (
                <div className="alert alert-success my-2">Login efetuado!</div>
            )
    }

    return (
            <div className="signup">
                <div className="head">
                    <LoginError />
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
