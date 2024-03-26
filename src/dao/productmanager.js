import { modeloProducts } from "./models/products.models.js"


export class ProductManager {


    async getProducts() { 
        return await modeloProducts.find().lean()
    }

    async getProductsById (id) {
        return await modeloProducts.findById(id).lean()
    }

    async getProductsBy(filtro) {
        return await modeloProducts.findOne(filtro).lean()
    }

    async updateProducts (filtro) {
        return await modeloProducts.updateOne(filtro).lean()
    }
    
    async deleteProducts (id) { 
        return await modeloProducts.deleteOne({_id : id}).lean()
    }

}
