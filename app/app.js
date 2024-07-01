// Express
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const AuthController = require('./controllers/auth')
const UserController = require('./controllers/user')
const PostController = require('./controllers/post')
const PostCommentController = require('./controllers/postComment')
const ReportController = require('./controllers/report')

// routes
app.get('/status', (req, res) => {
    const status = {
        "Status": "OK"
    };
    res.send(status);
});

app.post('/api/login', AuthController.validate('login'), AuthController.login);

// - user routes
app.post(
    '/api/signup',
    UserController.validate('createUser'),
    UserController.createUser
);

app.get('/api/post/:postId/read', PostController.getRead);

app.get('/api/report/posts', ReportController.postsReport);

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

app.get('/api/my-posts', PostController.getMyPosts);

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
app.delete(
    '/api/post/:postId',
    PostController.deletePost,
)

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
app.post(
    '/api/post/:postId/like',
    PostController.like,
);
app.post(
    '/api/post/:postId/dislike',
    PostController.dislike,
);

// server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`listening on: ${PORT}`);
});
