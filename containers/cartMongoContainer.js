const Carritos = require("../models/carrito.model");

class CartMongoContainer {
  async getCarritobyId(id) {
    try {
      let datos = await Carritos.findById(id);
      return datos;
    } catch (error) {
      console.log(error);
    }
  }

  async getCarrito() {
    try {
      let datos = await Carritos.find();
      return datos;
    } catch (error) {
      console.log(error);
    }
  }

  async createCarrito(timeStamp) {
    try {
      const newCart = new Carritos(timeStamp);
      await newCart.save(timeStamp);
      console.log("carrito creado");
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCarrito(idCarrito, idProducto) {
    try {
      await Carritos.updateOne(
        { _id: idCarrito },
        { $push: { products: { producto: idProducto, cantidad: 1 } } }
      );
    } catch (error) {
      console.log(error);   
    }
  }

  async deleteCarrito(id) {
    try {
      console.log("eliminando carrito");
      await Carritos.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CartMongoContainer;
