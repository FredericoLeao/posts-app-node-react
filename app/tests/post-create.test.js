const axios = require('axios');
const userTestUtils = require('./utils/userTestUtils');

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

// criar post anexando imagem
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
            expect(res.status).toBe(200)
        })
});

// atualizar titulo e/ou conteudo (checar revision)
