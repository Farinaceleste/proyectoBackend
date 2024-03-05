import fs, { existsSync, writeFileSync } from "fs"


export class ProductManager {

    constructor(ruta) {
        this.path = ruta
    }

    getProducts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(fs.readFileSync(this.path, { encoding: "utf-8" }))
        } else {
            return []
        }
    }

    getProductsById(id) {

        let products = this.getProducts(id);
        const findId = products.find(p => p.id === products.id)
        return findId

    }

    createProduct(product) {
        let products = this.getProducts();


        const existProductById = products.some((p) => p.id === product.id);
        const existProductByTitle = products.some((p) => p.title === product.title);

        if (existProductById || existProductByTitle) {
            console.log(`El producto ya existe`);
            return null;
        }

        let id = 1;
        if (products.length > 0) {
            id = Math.max(...products.map(p => p.id)) + 1;
        }

        let newProduct = {
            id,
            ...product
        }

        products.push(newProduct);
        try {

            fs.writeFileSync(this.path, JSON.stringify(products), { encoding: 'utf-8' })
            return newProduct;

        } catch (error) {
            return null
        }



    }

    deleteProduct(id) {

        let products = this.getProducts()

        const index = products.findIndex(p => p.id === id);

        if (!index) {
            console.log("No se puede eliminar el producto, porque no existe")
            return
        }

        const deleteProducts = products.splice(index, 1)

        fs.writeFileSync(this.path, JSON.stringify(products), { encoding: 'utf-8' })

        return deleteProducts

    }


}
