const { body, validationResult } = require('express-validator');
const PostCommentService = require('../services/postCommentService')

exports.validate = (method) => {
    switch (method) {
        case 'createPostComment': {
            return [
                body('comment', 'O campo Comentário é obrigatório').exists().isLength({ min: 3}),
            ]
        }
    }
}

exports.createPostComment = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const postComment = await PostCommentService.create({
            userId: req.userId,
            postId: req.params.postId,
            comment: req.body.comment,
        });
        res.json(postComment);
    } catch (err) {
        return next(err)
    }
}

exports.updatePostComment = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const updatePostComment = await PostCommentService.update({
            id: req.params.commentId,
            userId: req.userId,
            postId: req.params.postId,
            comment: req.body.comment,
        });
        if (updatePostComment.error)
            return res
                .status(updatePostComment.status || 422)
                .json(updatePostComment.message || '');
        res.json(updatePostComment);
    } catch (err) {
        return next(err)
    }
}

exports.deletePostComment = async (req, res, next) => {
    const deletePostcomment = await PostCommentService.delete({
        userId: req.userId,
        commentId: req.params.commentId,
        postId: req.params.postId,
    });
    if (deletePostcomment.error)
        return res
            .status(deletePostcomment.status || 422)
            .json(deletePostcomment.message || '');
    res.json(deletePostcomment);
}
