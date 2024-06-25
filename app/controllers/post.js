const { body, validationResult } = require('express-validator');
const PostService = require('../services/postService')

exports.validate = (method) => {
    switch (method) {
        case 'createPost': {
            return [
                body('content', 'O campo Conteúdo é obrigatório').exists().isLength({ min: 3}),
                body('title', 'O campo E-Mail é obrigatório').exists().isLength({ min: 2 }),
            ]
        }
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        const post = await PostService.create({
            userId: req.userId,
            title: req.body.title,
            content: req.body.content,
            image: req.body.image
        });
        res.json(post);
    } catch (err) {
        return next(err)
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        const post = await PostService.update({
            id: req.params.postId,
            userId: req.userId,
            title: req.body.title,
            content: req.body.content,
            image: req.body.image
        });
        res.json(post);
    } catch (err) {
        return next(err)
    }
}
exports.getPost = async (req, res, next) => {
    try {
        const post = await PostService.get(req.params.postId);
        res.json(post);
    } catch (err) {
        return next(err);
    }
}

// exports.getPost = async (req, res, next) => {
//     const postData = await UserService.getProfile(req.userId)
//     return res.status(200).json(profileData);
// }
