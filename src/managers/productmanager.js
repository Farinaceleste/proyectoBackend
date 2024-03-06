import fs  from "fs"


export class ProductManager {

    constructor(ruta) {
        this.path = ruta
    }

    getProducts() { //busca archivo y si no lo encuentra lo crea
        if (fs.existsSync(this.path)) { 
            return JSON.parse(fs.readFileSync(this.path, { encoding: "utf-8" }))
        } else {
            return []
        }
    }

    saveProducts (products) { // solo guarda productos en el archivo json 
        fs.writeFileSync(this.path, JSON.stringify(products), { encoding: 'utf-8' })
    }

}
