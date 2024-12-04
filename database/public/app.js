const API_URL = "http://localhost:3000/products";

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
