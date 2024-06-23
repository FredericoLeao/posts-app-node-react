const axios = require('axios')

test('create user - invalid email', async function () {
    let createUserData = {
        name: 'Joao Teste',
        email: 'email@exemplo',
        password: 'abc123',
        confirmPassword: 'abc123',
    }
    const response = await axios
        .post(
            'http://localhost:8000/user/signup',
            createUserData
        )
        .then((res) => {
            expect(res.status).toBe(422)
        })
        .catch((err) => {
            expect(err.response.status).toBe(422)
        });
})

test('create user - invalid confirm password', async function () {
    let createUserData = {
        name: 'Joao Teste',
        email: 'email@exemplo.com',
        password: 'abc123',
        confirmPassword: 'xyz456',
    }
    const response = await axios
        .post(
            'http://localhost:8000/user/signup',
            createUserData
        )
        .then((res) => {
            expect(res.status).toBe(422)
        })
        .catch((err) => {
            expect(err.response.status).toBe(422)
        });
})

test('create user', async function () {
    let createUserData = {
        name: 'Joao Teste',
        email: 'email@exemplo.com',
        password: 'abc123',
        confirmPassword: 'abc123',
    }
    const response = await axios
        .post('http://localhost:8000/user/signup', createUserData);
    expect(response.data.name).toBe(createUserData.name)
})