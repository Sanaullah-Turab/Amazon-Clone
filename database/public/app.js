const API_URL = "http://localhost:3000/products";

// Fetch and display products
const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        const productList = document.getElementById("product-list");

        if (products.length === 0) {
            productList.innerHTML = "<p>No products found. Add some to get started!</p>";
            return;
        }

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
                    ${products.map(product => `
                        <tr>
                            <td style="border: 1px solid black; padding: 8px;">${product.id}</td>
                            <td style="border: 1px solid black; padding: 8px;">${product.name}</td>
                            <td style="border: 1px solid black; padding: 8px;">${product.description}</td>
                            <td style="border: 1px solid black; padding: 8px;">$${product.price}</td>
                        </tr>`).join("")}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Handle form submissions
const handleAddProduct = async event => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    if (!name || !description || price <= 0) {
        alert("Please fill all fields correctly.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, price }),
        });

        if (response.ok) {
            document.getElementById("product-form").reset();
            fetchProducts();
        }
    } catch (error) {
        console.error("Error adding product:", error);
    }
};

const handleUpdateProduct = async event => {
    event.preventDefault();
    const id = document.getElementById("update_product_id").value;
    const name = document.getElementById("update_product_name").value;
    const description = document.getElementById("update_product_description").value;
    const price = document.getElementById("update_product_price").value;

    if (!id || !name || !description || price <= 0) {
        alert("Please fill all fields correctly.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, price }),
        });

        if (response.ok) {
            // alert("Product updated successfully!");
            fetchProducts();
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }
};

const handleDeleteProduct = async event => {
    event.preventDefault();
    const id = document.getElementById("product_id").value;

    if (!id) {
        alert("Please provide a valid product ID.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (response.ok) {
            // alert("Product deleted successfully!");
            fetchProducts();
        }
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};

// Event listeners
document.getElementById("product-form").addEventListener("submit", handleAddProduct);
document.getElementById("product-update-form").addEventListener("submit", handleUpdateProduct);
document.getElementById("product-delete-form").addEventListener("submit", handleDeleteProduct);

// Load products on page load
fetchProducts();
