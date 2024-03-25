
import mongoose from "mongoose";

const cartsColl = "carts";
const cartsSchema = new mongoose.Schema (

    {
        id: Number,
        quantity: Number, 
        
    }, 
    {
        timeStramps: true, strict:false
    }


)

export const modeloCarts = mongoose.model(cartsColl, cartsSchema);