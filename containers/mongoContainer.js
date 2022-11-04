const mongoose = require("mongoose");
const Productos = require('../models/productos.model')

class MongoProducts {
    constructor (){
        this.connect();
    }
    connect() {
        try {
            const URL = 'mongodb+srv://gabo:1234@cluster0.zbqcivt.mongodb.net/ecommerce?retryWrites=true&w=majority';
            mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('database connected');
          } catch (error) {
            console.log(error);
          }
    }
    async createProduct(producto){
        try {   
            const newProduct =  new Productos(producto);
            await newProduct.save();
            console.log('producto creado');
        } catch (error) {
            console.log(error);
        }
    }
    async getProduct(){
        try {
            let datos = await Productos.find();
            return datos;
        } catch (error) {
            console.log(error);
        }
    }
    async getProductbyId(id){
        try {
            let datos = await Productos.findById(id);
            return datos;
        } catch (error) {
            console.log(error);
        }
    }
    async updateProduct(id, newData){
        console.log(id);
        console.log(newData);   
        try {       
            console.log('actualizando producto');
            await Productos.findOneAndUpdate({_id: id},{...newData}, {returnOriginal: false})
        } catch (error) {
            console.log(error);
        }       
    }
    async deleteProduct(id){    
        try {
            console.log('eliminando producto');
            await Productos.deleteOne({_id: id})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MongoProducts