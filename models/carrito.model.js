const {Schema, model} = require('mongoose');

const cartSchema = new Schema({
    timeStamp: {type: Number, required: true},
    products: [{producto: String, cantidad: Number}]
})  

module.exports = model('Carritos', cartSchema); 