import fs from "fs"
import { modeloCarts } from "./models/carts.models.js"

export class CartManager{


    async getCarts() { 

        let carritos = await modeloCarts.find().populate("products.product").lean();
        console.log(JSON.stringify(carritos, null, 2));
        return carritos
    }

    async getCartsById (cid) {
        // await fs.promises.writeFile(this.path, JSON.stringify(carts), { encoding: 'utf-8' })
    try{  
        let carrito = await modeloCarts.findById({_id: cid}).lean()
        console.log(carrito)
        return carrito;
    } catch  (err){
        console.log(err);
      }
    }

    async updateCarts(id, modificacion={}){  
        
        return await modeloCarts.updateOne({_id:id}, modificacion)    
    }
    
    async deleteCarts (id) {
        
        return await  modeloCarts.deleteOne({_id : id}).lean()
    }

    async saveCart (cart) {

        return await modeloCarts.create(cart)
    }

    
}
