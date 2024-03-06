import path from  "path";
import express from "express"
import __dirname from "./utils.js";
import {engine} from "express-handlebars"

import {Server} from "socket.io";
import {router as CartRouter} from "./routes/cart.router.js";
import {router as ProductRouter} from "./routes/products.router.js";
import {router as vistasRouter} from "./routes/vistas.router.js";

const PORT = 8080;
export let io
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use (express.static(path.join(__dirname, "/public")))


app.use ("/", vistasRouter)
app.use("/realtimeproducts", (req, res, next) => {
    req.io=io
    next()
}, vistasRouter)
app.use("/api/products", (req, res, next) => {
    req.io=io
    next()
}, ProductRouter)

app.use("/api/carts", CartRouter)


const server = app.listen(PORT, ()=> {
    console.log(`Server escuchando en puerto ${PORT}`)
});

io=new Server(server)

io.on("connection", socket => {
    console.log(`Se conectó un cliente con id${socket.id}`)

    
})