import fs  from "fs"
import { modeloProducts } from "./models/products.models.js"

export class ProductManager {

    constructor(ruta) {
        // this.path = ruta


    }

    async getProducts() { 
        // if (fs.existsSync(this.path)) { 
        //     return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }))
        // } else {
        //     return []
        // }
        return await modeloProducts.find()
    }

    async getProductsById (id) {

        return await modeloProducts.findById(id)
    }
    
    
    
    async saveProducts (products) { // solo guarda productos en el archivo json 
        //await modeloProducts.create(products)
    }

}
