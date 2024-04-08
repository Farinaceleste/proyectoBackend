import { Router } from "express";
import { UsuariosManagerMongo } from "../dao/usersmanager.js";
import { creaHash } from "../utils.js";
export const router = Router ()

let userManager = new UsuariosManagerMongo()

router.post ('/registro', async ( req, res ) => {

    let {first_name, last_name, email, age, password} = req.body
    if (!first_name || !last_name || !email || !age || !password){

        res.setHeader('Content-Type','application/json') 
        return res.redirect("/registro?error=Faltan datos")
    }

    let existsUser = await userManager.getBy({email})

    if(existsUser) {
        res.setHeader('Content-Type','application/json') 
        return res.status(400).json({error: `El usuario con email ${email} ya está registrado`})
    }

    // validaciones de contraseña, caracteres minimos, y email con formato valido

    password=creaHash(password)

    try {
        let newUser = await userManager.create({first_name, last_name, email, age, password})

        res.setHeader('Content-Type','application/json') 
        res.status(200).json({payload: 'Registro exitoso', newUser})

    } catch (error) {
        res.setHeader('Content-Type','application/json') 
        return res.status(500).json({error:'Error inesperado en el servidor'})
    }

})

router.post ('/login', async ( req, res ) => {

    let {email, password} = req.body
    if (!email || !password){

        res.setHeader('Content-Type','application/json') 
        return res.redirect("/registro?error=Faltan datos")
    }

    let user = await userManager.getBy({email})

    if(!user) {
        res.setHeader('Content-Type','application/json') 
        return res.status(401).json({error: `Credenciales incorrectas`})
    }

    if(user.password !== creaHash(password)) {
       
            res.setHeader('Content-Type','application/json') 
            return res.status(401).json({error: `Credenciales incorrectas`})
    }
    
    user = {...user} 
    delete user.password

    req.session.user = user
    
    res.setHeader('Content-Type','application/json') 
    res.status(200).json({message: 'login correcto', user})

})

router.get('/logout', (req, res) => {

    req.session.destroy(e=> {
        if(e) {
            res.setHeader('Content-Type','application/json') 
            res.status(500).json({
                error: 'Error al cerrar sesión', 
                detalle:`{e.message}`
            })
        }
    }) 

    res.setHeader('Content-Type','application/json') 
    res.status(200).json({message: 'logout exitoso'})

})