
const socket = (io) => {
    const router = express.Router()


    io.on("connection", (socket) => {
        socket.on("AddProduct", (datos) => {

            io.emit("productoAgregado", datos)
        })

        socket.on("deleteProduct", (datos) => {

            socket.emit ("productoEliminado", datos)
        })
    })

    return router
}


export default socket