const socket = io();

document.addEventListener("DOMContentLoaded", function () {
    socket.on('newProduct', datos => {
        console.log(datos)

        let ulProductos = document.getElementById("ulproducts")
        let li = document.createElement("li");
        li.innerHTML = `${datos.title} - ${datos.price}`;
        ulProductos.appendChild(li);
    })
})

const borrar = async (idProd) => {
    const idProdNum = parseInt(idProd, 10);
  
    try {
      const respuesta = await fetch(`http://localhost:8080/api/products/${idProdNum}`, {
        method: "DELETE",
      });
  
      if (!respuesta.ok) {
        throw new Error("Error al eliminar el producto");
      }
  
      console.log("Producto eliminado correctamente");
    } catch (err) {
      console.error(err);
      alert("Ha ocurrido un error al eliminar el producto");
    }
  }
  
    socket.on("deletedProduct", (deletedProd) => {
        const li = document.getElementById(`producto-${deletedProd.id}`);
        if (li) {
          li.remove();
        }
  
    
  });


const agregar = async (event) => {
    event.preventDefault();
  
    try {
      const producto = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        description: document.getElementById("description").value,
      };
  
      console.log({ producto });
  
      const respuesta = await fetch(`http://localhost:8080/api/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
  
      console.log({ respuesta });
  
      if (!respuesta.ok) {
        throw new Error("Error al agregar el producto");
      }
  
      console.log("Producto agregado correctamente");
    } catch (err) {
      console.error(err);
      alert("Ha ocurrido un error al agregar el producto");
    }
}