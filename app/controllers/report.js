const PostService = require('../services/postService')

exports.postsReport = async (req, res, next) => {
    try {
        const posts = await PostService.report();
        res.json(posts);
    } catch (err) {
        return next(err);
    }
}
