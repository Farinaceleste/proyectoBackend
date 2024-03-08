import { Router } from "express";
import { ProductManager } from "../managers/productmanager.js";
import { rutaProducts } from "../utils.js";
export const router = Router();

let productmanager = new ProductManager(rutaProducts);

router.get('/', (req, res) => {
  let products = productmanager.getProducts();

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ products });
})

router.get("/:id", (req, res) => {

  let products = productmanager.getProducts()

  let id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El id debe ser numérico" })
  }

  let prod = products.find(p => p.id === id)
  if (!prod) {
    return res.status(404).json({ error: `No existen productos con el id ${id}` })
  }

  res.setHeader("Content-Type", "application/json")
  res.status(200).json({ prod })


});

router.post("/", async (req, res) => {
  let { title, price, description, stock, code, thumbnail } = req.body;

  if (!title || !price || !description || !stock || !code ) {
    return res.status(400).json({ error: "Complete los campos faltantes" });
  }

  let products = await productmanager.getProducts()

  const existProductById = products.find((p) => p.title === products.title);

  if (existProductById) {
    console.log(`El producto con id "${products.title}" ya existe`);
    return null;
  }

  let id = 1;
  if (products.length > 0) {
    id = Number(Math.max(...products.map(p => p.id)) + 1);
  }

  try {
    const newProduct = {
      ...req.body,
      id
    }

    products.push(newProduct);
    productmanager.saveProducts(products)
    req.io.emit("newProduct", newProduct);
    res.setHeader("Content-Type", "application/json")
    res.status(201).json({ newProduct });

  } catch (error) {
    console.log('Error al guardar  el producto', error);
  }

})

router.post("/:id", async (req, res) => {
  let id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El id debe ser numérico" });
  }

  let products = await productmanager.getProducts()

  let index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `El producto con id ${id} no se encontró` });
  }

  products[index] = {
    ...products[index],
    ...req.body,
    id
  };

  productmanager.saveProducts(products);

  res.setHeader("Content-Type", "application/json");
  res.status(201).json({ ProductoModificado: products[index] });
});



router.delete("/:id", async (req, res) => {
  let id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El id debe ser numérico" });
  }

  let products = await productmanager.getProducts()

  let indiceprod = products.findIndex(p => p.id === id)
  if (indiceprod === -1) {
    return res.status(404).json({ error: `No se encontraron productos con el id ${id}` })
  }

  let deletedProd = products[indiceprod]
  products.splice(indiceprod, 1)

  productmanager.saveProducts(products);

  req.io.emit("deleteProduct", deletedProd)

  res.setHeader("Content-Type", "application/json")
  res.status(200).json({ deletedProd })
})
