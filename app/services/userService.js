const User = require('../models/user');
const db = require('../infra/database');

exports.create = (userData) => {
    const user = User(db).create(userData);
    return user;
};
