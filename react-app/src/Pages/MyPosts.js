import { useEffect, useState } from "react"
import axios from "axios"
import AddPostModal from "./Components/AddPostModal"

export default function MyPosts () {
    const [myPosts, setMyPosts] = useState([])
    const [httpLoading, setHttpLoading] = useState(false)
    const [showModalAddPost, setShowModalAddPost] = useState(false)

    useEffect(() => {
        getMyPosts()
    }, []);

    const getMyPosts = () => {
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
              setMyPosts([])
            })
            .finally(() => setHttpLoading(false))
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
                <div>
                    <button onClick={() => { setShowModalAddPost(true)}}>Adicionar Post</button>
                </div>
                <div>
                    <AddPostModal
                        show={showModalAddPost}
                        onClosed={() => setShowModalAddPost(false)}
                        onSuccess={() => getMyPosts()}
                    />
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
