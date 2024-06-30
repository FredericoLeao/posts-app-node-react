import { useEffect, useState } from "react"
import axiosApi from "../Plugins/axios"
import AddPostModal from "./Components/Posts/AddPostModal"
import PostRow from "./Components/Posts/PostRow"

export default function MyPosts () {
    const [myPosts, setMyPosts] = useState([])
    const [httpLoading, setHttpLoading] = useState(false)
    const [showModalAddPost, setShowModalAddPost] = useState(false)

    useEffect(() => {
        getMyPosts()
    }, []);

    const getMyPosts = () => {
        setHttpLoading(true)
        axiosApi
            .get(
                '/my-posts',
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

    return (
            <div className="myPosts">
                <div className="text-end">
                    <button
                        className="btn btn-primary"
                        onClick={() => { setShowModalAddPost(true)}}>Adicionar Post</button>
                </div>
                <div>
                    <AddPostModal
                        show={showModalAddPost}
                        onClosed={() => setShowModalAddPost(false)}
                        onSuccess={() => getMyPosts()}
                    />
                </div>
                <div className="border p-4 mt-2">
                    <div style={{maxHeight: '620px', overflow: 'auto'}}>
                        <PostsList />
                    </div>
                </div>
            </div>
    )
}
