const express = require("express");
const mongoose = require("mongoose");

class Server {
    constructor () {
        this.app = express();
        this.usersPath = {carrito: '/api/carrito', productos: '/api/productos'};
        this.connectDB()
    }
    async connectDB() {
        await dbConnection()
    }


}

async function dbConnection() {
    try {
        const URL = "mongodb://localhost:27017/ecommerce";
        mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('database connected');
      } catch (error) {
        console.log(error);
      }
}

