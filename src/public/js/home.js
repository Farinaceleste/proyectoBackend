document.getElementById("addForm").addEventListener('submit', async (event) => {
    event.preventDefault();
    const prodId = event.target.querySelector('button').getAttibute('idProdAdd')

    try {

        const respuesta = await fetch(`http://localhost:8080/api/products/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prodId }),
        });

        console.log({ respuesta })

        if(!respuesta.ok) {
            console.error("Error al agregar el producto")
        }
 
    } catch (error) {
        
        alert("Ha ocurrido un error al agregar el producto", error);
    }

})