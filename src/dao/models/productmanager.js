import fs  from "fs"


export class ProductManager {

    constructor(ruta) {
        this.path = ruta
    }

    async getProducts() { //busca archivo y si no lo encuentra lo crea
        if (fs.existsSync(this.path)) { 
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }))
        } else {
            return []
        }
    }

    async saveProducts (products) { // solo guarda productos en el archivo json 
        await fs.promises.writeFile(this.path, JSON.stringify(products), { encoding: 'utf-8' })
    }

}
