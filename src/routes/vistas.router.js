
import { Router } from "express"
import { ProductManager } from "../dao/productmanager.js"
import { rutaProducts } from "../utils.js"

export const router = Router()

const productmanager = new ProductManager(rutaProducts)

router.get("/", async (req, res) => {
    let products = await productmanager.getProducts()
    

    res.status(200).render("home", {
        products
    });
});

router.get("/realtimeproducts", async (req, res) => {
    let products = await productmanager.getProducts()
   
    res.status(200).render("realtimeproducts", {
        products
    })
});

router.get("/chat", async (req, res) => {

    res.status(200).render('chat')
})

