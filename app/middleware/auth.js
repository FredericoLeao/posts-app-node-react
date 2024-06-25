const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado' })
    }
    try {
        const decodedToken = jwt.verify(token, 'your-secret-key');
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Acesso negado'});
    }
}
