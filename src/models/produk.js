const dbPool = require('../config/database');

const getAllProducts = () => {
    const SQLQuery = 'SELECT * FROM produk';

    return dbPool.execute(SQLQuery);
}

const createNewProducts = (body) => {
    const SQLQuery = `  INSERT INTO produk (name, price) 
                        VALUES ('${body.name}', '${body.price}')`;

    return dbPool.execute(SQLQuery);
}

const updateProducts = (body, idProducts) => {
    const SQLQuery = `  UPDATE produk 
                        SET name='${body.name}', price='${body.price}' 
                        WHERE id=${idProducts}`;

    return dbPool.execute(SQLQuery);
}

const deleteProducts = (idProducts) => {
    const SQLQuery = `DELETE FROM produk WHERE id=${idProducts}`;

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllProducts,
    createNewProducts,
    updateProducts,
    deleteProducts
}