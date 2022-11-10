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
        const URL = "mongodb+srv://gabo:1234@cluster0.zbqcivt.mongodb.net/ecommerce?retryWrites=true&w=majority";
        mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('database connected');
      } catch (error) {
        console.log(error);
      }
}

