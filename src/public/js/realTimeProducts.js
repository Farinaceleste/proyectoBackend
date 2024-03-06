
const socket = io();


socket.on('ProductoAgregado', (product) => {
    const productList = document.getElementById('productList');
    const item = document.createElement('li');
    item.textContent = `Title: ${product.title}, ID: ${product.id}`;
    productList.appendChild(item);
});


socket.on("ProductoEliminado", (productId) => {
    const productList = document.getElementById('productList');
    const items = productList.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
        const itemId = item.textContent.split('ID: ')[1];
        if (itemId === productId) {
            productList.removeChild(item);
        }
    });
});


document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const productName = document.getElementById('title').value;
    const productPrice = document.getElementById('price').value;
    const productCode = document.getElementById('code').value;
    const productThumbnail = document.getElementById('thumbnail').value;
    const productDescription = document.getElementById('description').value;
    socket.emit('addProduct', { productName, productPrice, productCode, productThumbnail, productDescription });
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('code').value = '';
    document.getElementById('thumbnail').value = '';
    document.getElementById('description').value = '';
});


document.getElementById('deleteForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const productId = document.getElementById('prodDelId').value;
    socket.emit('deleteProduct', productId);
    document.getElementById('prodDelId').value = '';
});

