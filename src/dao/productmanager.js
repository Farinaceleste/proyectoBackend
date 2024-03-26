import { modeloProducts } from "./models/products.models.js"

export class ProductManager {

    constructor(ruta) {
        // this.path = ruta

    }

    async getProducts() { 
      
        return await modeloProducts.find()
        
    }

    async getProductsById (id) {
        return await modeloProducts.findById(id)
    }

    async getProductsBy(filtro) {
        return await modeloProducts.findOne(filtro)
    }

    async updateProducts (filtro) {
        return await modeloProducts.updateOne(filtro)
    }
    
    
    
    async deleteProducts (id) { // solo guarda productos en el archivo json 
        return await modeloProducts.deleteOne({_id : id})
    }

}
