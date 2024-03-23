import fs, { existsSync, writeFileSync } from "fs"


export class CartManager{

    constructor(ruta) {
        this.path=ruta
    }

    getCart() {
        if(fs.existsSync(this.path)) {
            return JSON.parse(fs.readFileSync(this.path, {encoding:"utf-8"}))
        }
        else {
            return []
        }
    }

    createCart (product) {

        let carts = this.getCart();
        

        let id = 1
        if(carts.length >0 ) {
            id = Math.max(...carts.map(d=>d.id)) + 1

        }
        const existCart  = carts.some(p => p.id == product.id); 
        
        if (existCart) {
            const cartUpdate = carts.find(p => p.id === product.id)
            cartUpdate.quantity++
            fs.writeFileSync(this.path ,JSON.stringify(carts))            
            return cartUpdate
        } 

          let newCart={
            id,
            quantity : 1,
            ...carts
        }

        quantity++
        carts.push(newCart)


        fs.writeFileSync(this.path,JSON.stringify(carts, null, 5),{encoding:'utf-8'})

        return newCart

    }

    // updateCarts () {

   // }

    deleteCarts(id) {

        let carts= this.getCart()

        const existCart  = carts.some(p => p.id == id); 

        if(!existCart) {
            console.log("No se puede eliminar el carrito, porque no existe")
        }
        
        const index = carts.findIndex((p) => p.id === id)
        carts.splice(index, 1)

        fs.writeFileSync(this.path,JSON.stringify(carts),{encoding:'utf-8'})

    }


}
