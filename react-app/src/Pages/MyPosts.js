import { useEffect, useState } from "react"
import axios from "axios"

export default function SignUpPage () {
    const [myProfileData, setMyProfileData] = useState({})
    const [postForm, setPostForm] = useState({})
    const [myPosts, setMyPosts] = useState([])
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
                'http://localhost:8000/api/my-posts',
                { headers: { Authorization: sessionStorage.getItem('postsapp-login-token') } }
            )
            .then((res) => {
                setMyPosts(res.data)
            })
            .catch((res) => {
              console.log('erro ??')
              console.log(res.response?.data)
              setMyProfileData({ error: true })
            })
            .finally(() => setHttpLoading(false))

    }, []);

    const submit = (e) => {
        e.preventDefault();
        console.log('oi??')
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

    const PostsList = () => {
        let rows = []
        myPosts.forEach((p) => { rows.push(<PostRow post={{...p}} key={p.id} />) })
        return rows;
    }
    const PostRow = ({ post }) => {
        return <div className="row">
            <div className="col-6">
                {post.title}
            </div>
            <div className="col-6">
                {post.content}
            </div>
        </div>
    }

    return (
            <div className="myPosts">

                <div className="head">
                    <FormSuccess />
                    <FormError />
                </div>
                <div>
                    <form onSubmit={submit}>
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
                        <div>
                            <input
                                type="submit"
                                className="btn btn-primary form-control"
                                value="Salvar Post"
                            />
                        </div>
                    </div>
                    </form>
                </div>
                <div className="row mb-1 text-center">
                    <div className="col-6">
                        <label>Título</label>
                    </div>
                    <div className="col-6">
                        <label>Conteúdo</label>
                    </div>
                </div>
                <PostsList />
            </div>
    )
}
