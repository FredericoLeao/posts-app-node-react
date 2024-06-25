const axios = require("axios")

exports.createDefault = async () => {
    let createUserData = {
        name: 'Joao Teste',
        email: 'email@exemplo.com',
        password: 'abc123',
        confirmPassword: 'abc123',
    }
    return await axios
        .post('http://localhost:8000/user/signup', createUserData)
}

exports.loginDefault = async () => {
    let loginData = {
        email: 'email@exemplo.com',
        password: 'abc123',
    }
    const responseLogin = await axios.post('http://localhost:8000/login',loginData)
    return responseLogin.data.token
}

exports.createUser2 = async () => {
    let createUserData = {
        name: 'Joao Dois',
        email: 'joaodois@exemplo.com',
        password: 'abc123',
        confirmPassword: 'abc123',
    }
    return await axios
        .post('http://localhost:8000/user/signup', createUserData)
}

exports.loginUser2 = async () => {
    let loginData = {
        email: 'joaodois@exemplo.com',
        password: 'abc123',
    }
    const responseLogin = await axios.post('http://localhost:8000/login',loginData)
    return responseLogin.data.token
}