import {Router} from "express";
import {ProductManager} from "../dao/productmanager.js";
import { rutaCarts, rutaProducts } from "../utils.js";
import { CartManager } from "../dao/cartmanager.js";
import mongoose from "mongoose";
export const router = Router ()


let  productmanager = new ProductManager(rutaProducts)
let cartmanager = new CartManager(rutaCarts)

router.get('/', async (req, res) => {

  try {
    let carts = await cartmanager.getCarts()
    
    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ carts })

  } catch (error) {
    res.setHeader("Content-Type", "application/json")
    res.status(500).json({ error: "Error inesperado en el servidor" })
  }

})

router.get("/:cid", async (req, res) => {

  let { cid } = req.params

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    res.setHeader("Content-Type", "application/json")
    res.status(400).json({ error: "id inválido" });
  }

  try {
    console.log(cid);

    const cartById = await cartmanager.getCartsById(cid);
    
    if (cartById) {
      console.log("Hola");
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json({ cartById })
    } else {
      res.setHeader('Content-Type', 'application/json')
      return res.status(400).json({ error: `No existen carritos con el id ${cid}` })
    }

  } catch (error) {
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json({ error: "Error inesperado en el servidor" })
  }
})

router.post ("/", async(req, res) => {

    let carts = await cartmanager.getCarts()

    // let id
    // if (carts.length > 0) {
    //   id = Number(Math.max(...carts.map(p => p.id)) + 1);
    // } else {
    //     id=1
    // }

    try {
        const newCart = {
        id: id.toString(),
        products: req.body.products || []
    }

    carts.push(newCart)
    cartmanager.saveCart(carts)
   
    res.header("Content-type", "aplication/json")
    res.status(201).json({newCart})
    } catch (error){
        console.log("Error al guardar el carrito", error)
    }
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

        cartmanager.saveCart(carts)
        res.status(200).json({ cart })
        
})

router.put("/:cid", async (req, res) => {

  let {id} = req.params



    


})

router.put("/:cid/products/:pid", async (req, res) => {


})

router.delete("/:cid/products/:pid", async (req, res) => {


})

router.delete("/:cid", async (req, res) => {
    let { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.setHeader("Content-Type", "application/json")
      res.status(400).json({ error: "id inválido" });
    }
  
    try {
      let resultado = await cartmanager.deleteCarts(id)
      if (resultado.deletedCount > 0) {
        res.status(200).json({
          message: `Se ha eliminado el carrito con id: ${id}`
        })
      } else {
        res.setHeader("Content-Type", "application/json")
        res.status(400).json({ error: `No existen carritos con el id: ${id}` });
      }
  
    } catch (error) {
      res.setHeader("Content-Type", "application/json")
      res.status(500).json({ error: 'Error en el servidor' });
  
    }

})



