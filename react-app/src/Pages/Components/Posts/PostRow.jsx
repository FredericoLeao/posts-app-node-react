import { useState } from "react"
import DeletePostConfirmationModal from "./DeletePostConfirmationModal"
import { usePost } from "../../../Entities/Post"

const formatDateTime = (dateValue) => {
    let options = {
        year: '2-digit', month: '2-digit', day: '2-digit',
        timeZone: 'UTC'
    }
    return new Date(dateValue).toLocaleDateString('pt-BR', options) + ' ' +
        new Date(dateValue).toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' }).slice(0, -3)
}

export default function PostRow ({ post, onUpdate = () => {}}) {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const Post = usePost()

    const deletePost = async (postId) => {
        Post.deletePost(postId)
            .then((res) => {
                setShowDeleteConfirmation(false)
                onUpdate()
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    return (
        <div className="row g-0 mt-1 my-4" style={{fontSize: '0.8rem' }}>
            <DeletePostConfirmationModal
                id={`postDeleteConfirmation-${post.id}`}
                show={showDeleteConfirmation}
                onSuccess={() => deletePost(post.id)}
                onClosed={() => setShowDeleteConfirmation(false)}
            />
            <div>
                <div className="card">
                    <div className="card-header d-flex">
                        <div><h6 className="mb-0">{post.title}</h6></div>
                        <div className="ms-auto">{formatDateTime(post.createdAt)}</div>
                    </div>
                    <div className="card-body" style={{maxHeight: '180px', overflow: 'auto'}}>
                        {post.content}
                    </div>
                    <div className="card-footer d-flex">
                        <span style={{fontSize: '0.63rem'}}>
                            {post.countRevision > 1 &&
                            <span>Editado {post.countRevision} vezes</span>}
                            {post.countRevision === 1 &&
                            <span>Sem edição</span>}
                        </span>
                        <div className="ms-auto">
                            <i className="bi bi-trash3" onClick={() => { setShowDeleteConfirmation(true) }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}