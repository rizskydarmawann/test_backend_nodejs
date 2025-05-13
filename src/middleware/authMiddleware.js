const jwt = require('jsonwebtoken');
const UsersModel = require('../models/users.js');

const verifyToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'Akses ditolak. Token tidak ditemukan'
        });
    }

    try {
        const decoded = jwt.verify(token, 'e9d8b742e387f3b27e58d9ae82bfbfd2c8cd8a19a3921d295d0fca2c7ab5e60x');
      
        const [userToken] = await UsersModel.checkUserToken(decoded.id, token);
        
        if (userToken.length === 0) {
            return res.status(401).json({
                status: false,
                message: 'Token tidak valid atau sudah tidak aktif. Silakan login kembali',
                isExpired: true
            });
        }

        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
            return res.status(401).json({
                status: false,
                message: 'Token sudah kadaluarsa. Silakan login kembali',
                isExpired: true
            });
        }
      
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: false,
                message: 'Token sudah kadaluarsa. Silakan login kembali',
                isExpired: true
            });
        }
        return res.status(403).json({
            status: false,
            message: 'Token tidak valid',
            error: error.message
        });
    }
};

module.exports = verifyToken;