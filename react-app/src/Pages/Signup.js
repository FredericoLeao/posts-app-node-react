import { useState } from "react"
import axios from "axios"

export default function SignUpPage () {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [signupSuccess, setSigupSuccess] = useState(false)
    const [formError, setFormError] = useState('');

    const submit = () => {
        const postData = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        }
        axios.post('http://localhost:8000/user/signup', postData)
            .then((res) => {
                console.log('ok!')
                console.log(res.data)
                setFormError('')
                setSigupSuccess(true)
            })
            .catch((err) => {
                setSigupSuccess(false)
                console.log(err.response.data);
                if (err.response?.data?.errors)
                    setFormError(err.response.data.errors[0].msg)
            })
            .finally(() => {
            })
    }

    const FormError = () => {
        if (formError != '')
            return (
                <div className="alert alert-danger my-2">{formError}</div>
            )
    }
    const SignupSuccess = () => {
        if (signupSuccess === true)
            return (
                <div className="alert alert-success my-2">Cadastro efetuado! Vá para o login</div>
            )
    }

    return (
            <div className="signup">
                <div className="head">
                    <FormError />
                    <SignupSuccess />
                </div>
                <form>
                <div className="row mb-1">
                    <div>
                        <label for="name">Nome:</label>
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
                        type="text"
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
                        type="text"
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
                        value="Cadastrar"
                        className="btn btn-primary form-control"
                        onClick={(e) => submit()}
                    />
                    </div>
                </div>
                </form>
            </div>
    )
}
