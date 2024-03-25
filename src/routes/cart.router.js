import {Router} from "express";
import {ProductManager} from "../dao/productmanager.js";
import { rutaCarts, rutaProducts } from "../utils.js";
import { CartManager } from "../dao/cartmanager.js";
export const router = Router ()

let  productmanager=new ProductManager(rutaProducts)
let cartmanager = new CartManager(rutaCarts)


router.post ("/", async(req, res) => {

    let carts = await cartmanager.getCarts()

    let id
    if (carts.length > 0) {
      id = Number(Math.max(...carts.map(p => p.id)) + 1);
    } else {
        id=1
    }

    try {
        const newCart = {
        id: id.toString(),
        products: req.body.products || []
    }

    carts.push(newCart)
    cartmanager.saveCarts(carts)
   
    res.header("Content-type", "aplication/json")
    res.status(201).json({newCart})
    } catch (error){
        console.log("Error al guardar el carrito", error)
    }

})

router.get("/:cid", async (req, res) => {
    let carts = await cartmanager.getCarts();
    let cartId = req.params.cid.toString();
    let cart = carts.find(c => c.id === cartId);
    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json({ products: cart });
})

router.post("/:cid/product/:pid", async (req, res) => {
    let carts = await cartmanager.getCarts()
    let products = await productmanager.getProducts()
    const cartId = req.params.cid.toString()
    const productId = parseInt(req.params.pid)

    const cart = carts.find(c => c.id === cartId)
    if(!cart) {
        return res.status(400).json({ error: "Carrito no encontrado" })
    }


    const productAdd = products.find(p=>p.id == productId) 
        if(!productAdd){
            return res.status(400).json({ error: "Producto no encontrado" })
        }

    const productExist = cart.products.findIndex(p  => p.id == productId)
        if(productExist != -1) {
            cart.products[productExist].quantity++;
        } else {
            cart.products.push({ id: productId, quantity: 1 });
        }

        cartmanager.saveCarts(carts)
        res.status(200).json({ cart })
        


})


