const API_URL = "http://localhost:3000/products";

// Fetch and display products
const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        const productList = document.getElementById("product-list");
        productList.innerHTML = `
            <div style="text-align: center; margin-left: 550px; ">
            <h1 style >Product List</h1>
            <table style="border-collapse: collapse; width: 80%; margin: 0 auto;">
                <thead>
                <tr>
                    <th style="border: 1px solid black; padding: 12px; background-color: gray; color: white;">ID</th>
                    <th style="border: 1px solid black; padding: 12px; background-color: gray; color: white;">Name</th>
                    <th style="border: 1px solid black; padding: 12px; background-color: gray; color: white;">Description</th>
                    <th style="border: 1px solid black; padding: 12px; background-color: gray; color: white;">Price</th>
                </tr>
                </thead>
                <tbody>
                ${products
                    .map(
                    (product) => `
                    <tr>
                        <td style="border: 1px solid black; padding: 12px; text-align: center;">${product.id}</td>
                        <td style="border: 1px solid black; padding: 12px; text-align: center;">${product.name}</td>
                        <td style="border: 1px solid black; padding: 12px; text-align: center;">${product.description}</td>
                        <td style="border: 1px solid black; padding: 12px; text-align: center;">$${product.price}</td>
                    </tr>
                    `
                    )
                    .join("")}
                </tbody>
            </table>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Handle form submission
const resetForm = (formId) => {
    document.getElementById(formId).reset();
};

// Add Product
document.getElementById("product-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, price }),
        });

        if (response.ok) {
            resetForm("product-form");
            fetchProducts();
        } else {
            alert("Failed to add product.");
        }
    } catch (error) {
        console.error("Error adding product:", error);
        alert("An error occurred while adding the product.");
    }
    location.reload();
});

// Update Product
document.getElementById("product-update-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = document.getElementById("update_product_id").value;
    const name = document.getElementById("update_product_name").value;
    const description = document.getElementById("update_product_description").value;
    const price = document.getElementById("update_product_price").value;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, price }),
        });

        if (response.ok) {
            resetForm("product-update-form");
            fetchProducts();
        } else {
            alert("Failed to update product. Please check the ID.");
        }
    } catch (error) {
        console.error("Error updating product:", error);
        alert("An error occurred while updating the product.");
    }
    location.reload();
});

// Delete Product
document.getElementById("product-delete-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = document.getElementById("product_id").value;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            resetForm("product-delete-form");
            fetchProducts();
        } else {
            alert("Failed to delete product. Please check the ID.");
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product.");
    }
    location.reload();
});

// Load products on page load
fetchProducts();