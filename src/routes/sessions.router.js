import { Router } from "express";
import { UsuariosManagerMongo } from "../dao/usersmanager.js";
import { creaHash, validPassword } from "../utils.js";
import passport from "passport";

export const router = Router()

let userManager = new UsuariosManagerMongo()

router.get('/github', passport.authenticate('github', {}), (req, res) => {


})

router.get('/callbackGithub', passport.authenticate('github', {failureRedirect:'/api/sessions/errorGithub'}), (req, res) => {

    req.session.usuario = req.user
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({
        payload: 'Login correcto', 
        user: req.user
})

})

router.get('/errorGithub', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json(
        {
            error: 'Error inesperado en el servidor', 
            detalle: 'Fallo al autenticar con Github'
        }
    )
})

router.get('/errorRegistro', (req, res) => {
    return res.redirect('/registro?error=Error en el proceso de registro')
})

router.post('/registro', passport.authenticate('registro', {failureRedirect:'/api/sessions/errorRegistro'}),async (req, res) => {

    // let { first_name, last_name, email, age, password } = req.body
    // if (!first_name || !last_name || !email || !age || !password) {

    //     // res.setHeader('Content-Type','application/json') 
    //     return res.redirect("/registro?error=Faltan datos")
    // }

    // let existsUser = await userManager.getBy({ email })

    // if (existsUser) {
    //     // res.setHeader('Content-Type','application/json') 
    //     // return res.status(400).json({error: `El usuario con email ${email} ya está registrado`})
    //     return res.redirect(`/registro?error=El usuario con email ${email} ya está registrado`)
    // }

    // // validaciones de contraseña, caracteres minimos, y email con formato valido

    // password = creaHash(password)

    // try {
    //     let newUser = await userManager.create({ first_name, last_name, email, age, password })

    //     // res.setHeader('Content-Type','application/json') 
    //     // res.status(200).json({payload: 'Registro exitoso', newUser})
    //     return res.redirect(`/registro?mensaje=Registro exitoso para el usuario ${email}`)

    // } catch (error) {

    //     // res.setHeader('Content-Type','application/json') 
    //     // return res.status(500).json({error:'Error inesperado en el servidor'})
    //     return res.redirect(`/registro?error=Error 500 - error inesperado`)
    // }

    console.log(req.user)
    return res.redirect(`/registro?mensaje=Registro exitoso para ${req.user}`)

}) 

router.get('/errorLogin', (req, res) => {
    return res.status(400).json({error: 'Error en el proceso de login'})
})

router.post('/login', passport.authenticate('login', {failureRedirect:'/appi/sessions/errorLogin'}) , async (req, res) => {

    // let { email, password } = req.body
    // if (!email || !password) {

    //     res.setHeader('Content-Type', 'application/json')
    //     return res.redirect("/registro?error=Faltan datos")
    // }

    // let user = await userManager.getBy({ email })

    // if (!user) {
    //     res.setHeader('Content-Type', 'application/json')
    //     return res.status(401).json({ error: 'Email no registrado' })
    // }

    // // if (user.password !== creaHash(password)) {
    // //     res.setHeader('Content-Type', 'application/json')
    // //     return res.status(401).json({ error: 'Contraseña incorrecta' })
    // // }

    // if(!validPassword(user, password)) {
    //     res.setHeader('Content-Type', 'application/json')
    //     return res.status(401).json({ error: 'Contraseña incorrecta' })
    // }

    let user = req.user
    user = { ...user }
    delete user.password

    req.session.user = user
   
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ message: 'login correcto', user })
    
    // if(200) {
    //     res.redirect('/profile')
    // }

})

router.get('/logout', (req, res) => {

    req.session.destroy(e => {
        if (e) {
            res.setHeader('Content-Type', 'application/json')
            res.status(500).json({
                error: 'Error al cerrar sesión',
                detalle: `${e.message}`
            })
        } else {
            console.log('Logout exitoso')
            res.redirect('/login');
        }
    })




})