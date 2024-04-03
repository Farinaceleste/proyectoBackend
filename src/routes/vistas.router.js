import { Router } from "express"
import { ProductManager } from "../dao/productmanager.js"
import { rutaProducts, rutaCarts } from "../utils.js"
import paginate from "mongoose-paginate-v2"
import { modeloProducts } from "../dao/models/products.models.js"
import { CartManager } from "../dao/cartmanager.js"

export const router = Router()

const productmanager = new ProductManager(rutaProducts)
const cartmanager = new CartManager(rutaCarts)

router.get("/", async (req, res) => {

    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    let products = await productmanager.getProducts(page, limit)

    console.log(JSON.stringify(products, null, 5))

    res.setHeader('Content-Type','text/html')

    let totalPages = products.totalPages;
    let prevPage = products.prevPage;
    let nextPage = products.nextPage;
    let hasPrevPage = products.hasPrevPage;
    let hasNextPage = products.hasNextPage;
    let docs = products.docs;

    res.status(200).render("home",{
        docs,
        totalPages, 
        prevPage, nextPage, 
        hasPrevPage, hasNextPage
    })

    // res.status(200).render("home", {
    //     products
    // })
})

router.get("/realtimeproducts", async (req, res) => {
    let products = await productmanager.getProducts()
    res.setHeader('Content-Type','text/html')

    res.status(200).render("realtimeproducts", {
        products
    })
});

router.get("/chat", async (req, res) => {

    res.setHeader('Content-Type','text/html')
    res.status(200).render('chat')
})

router.get("/carts/:cid", async (req, res) => {

    let { cid} = req.params

    let cart = await cartmanager.getCartsById(cid)
  

    res.setHeader('Content-Type','text/html')
    res.status(200).render('carts', {cart})
})

router.get("/products", async (req, res) => {
    
    
    let {pagina, limit}=req.query

    if(!pagina) {
        pagina = 1
    }

    if(!limit) {
        limit = 3
    }

    let {
        docs:products,
        totalPages,
        prevPage, nextPage,
        hasPrevPage, hasNextPage

    } = await productmanager.getProducts()

    console.log(JSON.stringify(products, null, 5))

    res.setHeader('Content-Type', 'text/html')
    res.status(200).render("products", {
        products,
        totalPages, 
        prevPage, nextPage, 
        hasNextPage, hasPrevPage
    })
    
})

