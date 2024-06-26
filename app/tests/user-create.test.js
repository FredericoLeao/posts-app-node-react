const axios = require('axios')
const userTestUtils = require('./utils/userTestUtils')

test('create user - invalid email', async function () {
    let createUserData = {
        name: 'Joao Teste',
        email: 'email@exemplo',
        password: 'abc123',
        confirmPassword: 'abc123',
    }
    const response = await axios
        .post(
            'http://localhost:8000/api/signup',
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
            'http://localhost:8000/api/signup',
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
    const createUser = userTestUtils.createDefault()
    createUser
        .then((res) => {
            expect(res.data.name).toBe("Joao Teste")
        })
        .catch((err) => {
            expect(err.response.status).toBe(200)
        });
})