const axios = require('axios');

test('falha user login - email inválido', async () => {
    let loginData = {
        email: 'email@exemplo',
        password: 'abc123',
    }
    const response = await axios
        .post(
            'http://localhost:8000/login',
            loginData
        )
        .then((res) => {
            expect(res.status).toBe(422)
        })
        .catch((err) => {
            expect(err.response.status).toBe(422)
        });
})

test('falha user login - senha errada', async () => {
    let loginData = {
        email: 'email@exemplo.com',
        password: 'xyz456',
    }
    const response = await axios
        .post(
            'http://localhost:8000/login',
            loginData
        )
        .then((res) => {
            expect(res.status).toBe(401)
        })
        .catch((err) => {
            expect(err.response.status).toBe(401)
        });
})

test('falha user login - usuario nao existe', async () => {
    let loginData = {
        email: 'emailnaoexiste@naoexiste.com',
        password: 'xyz456',
    }
    const response = await axios
        .post(
            'http://localhost:8000/login',
            loginData
        )
        .then((res) => {
            expect(res.status).toBe(401)
        })
        .catch((err) => {
            expect(err.response.status).toBe(401)
        });
})

test('user login ok', async () => {
    let loginData = {
        email: 'email@exemplo.com',
        password: 'abc123',
    }
    const response = await axios
        .post(
            'http://localhost:8000/login',
            loginData
        )
        .then((res) => {
            expect(res.status).toBe(200)
        })
        .catch((err) => {
            expect(err.response.status).toBe(200)
        });
})

test('falha acesso rota restrita - sem token - acesso negado', async () => {
    const response = await axios.get('http://localhost:8000/api/profile/')
        .then((res) => {
            expect(res.status).toBe(403)
        })
        .catch((err) => {
            expect(err.response.status).toBe(401)
        })
})

test('acesso rota restrita com token - válido', async () => {
    let loginData = {
        email: 'email@exemplo.com',
        password: 'abc123',
    }
    const responseLogin = await axios.post('http://localhost:8000/login',loginData)

    let token = responseLogin.data.token
    const response = await axios
        .get(
            'http://localhost:8000/api/profile/',
            { headers: { Authorization: token }})
        .then((res) => {
            expect(res.status).toBe(200)
        })
        .catch((err) => {
            expect(err.response.status).toBe(200)
        })
})
