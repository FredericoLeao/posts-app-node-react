import { useState } from "react"
import AppModal from '../../SharedComponents/AppModal'
import axios from "axios"

export default function AddPostModal ({ show, onSuccess = () => {}, onClosed = () => {} }) {
    const [postForm, setPostForm] = useState({})
    const [formSuccess, setFormSuccess] = useState(false)
    const [formError, setFormError] = useState('');

    const submit = (e) => {
        e.preventDefault();
        axios
            .post(
                'http://localhost:8000/api/post',
                {
                    title: postForm.title,
                    content: postForm.content,
                },
                { headers: { Authorization: sessionStorage.getItem('postsapp-login-token') } }
            )
            .then((res) => {
                setFormSuccess(true)
                setFormError('')
                onSuccess()
            })
            .catch((err) => {
                setFormSuccess(false)
                if (err.response?.data?.errors)
                    setFormError(err.response.data.errors[0].msg)
                else if (err.response?.data?.message)
                    setFormError(err.response.data.message)
            })
    }

    const close = (e) => {
        setFormSuccess(false)
        setFormError('')
        setPostForm({})
        onClosed(e)
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
                <div className="alert alert-success my-2">Cadastrado com sucesso!</div>
            )
    }

    return (
        <AppModal
            show={show}
            title="Adicionar Post"
            onOkBtn={(e) => { if (formSuccess !== true) submit(e) }}
            onClosed={close}
            okButtonDismiss={formSuccess}
        >
        {formSuccess === true ||
        <form>
        <div className="row my-1">
            <div className="">
                <label>Título:</label>
                <input
                    id="email"
                    type="text"
                    className="form-control"
                    value={postForm.title || ''}
                    onChange={(e) => setPostForm(
                        { ...postForm, title: e.target.value }
                    )}
                />
            </div>
            </div>
            <div className="row my-1">
            <div className="">
                <label>Conteúdo:</label>
                <textarea
                    id="email"
                    className="form-control"
                    value={postForm.content || ''}
                    onChange={(e) => setPostForm(
                        { ...postForm, content: e.target.value }
                    )}
                />
            </div>
        </div>
        </form>}
        <div className="row my-1">
            <div>
                <FormSuccess />
                <FormError />
            </div>
        </div>

        </AppModal>
    )
}