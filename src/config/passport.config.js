import passport from "passport";
import local from "passport-local";
import { creaHash, validPassword } from "../utils.js";
import { UsuariosManagerMongo } from "../dao/usersmanager.js";

const userManager = new UsuariosManagerMongo()

export const initPassport = () => {

    passport.use(
        'registro',
        new local.Strategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            async function (req, password, username, done) {
                try {
                    let { first_name, last_name, email} = req.body
                    if ( !email || !first_name || !last_name) {
                        // res.setHeader('Content-Type','application/json') 
                        // return res.redirect("/registro?error=Faltan datos")
                        return done(null, false)
                    }

                    let existsUser = await userManager.getBy({ email })
                    if (existsUser) {

                        return done(null, false)
                    }

                    // validaciones de contraseña, caracteres minimos, y email con formato valido

                    // if (password.length < 8) {
                    //     alert('La contraseña debe tener un mínimo de 8 caracteres')
                    // }

                    // if (password.length > 16) {
                    //     alert('La contraseña debe tener un máximo de 16 caracteres')
                    // }

                    password = creaHash(password)

                    let newUser = await userManager.create({ first_name, last_name, email, password })
                    return done(null, newUser)

                } catch (error) {
                    return done(error)
                }
            }

        )
    )

    passport.use(
        'login',
        new local.Strategy(
            {
                usernameField: 'email'
            }
            , async (password, username, done) => {
                try {
                    console.log({username})
                    let user = await userManager.getBy({ email:username })
                
                    if (!user) {
                        return done (null, false)
                    }
                
                    if(!validPassword(user, password)) {

                        return done (null, false)
                    }

                    return done (null, user)

                } catch (error) {
                    return done (error)
                }
            }

        )
    )

    passport.serializeUser((user, done) => {
        return done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let users = await userManager.getBy({ _id: id })
        return done(null, users)
    })
}



