const db = require('../infra/database');
const Post = require('../models/post');
const PostComment = require('../models/postcomment');
const User = require('../models/user');
const emailTool = require('../infra/email');

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

exports.getByPost = async (postId) => {
    return await PostComment(db).findAll({ where: { postId: postId }});
}

exports.sendNewPostCommentEmail = async (postComment) => {
    const post = await Post(db).findByPk(postComment.postId);
    if (!post) {
        console.log('falha ao enviar email: post não encontrado');
        return;
    }
    const postUser = await User(db).findByPk(post.userId);
    if (!postUser) {
        console.log('falha ao enviar email: usuário não encontrado');
        return;
    }
    const commentUser = await User(db).findByPk(postComment.userId);
    if (!commentUser) {
        console.log('falha ao enviar email: comentário não encontrado');
        return;
    }
    const postRevision = await post.lastRevision;
    let subject = 'Novo comentário no post';
    let content = `
        <p>Olá ${postUser.name},</p>
        <br>
        <p>Você recebeu um novo comentário no post: ${postRevision.title}</p>
        <p>${commentUser.name} <strong>comentou</strong> ${postComment.comment}</p>
        <br>
        <br>
        <p>Post App</p>
    `;
    try {
        const sendInfo = await emailTool.sendEmail(postUser.name, postUser.email, subject, content);
        if (sendInfo.accepted) {
            console.log(`email enviado para ${postUser.email}`);
        }
    } catch (err) {
        console.log('erro ao enviar email');
        console.log(err.response);
        console.log(err.rejected);
    }
}
