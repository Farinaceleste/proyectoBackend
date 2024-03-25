import fs from "fs"

export class CartManager{

    constructor(ruta) {
        this.path=ruta
    }

    async getCarts() { 
        if (fs.existsSync(this.path)) { 
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }))
        } else {
            return []
        }
    }

    async saveCarts (carts) {
        await fs.promises.writeFile(this.path, JSON.stringify(carts), { encoding: 'utf-8' })
    }

    
}
