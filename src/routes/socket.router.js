import { Server } from "socket.io";
import { Express } from "express";
import { router } from "./products.router";


const socket = (io) => {
    const router = express.Router()


    io.on("connection", (socket) => {
        socket.on("AddProduct", (ProductName) => {

            io.emit("productoAgregado", ProductName)
        })

        socket.on("deleteProduct", (ProductId) => {

            socket.emit ("productoEliminado", ProductId)
        })
    })

    return router
}


export default socket