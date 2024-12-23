const API_URL = "http://localhost:3000/products";

// Fetch and display products
const fetchProducts = async () => {
    const response = await fetch(API_URL);
    const products = await response.json();
    const productList = document.getElementById("product-list");
    productList.innerHTML = `
        <table style="border-collapse: collapse; width: 100%;">
            <thead>
                <tr>
                    <th style="border: 1px solid black; padding: 8px; background-color: gray; color: white;">ID</th>
                    <th style="border: 1px solid black; padding: 8px; background-color: gray; color: white;">Name</th>
                    <th style="border: 1px solid black; padding: 8px; background-color: gray; color: white;">Description</th>
                    <th style="border: 1px solid black; padding: 8px; background-color: gray; color: white;">Price</th>
                </tr>
            </thead>
            <tbody>
                ${products
                    .map(
                        (product) => `
                        <tr>
                            <td style="border: 1px solid black; padding: 8px;">${product.id}</td>
                            <td style="border: 1px solid black; padding: 8px;">${product.name}</td>
                            <td style="border: 1px solid black; padding: 8px;">${product.description}</td>
                            <td style="border: 1px solid black; padding: 8px;">$${product.price}</td>
                        </tr>
                    `
                    )
                    .join("")}
            </tbody>
        </table>
    `;
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
