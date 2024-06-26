const { body, validationResult } = require('express-validator');
const AuthService = require('../services/authService')

exports.validate = (method) => {
    switch (method) {
        case 'login': {
            return [
                body('email', 'O campo E-Mail é obrigatório').exists(),
                body('email', 'E-Mail inválido').isEmail(),
                body('password', 'O campo Senha é obrigatório').exists().isLength({ min: 1 }),
            ]
        }
    }
}

exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const {
            email,
            password,
        } = req.body;

        const login = await AuthService.login({
            email: email,
            password: password,
        });
        if (login.error) {
            return res.status(login.errorStatus).json(
                { message: login.error }
            );
        }
        return res.json(login);
    } catch (err) {
        return next(err)
    }
}
