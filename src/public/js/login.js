
let btnSubmit = document.getElementById("submit")
let inputEmail = document.getElementById("email")
let inputPassword = document.getElementById("password")
let divMensaje = document.getElementById("mensaje")

btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault()

    let body = {
        email: inputEmail.value,
        password: inputPassword.value
    }

    let resultado = await fetch("/config/passport.config.js", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    let status = resultado.status
    let datos = await resultado.json()
    if (status == 200) {
        Swal.fire ({
            title: 'Login exitoso', 
            confirmButtonText:  `Aceptar`,   
            icon: 'success',  
        }).then((result) => {
            location.href ="/perfil"
        })
        
    } else {
        Swal.fire ({
            title: 'ERROR', 
            confirmButtonText:  `Aceptar`,  
            text: 'Usuario y/o contraseña incorrectos',
            icon: 'error',  
        })
    }

})







