const axios = require('axios');
const userTestUtils = require('./utils/userTestUtils');

beforeAll(async function () {
    const createUser = await userTestUtils.createDefault();
    token = await userTestUtils.loginDefault();

    user2 = await userTestUtils.createUser2();
    token2 = await userTestUtils.loginUser2();

    let createPostData = {
        content: 'Conteúdo do post teste',
        title: 'Título do post teste',
    }
    postResponse = await axios
        .post(
            'http://localhost:8000/api/post/',
            createPostData,
            { headers: { Authorization: token } },
        )
});

test('comments', async () => {
    // should not create comment - validation'
    let createPostCommentData = {
        comment: 'Co'
    }
    let commentResponse = await axios
        .post(
            `http://localhost:8000/api/post/${postResponse.data.id}/comment`,
            createPostCommentData,
            { headers: { Authorization: token } },
        )
        .then((res) => {
            expect(res.status).toBe(422)
        })
        .catch((err) => {
            expect(err.response.status).toBe(422)
        });

    // should create comment
    createPostCommentData = {
        comment: 'Comentário no próprio post'
    }
    commentResponse = await axios
        .post(
            `http://localhost:8000/api/post/${postResponse.data.id}/comment`,
            createPostCommentData,
            { headers: { Authorization: token } },
        );
        expect(commentResponse.data.comment).toBe(createPostCommentData.comment);
        expect(commentResponse.status).toBe(200);

    // should update own comment
    let updatePostCommentData = {
        comment: 'Comentário Editado'
    }
    commentResponse = await axios
        .put(
            `http://localhost:8000/api/post/${postResponse.data.id}/comment/${commentResponse.data.id}`,
            updatePostCommentData,
            { headers: { Authorization: token } },
        );
        expect(commentResponse.data.comment).toBe(updatePostCommentData.comment);
        expect(commentResponse.status).toBe(200);

    // should not update another one's comment
    let updatePostCommentDataFail = {
        comment: 'Comentário Não Editado'
    }
    await axios
        .put(
            `http://localhost:8000/api/post/${postResponse.data.id}/comment/${commentResponse.data.id}`,
            updatePostCommentDataFail,
            { headers: { Authorization: token2 } },
        )
        .then((res) => {
            expect(res.status).toBe(422);
        })
        .catch((err) => {
            expect(err.response.status).toBe(422);
        });
        
    // should not delete another ones comment
    await axios
        .delete(
            `http://localhost:8000/api/post/${postResponse.data.id}/comment/${commentResponse.data.id}`,
            { headers: { Authorization: token2 } },
        )
        .then((res) => {
            expect(res.status).toBe(403);
        })
        .catch((err) => {
            expect(err.response.status).toBe(403);
        });
    // should delete own comment
    let deleteComment = await axios
        .delete(
            `http://localhost:8000/api/post/${postResponse.data.id}/comment/${commentResponse.data.id}`,
            { headers: { Authorization: token } },
        );
    expect(deleteComment.status).toBe(200);

    // should delete another ones comment on own post
    createPostCommentData = {
        comment: 'Comentário no post alheio'
    }
    commentResponse = await axios
        .post(
            `http://localhost:8000/api/post/${postResponse.data.id}/comment`,
            createPostCommentData,
            { headers: { Authorization: token2 } },
        );
    deleteComment = await axios
        .delete(
            `http://localhost:8000/api/post/${postResponse.data.id}/comment/${commentResponse.data.id}`,
            { headers: { Authorization: token } },
        );
    expect(deleteComment.status).toBe(200);
});
