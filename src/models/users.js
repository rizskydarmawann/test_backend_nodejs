const dbPool = require('../config/database');
const bcrypt = require('bcrypt');



const registerUsers = async (userData) => {
    const { name, email, password } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const SQLQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?,?)';

    return dbPool.execute(SQLQuery, [name, email, hashedPassword]);
}

const findUserByName = (name) => {
    const SQLQuery = 'SELECT * FROM users WHERE name = ?';

    return dbPool.execute(SQLQuery, [name]);
}

const findUserByEmail = (email) => {
    const SQLQuery = 'SELECT * FROM users WHERE email = ?';
    return dbPool.execute(SQLQuery, [email]);
}



const loginUser = (email) => {
    const SQLQuery = 'SELECT * FROM users WHERE email = ?';
    return dbPool.execute(SQLQuery, [email]);
}

const saveUserToken = (userId, token) => {
    const SQLQuery = 'UPDATE users SET token = ? WHERE id = ?';
    return dbPool.execute(SQLQuery, [token, userId]);
}

const checkUserToken = (userId, token) => {
    const SQLQuery = 'SELECT * FROM users WHERE id = ? AND token = ?';
    return dbPool.execute(SQLQuery, [userId, token]);
}

module.exports = {
    registerUsers,
    findUserByName,
    findUserByEmail,
    loginUser,
    saveUserToken,
    checkUserToken
}