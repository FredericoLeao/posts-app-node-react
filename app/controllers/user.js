const { body, validationResult } = require('express-validator');
const UserService = require('../services/userService')

exports.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                body('name', 'O campo Nome é obrigatório').exists(),
                body('email', 'O campo E-Mail é obrigatório').exists(),
                body('email', 'E-Mail inválido').isEmail(),
                body('password', 'O campo Senha é obrigatório').exists(),
                body('confirmPassword', 'O campo Confirmar Senha é obrigatório').exists(),
                body('confirmPassword', 'Senha não confere')
                    .custom((value, { req }) => {
                        return value === req.body.password;
                    }),
            ]
        }
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const {
            name,
            email,
            password,
            confirmPassword
        } = req.body;

        const user = await UserService.create({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        });
        res.json(user);
    } catch (err) {
        return next(err)
    }
}
