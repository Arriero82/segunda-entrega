const express = require("express");
const { Router } = express;
const MongoProducts = require("../containers/mongoContainer");
const products = new MongoProducts();
const FirebaseProducts = require('../containers/firebaseContainer')
const fproducts = new FirebaseProducts();
const router = Router();

router.get("/", async (req, res) => {
  //prod = await products.getProduct();
  prod = await fproducts.getProduct();
  try {
    res.send(prod);
  } catch (error) {
    res.send([]);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  //prod = await products.getProductbyId(id);
  prod = await fproducts.getProductById(id)
  try {
    res.status(200).send(prod);
  } catch (error) {
    res.send([]);
  }
});

const admin = (req, res, next) => {
  //if(req.query.admin=="true"){
    next()
  //}else{
    //res.send('no tiene permisos para acceder a la ruta')
  //}
}

router.post("/", admin, async (req, res) => {
    await fproducts.createProduct(req.body)
    //await products.createProduct(req.body);
    //const prods = await products.getProduct()
    const prods = await fproducts.getProduct()
    res.status(201).send(prods);
}); 

router.put("/:id", admin, async (req, res) => {
    const {id} = req.params
    //await products.updateProduct(id, req.body);
    //const prod = await products.getProductbyId(id)
    await fproducts.updateProduct(id, req.body);
    const prod = await fproducts.getProductById(id)
    res.status(201).send(prod);
});

router.delete("/:id", admin, async (req, res) => {
    const { id } = req.params;
    //await products.deleteProduct(id);
    //prod = await products.getProduct();
    await fproducts.deleteProdct(id);
    prod = await fproducts.getProduct();
    res.status(201).send(prod);
});

module.exports = router;
  