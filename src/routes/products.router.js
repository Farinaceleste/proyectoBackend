import { Router } from "express";
import { ProductManager } from "../dao/productmanager.js";
import { rutaProducts } from "../utils.js";
import mongoose from "mongoose";
export const router = Router();

let productmanager = new ProductManager(rutaProducts);

router.get('/', async (req, res) => {

  try {
    //GET SIN PAGINAR
    //let products = await productmanager.getProducts()

    //GET PAGINADO
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    let products = await productmanager.getProducts(page, limit)

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ products })
  } catch (error) {
    res.setHeader("Content-Type", "application/json")
    res.status(500).json({ error: "Error inesperado en el servidor" })
  }

})

router.get("/:id", async (req, res) => {

  let { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.setHeader("Content-Type", "application/json")
    res.status(400).json({ error: "id inválido" });
  }

  try {
    let prodById = await productmanager.getProductsById(id)

    if (prodById) {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json({ prodById })
    } else {
      res.setHeader('Content-Type', 'application/json')
      return res.status(400).json({ error: `No existen productos con el id ${id}` })
    }

  } catch (error) {
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json({ error: "Error inesperado en el servidor" })
  }

})

router.post("/", async (req, res) => {
  let { title, price, description, code, thumbnail } = req.body;

  if (!title || !price || !description || !code) {
    return res.status(400).json({ error: "Complete los campos faltantes" })
  }

  try {
    let newProduct = await productmanager.addProducts({title, price, description, code, thumbnail})
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json({newProduct})

  } catch(error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: "Error al agregar el producto" })
  }


})

router.post("/:id", async (req, res) => {
  let id = req.params

  // let products = await productmanager.getProducts()

  // let index = products.findIndex(p => p.id === id);

  // if (index === -1) {
  //   return res.status(404).json({ error: `El producto con id ${id} no se encontró` });
  // }

  let products = await productmanager.updateProducts(id)

  // products[index] = {
  //   ...products[index],
  //   ...req.body,
  //   id
  // };

  productmanager.saveProducts(products);

  res.setHeader("Content-Type", "application/json");
  res.status(201).json({ ProductoModificado: products[index] });
});

router.put("/:id", async (req, res) => {

  let { id } = req.params
  let updateProd = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.setHeader("Content-Type", "application/json")
    res.status(400).json({ error: "id inválido" });
  }

  if(updateProd.hasOwnProperty('_id')){
    delete updateProd._id
  }

  if(updateProd.code){
    let code = await productmanager.getProductsBy({code: updateProd.code, _id:{$ne:id}})
    if (code) {
      res.setHeader("Content-Type", "application/json")
      res.status(400).json({ error: `Ya existe el producto con code: ${code}` });
    }
  }

  try {
    let resultado = await productmanager.updateProducts({_id:id}, updateProd)


    if (resultado.modifiedCount > 0) {
      res.status(200).json({ message: `Producto modificado con id ${id}` })
    } else {
      res.setHeader('Content-Type', 'application/json')
      return res.status(400).json({ error: `No existen productos con el id ${id}` })
    }

  } catch (error) {
    console.error(error)
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json({ error: "Error inesperado en el servidor" })
  }

})

router.delete("/:id", async (req, res) => {

  let { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.setHeader("Content-Type", "application/json")
    res.status(400).json({ error: "id inválido" });
  }

  try {
    let resultado = await productmanager.deleteProducts(id)
    if (resultado.deletedCount > 0) {
      res.status(200).json({
        message: `Se ha eliminado el producto con id: ${id}`
      })
    } else {
      res.setHeader("Content-Type", "application/json")
      res.status(400).json({ error: `No existen productos con el id: ${id}` });
    }

  } catch (error) {
    res.setHeader("Content-Type", "application/json")
    res.status(500).json({ error: 'Error en el servidor' });

  }

})
