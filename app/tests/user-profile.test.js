const axios = require('axios');
const userTestUtils = require('./utils/userTestUtils')

test('alterar dados do próprio perfil', async () => {
    const user = await userTestUtils.createDefault();
    const token = await userTestUtils.loginDefault();

    let profileDataUpdate = {
        name: 'João Atualizado',
        password: 'Nova Senha',
        confirmPassword: 'Nova Senha',
    }
    const response = await axios
        .put(
            'http://localhost:8000/api/profile/',
            profileDataUpdate,
            { headers: { Authorization: token }}
        )
        .then((res) => {
            expect(res.status).toBe(200)
        })
        .catch((err) => {
            expect(err.response.status).toBe(200)
        })
})

test('falha alterar dados do próprio perfil - senha errada', async () => {
    let loginData = {
        email: 'email@exemplo.com',
        password: 'abc123',
    }
    const responseLogin = await axios.post('http://localhost:8000/api/login',loginData)
    let token = responseLogin.data.token
    let profileDataUpdate = {
        name: 'João Atualizado',
        password: 'Nova Senha',
        confirmPassword: 'Nova Errada',
    }
    const response = await axios
        .put(
            'http://localhost:8000/api/profile/',
            profileDataUpdate,
            { headers: { Authorization: token }}
        )
        .then((res) => {
            expect(res.status).toBe(422);
        })
        .catch((err) => {
            expect(err.response.status).toBe(422);
            expect(
                Object.keys(
                    err.response.data.errors.find((e) => e.path == 'password')
                ).length
            ).toBeGreaterThan(0);
        });
})

test('alterar dados do próprio perfil - sem senha', async () => {
    let loginData = {
        email: 'email@exemplo.com',
        password: 'abc123',
    }
    const responseLogin = await axios.post('http://localhost:8000/api/login',loginData)
    let token = responseLogin.data.token
    let profileDataUpdate = {
        name: 'João Atualizado De Novo',
    }
    const response = await axios
        .put(
            'http://localhost:8000/api/profile/',
            profileDataUpdate,
            { headers: { Authorization: token }}
        )
        .then((res) => {
            expect(res.status).toBe(200);
        })
        .catch((err) => {
            expect(err.response.status).toBe(200);
        })
        .finally(async () => {
            const response = await axios
                .get(
                    'http://localhost:8000/api/profile/',
                    { headers: { Authorization: token }})
                .then((res) => {
                    expect(res.data.name).toBe('João Atualizado De Novo');
                })
                .catch((err) => {
                    expect(err.response.status).toBe(200);
                });
        });
})
