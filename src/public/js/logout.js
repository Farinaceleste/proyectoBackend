let btnDeleteSesion = document.getElementById("deleteSesion")


btnDeleteSesion.addEventListener('click', async (e) => {
    e.preventDefault()

    let resultado = await fetch("/api/sessions/logout", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(resultado);

    let status = resultado.status

        if (status == 200) {
            Swal.fire ({
                title: 'Logout exitoso', 
                confirmButtonText:  `Aceptar`,   
                icon: 'success',  
            }).then((result) => {
                location.href ="/"
            })
           
            
        } else {
            Swal.fire ({
                title: 'ERROR', 
                confirmButtonText:  `Aceptar`,   
                icon: 'error',  
            })
        }

   
})