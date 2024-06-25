const Post = require('../models/post');
const PostComment = require('../models/postcomment');
const db = require('../infra/database');

exports.create = async (createData) => {
    let post = await Post(db).findOne({ where: { id: createData.postId } });
    if (!post)
        return { error: true, message: 'Post não encontrado' }
    const postComment = await PostComment(db).create({
        postId: createData.postId,
        userId: createData.userId,
        comment: createData.comment,
    })

    return postComment;
};

exports.update = async (updateData) => {
    const postComment = await PostComment(db)
        .findOne({
            where: {
                id: updateData.id,
                userId: updateData.userId,
            }
        }
    );
    if (!postComment)
        return {
            error: true,
            message: 'Comentário não encontrado',
        };
    postComment.comment = updateData.comment;
    postComment.save();
    return postComment;
}

exports.delete = async (deleteData) => {
    let postComment = await PostComment(db).findByPk(deleteData.commentId);
    if (!postComment || postComment.postId != deleteData.postId)
        return {
            error: true,
            message: 'Comentário não encontrado',
        }
    const post = await Post(db).findByPk(postComment.postId);
    if (
        postComment.userId != deleteData.userId &&
        post.userId != deleteData.userId
    )
        return {
            error: true,
            message: 'Sem permissão',
            status: 403,
        }
    postComment.deletedUserId = deleteData.userId;
    await postComment.save();
    await postComment.destroy();
    return { success: true }
}
