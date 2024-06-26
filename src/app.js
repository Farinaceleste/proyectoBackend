import path from "path";
import express from "express";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { router as CartRouter } from "./routes/cart.router.js";
import { router as ProductRouter } from "./routes/products.router.js";
import { router as vistasRouter } from "./routes/vistas.router.js";
import {router as sessionsRouter} from './routes/sessions.router.js';
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { initPassport } from "./config/passport.config.js";
import passport from "passport";

const PORT = 8080;

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(
    {
        secret: "CoderCoder123", 
        resave: true,
        saveUninitialized:true, 
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://farinaceleste:cele6146@cluster0.nwo2jkx.mongodb.net/ecommerce", 
            ttl:360
        })
    }
))
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "/public")))
app.use("/", vistasRouter)
app.use("/realtimeproducts", vistasRouter)

app.use("/api/products", (req, res, next) => {
    req.io = io;
    next();
}, ProductRouter);

app.use("/api/carts", CartRouter)
app.use("/api/sessions", sessionsRouter)

app.get("/session", (req, res) => {

    let mensaje = "Bienvenido"
    console.log(mensaje)

    if (req.session.contador)  {
        req.session.contador++
        mensaje += `.Visitas a esta ruta: ${req.session.contador}`
    } else {
        req.session.contador = 1
    }
    
    res.setHeader("content-type", "text/plain")
    res.status(200).send(mensaje)
})

initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.get("*", (req, res) => {
    res.setHeader("content-type", "text/plain")
    res.status(404).send("error 404 - page not found")
})

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
});

let mensajes = []
let usuarios = []

const io = new Server(server)

io.on("connection", socket => {
    console.log(`Se conectó un cliente con id ${socket.id}`)

    socket.on("new-user", nombre => {
        usuarios.push({ id: socket.id, nombre })
        socket.emit("historial", mensajes)
        socket.broadcast.emit("nuevoUsuario", nombre)
    })

    socket.on("mensaje", (nombre, mensaje) => {
        mensajes.push({ nombre, mensaje })
        io.emit("nuevoMensaje", nombre, mensaje)
    })

    socket.on("disconnect", () => {
        let usuario = usuarios.find(u => u.id === socket.id)
        if (usuario) {
            socket.broadcast.emit("saleUsuario", usuario.nombre)
        }
    })
})

const connect = async () => {
    try {
        //MONGOSH Base de datos local
        //await mongoose.connect("mongodb+srv://farinafernandez304:cele6146@cluster0.hute7bc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=ecommerce")
        //console.log('Conectado a Mongosh')

        //MONGO ATLAS Base de datos en Atlas
        await mongoose.connect("mongodb+srv://farinaceleste:cele6146@cluster0.nwo2jkx.mongodb.net/ecommerce")
        console.log('Conectado a Mongo Atlas')
    }
    catch (error) {
        console.log(error.message)
    }
}
connect()

