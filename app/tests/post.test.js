const axios = require('axios');
const userTestUtils = require('./utils/userTestUtils');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test('create post', async function () {
    const createUser = await userTestUtils.createDefault();
    const token = await userTestUtils.loginDefault();

    let createPostData = {
        content: 'Conteúdo do post teste',
        title: 'Título do post teste',
    }
    const response = await axios
        .post(
            'http://localhost:8000/api/post',
            createPostData,
            { headers: { Authorization: token } },
        )
        .then((res) => {
            expect(res.status).toBe(200);
        })
        .catch((err) => {
            expect(err.response.status).toBe(200);
        });
});

test('falha create post - validação', async function () {
    const createUser = await userTestUtils.createDefault();
    const token = await userTestUtils.loginDefault();

    let createPostData = {
        content: 'Co',
        title: 'T',
    }
    const response = await axios
        .post(
            'http://localhost:8000/api/post',
            createPostData,
            { headers: { Authorization: token } },
        )
        .then((res) => {
            expect(res.status).toBe(422);
        })
        .catch((err) => {
            expect(err.response.data.errors.length).toBeGreaterThan(1)
            expect(
                err.response.data.errors.find((e) => e.path == 'title')
            ).not.toBe(undefined)
            expect(
                err.response.data.errors.find((e) => e.path == 'content')
            ).not.toBe(undefined)
            expect(err.response.status).toBe(422);
        });
});

test('create post - com imagem', async function () {
    const createUser = await userTestUtils.createDefault();
    const token = await userTestUtils.loginDefault();
    const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==';

    let createPostData = {
        content: 'Conteúdo do post teste',
        title: 'Título do post teste',
        image: base64Image,
    }
    const response = await axios
        .post(
            'http://localhost:8000/api/post',
            createPostData,
            { headers: { Authorization: token } },
        )
        .then((res) => {
            expect(res.status).toBe(200)
        })
        .catch((err) => {
            expect(err.response.status).toBe(200)
        })
});

test('update post - mantem histórico', async function () {
    const createUser = await userTestUtils.createDefault();
    const token = await userTestUtils.loginDefault();
    const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==';

    const createPostData = {
        content: 'Conteúdo do post teste',
        title: 'Título do post teste',
        image: base64Image,
    }
    const postResponse = await axios
        .post(
            'http://localhost:8000/api/post',
            createPostData,
            { headers: { Authorization: token } },
        )

    let updatePostData = {
        content: 'Conteúdo do post teste Atualizado',
        title: 'Título do post teste Atualizado',
        image: base64Image,
    }
    await sleep(1000);
    const response = await axios
        .put(
            `http://localhost:8000/api/post/${postResponse.data.id}`,
            updatePostData,
            { headers: { Authorization: token } },
        )
        .then((res) => {
            expect(res.status).toBe(200)
        })
        .catch((err) => {
            expect(err.response.status).toBe(200)
        })
        const post = await axios
            .get(
                `http://localhost:8000/api/post/${postResponse.data.id}`,
                { headers: { Authorization: token } },
            )
        expect(post.data.title).toBe('Título do post teste Atualizado');
});

test('post read - views count', async () => {
    const createUser = await userTestUtils.createDefault();
    const token = await userTestUtils.loginDefault();

    let createPostData = {
        content: 'Conteúdo de teste para views count',
        title: 'Post teste views count',
    }
    const postResponse = await axios
        .post(
            'http://localhost:8000/api/post',
            createPostData,
            { headers: { Authorization: token } },
        )

    let postRead = await axios
        .get(`http://localhost:8000/api/post/${postResponse.data.id}/read`)
    expect(postRead.status).toBe(200);
    postRead = await axios
        .get(`http://localhost:8000/api/post/${postResponse.data.id}/read`)
    expect(postRead.status).toBe(200);
    expect(postRead.data.viewCount).toBe(2);
});
