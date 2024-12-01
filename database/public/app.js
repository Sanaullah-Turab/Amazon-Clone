const API_URL = "http://localhost:3000/";

// Fetch and display products
const fetchProducts = async () => {
    const response = await fetch(API_URL);
    const products = await response.json();
    const productList = document.getElementById("product-list");
    productList.innerHTML = products
        .map(
            product => `
            <div>
                <strong>${product.name}</strong>
                <p>${product.description}</p>
                <span>$${product.price}</span>
            </div>
        `
        )
        .join("");
};
const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');
const updateForm = document.getElementById('product-update-form');
const deleteForm = document.getElementById('product-delete-form');

// Function to fetch and display products
async function fetchProducts() {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();

    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            ${product.image_path ? `<img src="http://localhost:3000/${product.image_path}" alt="${product.name}" width="100" />` : ''}
            <hr>
        `;
        productList.appendChild(productDiv);
    });
}

// Add Product
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price, image_path: null })
    });

    productForm.reset();
    fetchProducts();
});

// Update Product
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('update-id').value;
    const name = document.getElementById('update-name').value;
    const description = document.getElementById('update-description').value;
    const price = document.getElementById('update-price').value;

    await fetch('http://localhost:3000/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, description, price, image_path: null })
    });

    updateForm.reset();
    fetchProducts();
});

// Delete Product
deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('delete-id').value;

    await fetch('http://localhost:3000/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });

    deleteForm.reset();
    fetchProducts();
});

// Initial Fetch
fetchProducts();

// Handle form submission
document.getElementById("product-form").addEventListener("submit", async event => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price }),
    });

    if (response.ok) {
        document.getElementById("product-form").reset();
        fetchProducts();
    }
});

// Load products on page load
fetchProducts();
// Event listener for updating a product
document.getElementById("product-list").addEventListener("click", async event => {
    if (event.target.classList.contains("update-product")) {
        const productId = event.target.dataset.id;
        const name = prompt("Enter new name:");
        const description = prompt("Enter new description:");
        const price = prompt("Enter new price:");

        const response = await fetch(`${API_URL}${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, price }),
        });

        if (response.ok) {
            fetchProducts();
        }
    }
});

// Event listener for deleting a product
document.getElementById("product-list").addEventListener("click", async event => {
    if (event.target.classList.contains("delete-product")) {
        const productId = event.target.dataset.id;

        const response = await fetch(`${API_URL}${productId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            fetchProducts();
        }
    }
});