const UsersModel = require('../models/users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUsers = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exist
        if (!name) {
            return res.status(400).json({
                status: false,
                message: 'Nama harus diisi'
            });
        }

        // Validasi email
        if (!email) {
            return res.status(400).json({
                status: false,
                message: 'Email harus diisi'
            });
        }

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: false,
                message: 'Format email tidak valid'
            });
        }

        // Validasi password
        if (!password) {
            return res.status(400).json({
                status: false,
                message: 'Password harus diisi'
            });
        }

        const [existingUser] = await UsersModel.findUserByName(name);
        if (existingUser.length > 0) {
            return res.status(400).json({
                status: false,
                message: 'Nama pengguna sudah terdaftar'
            });
        }

        const [existingEmail] = await UsersModel.findUserByEmail(email);
        if (existingEmail.length > 0) {
            return res.status(400).json({
                status: false,
                message: 'Email sudah terdaftar'
            });
        }

        // Register new user
        const [result] = await UsersModel.registerUsers({ name, email, password });

        res.status(201).json({
            status: true,
            message: 'Registrasi berhasil',
            data: {
                id: result.insertId,
                name: name
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Server Error',
            serverMessage: error,
        });
    }
}

const loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validasi input
     
        // Validasi email
        if (!email) {
            return res.status(400).json({
                status: false,
                message: 'Email harus diisi'
            });
        }

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: false,
                message: 'Format email tidak valid'
            });
        }

        // Validasi password
        if (!password) {
            return res.status(400).json({
                status: false,
                message: 'Password harus diisi'
            });
        }

        // Cek user exists
        const [users] = await UsersModel.loginUser(email);
        if (users.length === 0) {
            return res.status(401).json({
                status: false,
                message: 'Email pengguna atau password salah'
            });
        }

        // Verifikasi password

        const isValidPassword = await bcrypt.compare(password, users[0].password);

        if (!isValidPassword) {
            return res.status(401).json({
                status: false,
                message: 'Nama pengguna atau password salah'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: users[0].id, name: users[0].name },
            'e9d8b742e387f3b27e58d9ae82bfbfd2c8cd8a19a3921d295d0fca2c7ab5e60x', // Ganti dengan secret key yang aman
            { expiresIn: '1h' }
        );

        await UsersModel.saveUserToken(users[0].id, token);
        
        res.status(200).json({
            status: true,
            message: 'Login berhasil',
            data: {
                id: users[0].id,
                email: users[0].email,
                name: users[0].name,
                token: token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            status: false,
            message: 'Server Error',
            serverMessage: error,
        });
    }
}

module.exports = {
    registerUsers,
    loginUsers
}