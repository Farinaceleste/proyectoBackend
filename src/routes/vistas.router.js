
import { Router } from "express"
import { ProductManager } from "../managers/productmanager.js"
import { rutaProducts } from "../utils.js"

export const router = Router()

const productmanager = new ProductManager(rutaProducts)
router.get("/", (req, res) => {
    let products = productmanager.getProducts()
    res.status(200).render("home", {
        products
    });
});

router.get("/realtimeproducts", (req, res) => {
    let products = productmanager.getProducts()
    res.status(200).render("realtimeproducts", {
        products
    })
});

