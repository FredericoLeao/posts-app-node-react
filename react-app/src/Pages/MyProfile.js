import { useEffect, useState } from "react"
import { useUser } from '../Entities/User'

export default function MyProfilePage () {
    const [name, setName] = useState('')
    const [changePassword, setChangePassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const User = useUser()

    useEffect(() => {
        User.getMyProfileData()
    }, []);

    useEffect(() => {
        if (User.myProfileData?.name)
            setName(User.myProfileData.name)
        setChangePassword('')
    }, [User.myProfileData])

    const submit = () => {
        let updateProfileData = {
            name: name,
            password: changePassword,
            confirmPassword: confirmPassword,
        }
        User.updateMyProfileData(updateProfileData)
    }
    const FormError = () => {
        if (User.updateMyProfileErrorMessage != '')
            return (
                <div className="alert alert-danger my-2">{User.updateMyProfileErrorMessage}</div>
            )
    }
    const FormSuccess = () => {
        if (User.updateMyProfileSuccess === true)
            return (
                <div className="alert alert-success my-2">Dados Atualizados!</div>
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
                    <div className="border-bottom">
                    {User.myProfileData.email}
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
                    <label>Alterar Senha:</label>
                    <input
                        id="changePassword"
                        name="changePassword"
                        type="password"
                        className="form-control"
                        autoComplete="off"
                        value={changePassword}
                        onChange={(e) => setChangePassword(e.target.value)}
                    />
                    </div>
                </div>
                <div className="row my-1">
                    <div className="">
                    <label>Confirme a nova senha:</label>
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
