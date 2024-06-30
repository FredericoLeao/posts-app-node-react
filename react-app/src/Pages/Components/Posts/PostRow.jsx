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
        <div className="row g-0 mt-1 my-4" style={{fontSize: '0.8rem' }}>
            <div>
                <div className="card">
                    <div className="card-header d-flex">
                        <div><h6 className="mb-0">{post.title}</h6></div>
                        <div className="ms-auto">{formatDateTime(post.createdAt)}</div>
                    </div>
                    <div className="card-body" style={{maxHeight: '180px', overflow: 'auto'}}>
                        {post.content}
                    </div>
                    <div className="card-footer">
                        <span style={{fontSize: '0.63rem'}}>
                            {post.countRevision > 1 &&
                            <span>Editado {post.countRevision} vezes</span>}
                            {post.countRevision === 1 &&
                            <span>Sem edição</span>}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}