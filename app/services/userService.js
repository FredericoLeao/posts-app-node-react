const User = require('../models/user');
const db = require('../infra/database');
const bcrypt = require('bcrypt');

exports.create = async (userData) => {
    userData.password = await bcrypt.hash(userData.password, 2);
    const user = await User(db).create(userData);
    return user;
};

exports.getProfile = async (userId) => {
    const user = await User(db).findOne({ where: { id: userId }});
    if (!user) return {};
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
    };
}