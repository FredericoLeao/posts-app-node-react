const { body, validationResult } = require('express-validator');
const UserService = require('../services/userService')

exports.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                body('name', 'O campo Nome é obrigatório').exists().notEmpty(),
                body('name', 'O campo Nome deve ter ao menos 3 caracteres').isLength({ min: 3}),
                body('email', 'O campo E-Mail é obrigatório').exists(),
                body('email', 'E-Mail inválido').isEmail(),
                body('password', 'O campo Senha é obrigatório').exists().notEmpty(),
                body('password', 'O campo Senha deve ter ao menos 6 caracteres').isLength({ min: 6}),
                body('confirmPassword', 'O campo Confirmar Senha é obrigatório').exists(),
                body('confirmPassword', 'Senha não confere')
                    .custom((value, { req }) => {
                        return value === req.body.password;
                    }),
            ]
        }
        case 'updateProfile': {
            return [
                body('name', 'O campo Nome é obrigatório').exists(),
                body('name', 'O campo Nome deve ter ao menos 3 caracteres').isLength({ min: 3}),
                body('password', 'Senha não confere')
                    .custom((value, { req }) => {
                        if (!(value?.length > 0))
                            return true;
                        return value === req.body.confirmPassword;
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

exports.getProfile = async (req, res, next) => {
    const profileData = await UserService.getProfile(req.userId)
    return res.status(200).json(profileData);
}

exports.updateProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    const {
        name,
        password,
        confirmPassword,
    } = req.body;

    const updateResult = await UserService.updateProfile(
        req.userId,
        {
            name: name,
            password: password,
        }
    );

    return res.status(200).json(updateResult)
}
