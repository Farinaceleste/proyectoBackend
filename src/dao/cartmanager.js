
import { modeloCarts } from "./models/carts.models.js"

export class CartManager{


    async getCarts() { 

        let carritos = await modeloCarts.find().populate("products.product").lean();
        console.log(JSON.stringify(carritos, null, 2));
        return carritos
    }

    async getCartsById (cid) {
    try{  
        let carrito = await modeloCarts.findById(cid).populate("products.product").lean()
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
        
        return await  modeloCarts.findByIdAndDelete(id).lean()
    }

    async saveCart (cart) {

        return await modeloCarts.create(cart)
    }

    async findAndUpdate (cid, pid) {

        return await modeloCarts.findByIdAndUpdate (cid, pid)
    }

    async deleteFromCart(cid, pid) {

        return await modeloCarts.findByIdAndUpdate(cid, { $pull: { products: { _id: pid } } },
            { new: true })
    }
    
}
