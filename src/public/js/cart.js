
async function borrar(idProd) {

    const url = `http://localhost:8080/api/carts/${idProd}`

    try {
        const respuesta = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

        let datos = await respuesta.json()
        console.log(datos)

        if (!respuesta.ok) {
            console.log("Error")
            
        } else {
            console.log("Producto borrado correctamente")
           
        }

    } catch (err) {
        alert("Ha ocurrido un error al borrar el producto")
    }

}