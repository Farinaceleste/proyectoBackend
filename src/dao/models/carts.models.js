import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2"
import { modeloProducts } from "./products.models.js";

const cartColl = "cart"
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modeloProducts,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }
)

//Esquema de un producto para agregar al carrito
const cartSchema = new mongoose.Schema(
  {
    products: {type:[cartItemSchema]},
    total: {
      type: Number,
      default: 0
    }
  },
  {
    timeStramps: true, strict: false
  }
)

cartSchema.plugin(paginate)

export const modeloCarts = mongoose.model(cartColl, cartSchema);