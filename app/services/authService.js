const User = require('../models/user');
const db = require('../infra/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.login = async (authData) => {
    try {
        const foundUser = await User(db).findOne({ where: { email: authData.email }});
        if (!foundUser) {
            return { error: 'Autenticação falhou', errorStatus: 401 };
        }
        const passwordMatch = await bcrypt.compare(authData.password, foundUser.password);
        if (!passwordMatch) {
            return { error: 'Autenticação falhou', errorStatus: 401 };
        }
        const token = jwt.sign(
            { userId: foundUser.id },
            'your-secret-key',
            { expiresIn: '1h' }
        );
        const resUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
        }
        return { token: token, user: resUser };
    } catch (error) {
        return { error: 'Falha no login', errorStatus: 500 }
    }
};
