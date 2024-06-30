const formatDateTime = (dateValue) => {
    let options = {
        year: '2-digit', month: '2-digit', day: '2-digit',
        timeZone: 'UTC'
    }
    return new Date(dateValue).toLocaleDateString('pt-BR', options) + ' ' +
        new Date(dateValue).toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' }).slice(0, -3)
}

export default function PostRow ({ post }) {
    return (
        <div className="row g-0 my-2" style={{fontSize: '0.8rem' }}>
            <div>
                <div className="card">
                    <div className="card-header d-flex">
                        <div><h6 className="mb-0">{post.title}</h6></div>
                        <div className="ms-auto">{formatDateTime(post.createdAt)}</div>
                    </div>
                    <div className="card-body">
                        {post.content}
                    </div>
                </div>
            </div>
        </div>
    )
}