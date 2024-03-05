
const socket=io();

socket.on("new_product", newProduct => {
  console.log(newProduct)

  let formulario = document.getElementById("formulario");
  formulario.innerHTML = `
    <li>${newProduct.title}</li>
    <li>${newProduct.thumbnail}</li>
    <li>${newProduct.description}</li>
    <li><strong>Precio: ${newProduct.price}</strong></li>
    <li>Stock: ${newProduct.stock}</li>
    <li>Código: ${newProduct.code}</li>
    <li>Id: ${newProduct.id}</li>
    <button id="borrar" onclick="deleteProducts('${newProduct.id}')">Borrar producto</button>
  `;
});

const deleteProducts = (id) => {
  if (confirm("Está seguro de borrar el producto?")) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });

    document.getElementById(id).remove();

    socket.emit("delete_product", { id });
  }
};

socket.on("delete_product", (deleteProduct) => {
  if (deleteProduct.id === id) {
    const products = productmanager.getProducts();
    const index = products.findIndex((p) => p.id === deleteProduct.id);

    if (index !== -1) {
      products.splice(index, 1);
      productmanager.saveProducts(products);
    }
  }
});