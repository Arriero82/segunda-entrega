const admin = require("firebase-admin");
const productos = require('../productos.json')
const serviceAccount = require("../ecommerce-bdd20-firebase-adminsdk-mtie2-e1eddb3d2d.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

class FirebaseProducts {

    async createProduct(product){
        const db = admin.firestore()
        const query = db.collection('productos')
        try {
            const doc = query.doc();
            await doc.create(product)
            console.log('archivo creado');
        } catch (error) {
            console.log(error);     
        }
    }
    async getProduct(){
        const db = admin.firestore()
        const query = db.collection('productos')
        try {
            const queryProductos = await query.get();
            const res = queryProductos.docs.map(item => ({id: item.id, ...item.data()}))
            return res;
        } catch (error) {
            console.log(error);   
        }
    }
    async getProductById(id){
        const db = admin.firestore()
        const query = db.collection('productos')
        try {   
            const queryProducto = query.doc(id);
            const item = await queryProducto.get();
            const res = {id: item.id, ...item.data()};
            return res;
        } catch (error) {
            console.log(error);   
        }
    }
    async updateProduct(id, newData){
        const db = admin.firestore()
        const query = db.collection('productos')
        try {
            const queryProducto = query.doc(id)
            const item =  await queryProducto.update({...newData})
            console.log(`actualizando producto ${id}`);
            return item;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteProdct(id){
        const db = admin.firestore()
        const query = db.collection('productos')
        try {
            const queryProducto = query.doc(id);
            await queryProducto.delete()
            console.log(`eliminando producto ${id}`);
        } catch (error) {
            console.log(error);
        }
    }
}

const cargarBDD = () => {
    const fproduct = new FirebaseProducts();
    productos.forEach(async (prod) => {
        fproduct.createProduct(prod)
    })
}

//cargarBDD()

module.exports = FirebaseProducts;