document.querySelectorAll("button[data-product-id]").forEach(button => {
    button.addEventListener('click', async event => {
        const cartId = document.getElementById('cartId').value;
        const productId = event.target.getAttribute('data-product-id');
        borrar(cartId, productId);
    });
});




async function borrar(cid, pid) {

    const url = `http://localhost:8080/api/carts/${cid}/products/${pid}`

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