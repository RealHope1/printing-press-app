// search.js - Search Functionality

function searchProducts() {
    const input = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const name = product.innerText.toLowerCase();
        product.style.display = name.includes(input) ? 'block' : 'none';
    });
}