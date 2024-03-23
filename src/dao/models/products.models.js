import mongoosh from "mongoosh";

const productsColl = "products";
const productsSchema = new mongoosh.Schema (

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
        timeStramps: true
    }


)

export const modeloProducts = mongoosh.model(productsColl, productsSchema);