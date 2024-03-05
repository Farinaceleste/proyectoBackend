import { Router } from "express";
import { ProductManager } from "../managers/productmanager.js";
import { rutaProducts } from "../utils.js";
export const router = Router();

let productmanager = new ProductManager(rutaProducts);

router.get('/', (req, res) => {
  let products = productmanager.getProducts();
  res.status(200).json({ products });
});

router.get("/:id", (req, res) => {
  let productsId = productmanager.getProductsById(req.params.id);
  res.status(200).json({ productsId });
});

router.post("/", (req, res) => {
  let { title, price, description, stock, code, thumbnail } = req.body;

  if (!title || !price || !description || !stock || !code) {
    return res.status(400).json({ error: "Complete los campos faltantes" });
  }

  try {
    const newProduct = productmanager.createProduct(req.body);

     //


    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ newProduct });

    req.io.emit("new_product", newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El id debe ser numérico" });
  }

  let deleteProduct = productmanager.deleteProduct(id);

  if (deleteProduct) {
    res.status(200).json(deleteProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }

  req.io.emit("deleteProduct", deleteProduct);
  res.setHeader('Content-Type', 'application/json');
});