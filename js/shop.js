// shop.js - Shop Page Logic

function filterProducts() {
    const category = document.getElementById('category').value;
    const size = document.getElementById('size').value;
    const price = document.getElementById('price').value;
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const prodCategory = product.dataset.category;
        const prodPrice = parseInt(product.dataset.price);

        let show = true;
        if (category && prodCategory !== category) show = false;
        if (size && !product.textContent.includes(size)) show = false;
        if (prodPrice > price) show = false;

        product.style.display = show ? 'block' : 'none';
    });
}

document.getElementById('category').addEventListener('change', filterProducts);
document.getElementById('size').addEventListener('change', filterProducts);
document.getElementById('price').addEventListener('input', filterProducts);