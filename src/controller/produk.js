const ProdukModel = require('../models/produk.js');
const getAllProducts = async (req, res) => {
    try {
        const [data] = await ProdukModel.getAllProducts();

        res.json({
            message: 'GET all proucts success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const createNewProducts = async (req, res) => {
    const { body } = req;

    // Validasi nama produk
    if (!body.name) {
        return res.status(400).json({
            message: 'Nama produk harus diisi',
            data: null,
        })
    }

    // Validasi harga produk
    if (!body.price) {
        return res.status(400).json({
            message: 'Harga produk harus diisi',
            data: null,
        })
    }

    // Validasi stok produk
    if (!body.stock) {
        return res.status(400).json({
            message: 'Stok produk harus diisi',
            data: null,
        })
    }
    try {
        await ProdukModel.createNewProducts(body);
        res.status(201).json({
            message: 'CREATE new products success',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const updateProducts = async (req, res) => {
    const { idProducts } = req.params;
    const { body } = req;
    try {
        await ProdukModel.updateProducts(body, idProducts);
        res.json({
            message: 'UPDATE Products success',
            data: {
                id: idProducts,
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const deleteProducts = async (req, res) => {
    const { idProducts } = req.params;
    try {
        await ProdukModel.deleteProducts(idProducts);
        res.json({
            message: 'DELETE products success',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}


module.exports = {
    getAllProducts,
    createNewProducts,
    updateProducts,
    deleteProducts
}