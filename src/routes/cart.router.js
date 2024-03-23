import {Router} from "express";
import {ProductManager} from "../dao/models/productmanager.js";
import { rutaCarts, rutaProducts } from "../utils.js";
import { CartManager } from "../dao/models/cartmanager.js";
export const router = Router ()

let  productmanager=new ProductManager(rutaProducts)
let cartmanager = new CartManager(rutaCarts)




router.get ("/", (req, res) => {

    let carts = cartmanager.getCart()

    
    res.header("Content-type", "aplication/json")
    res.status(200).json({carts})
})

router.post ("/", (req, res) => {

    let {id, quantity}= req.body

    // let productoAgregar = cartmanager.updateCart(id,quantity);
     

    if(!title || !price ||!description ||!stock ||!code ) {
        return res.status(400).json({error: "Complete los campos faltantes"})
    }

    res.header("Content-type", "aplication/json")
    res.status(201).json({})
})