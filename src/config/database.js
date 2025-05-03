const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',     // sesuaikan
    database: 'test_koding'  // pastikan database ini sudah dibuat
});

module.exports = db.promise();