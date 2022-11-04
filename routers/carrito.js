const express = require("express");
const { Router } = express;
const MongoProducts = require("../containers/mongoContainer");
const products = new MongoProducts();
const CartMongoContainer = require('../containers/cartMongoContainer')
const carts = new CartMongoContainer();
const cartRouter = Router();

cartRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const cart = await carts.getCarritobyId(id);
  try {
      res.send(cart);
  } catch (error) {
      res.send([]);
  }
});

cartRouter.get("/", async (req, res) => {
  const cartList = await carts.getCarrito();
  try {
      res.send(cartList);
  } catch (error) {
      res.send([]);
  }
});

cartRouter.post("/", async (req, res) => {
  const timeStamp = {timeStamp: Date.now()}
  const cart = await carts.createCarrito(timeStamp);
  res.status(201).send(`carrito guardado ID: ${cart}`);
});

cartRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await carts.deleteCarrito(id);
  res.status(201).send(`carrito ${id} eliminado`);
});

cartRouter.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const cart = await carts.getCarritobyId(id);
  console.log(cart.products);
  try {
    res.status(200).send(cart.products);
  } catch (error) {
    res.send([]);
  }
});

cartRouter.post("/:id/productos", async (req, res) => {
  const { id } = req.params;  
  console.log(id);
  console.log(req.query.producto);
  const prod = await products.getProductbyId(req.query.producto)
  const cart = await carts.getCarritobyId(id);
  res.status(201).send(`producto ${prod} agregado al carrito ${cart}`)
}); 

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
    const { id, id_prod } = req.params;  
    const cart = await carts.getById(id);
    let prodId = cart[0].productos.findIndex(productos => productos.id == id_prod);
    cart[0].productos.splice(prodId,1)   
    await carts.edit(cart[0])
    res.status(201).send(cart[0])
})

/* cartRouter.get("/", async (req, res) => {
    const cart = await carts.getAll();
    try {
      res.send(cart);
    } catch (error) {
      res.send([]);
    }
  });
 */

module.exports = cartRouter;
