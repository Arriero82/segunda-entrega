const express = require("express");
const products = require('./routers/products')
const cart = require('./routers/carrito')     

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use('/api/productos/', products)
app.use('/api/carrito/', cart)

app.all('*', (req, res) => {
    res.json({res: 'no se puede acceder a esta ruta'})
})

const PORT = 8086;

const server = app.listen(PORT, () => {
  console.log(`listening on port ${server.address().port}`);
});
