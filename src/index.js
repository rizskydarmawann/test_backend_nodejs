const express = require('express')
const middlewareLogRequest = require('./middleware/logs');
const productsRoutes = require('./routes/produk.js');

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());


app.use('/products', productsRoutes);



app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(4000, () => {
    console.log('Server berhasil di running di port 4000');
})

