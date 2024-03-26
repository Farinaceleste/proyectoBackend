import mongoose from "mongoose"

const productsColl = "products"
const productsSchema = new mongoose.Schema (
    
    {
        title: String, 
        description: String, 
        code: Number, 
        price: Number, 
        status: Boolean, 
        thumbnail: String, 
        id: Number
    }, 
    {
        timeStramps: true, strict:false
    }

)

export const modeloProducts = mongoose.model(productsColl, productsSchema);