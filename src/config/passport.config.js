import passport from "passport";
import local from "passport-local";

//definir funcion de config

export const initPassport = () => {

    passport.use(
        'registro', 
        new local.Strategy(
            {
                usernameField: 'email', 
                passwordField:'password', 
                passReqToCallback: true
            }, 
            async function (req, username, password,done ) {
                try {
                    
                } catch (error) {
                    return done(error)
                }




            }
        )
    )
}



