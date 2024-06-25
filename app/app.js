// Express
const express = require('express');
const app = express();
app.use(express.json());

const AuthController = require('./controllers/auth')
const UserController = require('./controllers/user')
const PostController = require('./controllers/post')
const PostCommentController = require('./controllers/postComment')

// routes
app.get('/status', (req, res) => {
    const status = {
        "Status": "OK"
    };
    res.send(status);
});

app.post('/login', AuthController.validate('login'), AuthController.login);

// - user routes
app.post(
    '/user/signup',
    UserController.validate('createUser'),
    UserController.createUser
);

app.get('/api/post/:postId/read', PostController.getRead);

// authenticated routes
const authMiddleware = require('./middleware/auth');
app.use('*', authMiddleware);

// Profile
app.get('/api/profile', UserController.getProfile);
app.put(
    '/api/profile',
    UserController.validate('updateProfile'),
    UserController.updateProfile
);
// Posts
app.post(
    '/api/post',
    PostController.validate('createPost'),
    PostController.createPost,
);
app.put(
    '/api/post/:postId',
    PostController.validate('createPost'),
    PostController.updatePost,
);
app.get(
    '/api/post/:postId',
    PostController.getPost,
);
// Comments
app.post(
    '/api/post/:postId/comment/',
    PostCommentController.validate('createPostComment'),
    PostCommentController.createPostComment,
);
app.put(
    '/api/post/:postId/comment/:commentId',
    PostCommentController.validate('createPostComment'),
    PostCommentController.updatePostComment,
);
app.delete(
    '/api/post/:postId/comment/:commentId',
    PostCommentController.deletePostComment,
);

// server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`listening on: ${PORT}`);
});
