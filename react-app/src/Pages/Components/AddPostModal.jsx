import { useState } from "react"
import AppModal from '../../SharedComponents/AppModal'
import axios from "axios"

export default function AddPostModal ({ show, onClosed = () => {} }) {
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
                //getMyPosts()
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
        <AppModal
            show={show}
            title="Adicionar Post"
            onOkBtn={(e) => submit(e)}
            onClosed={onClosed}
        >
        <form>

        <div className="row my-1">
            <div className="">
                <label>Título:</label>
                <input
                    id="email"
                    type="text"
                    className="form-control"
                    value={postForm.title}
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
                    value={postForm.content}
                    onChange={(e) => setPostForm(
                        { ...postForm, content: e.target.value }
                    )}
                />
            </div>
            </div>
            <div className="row my-1">
        </div>
        </form>

        </AppModal>
    )
}