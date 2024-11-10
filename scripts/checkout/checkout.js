import { RenderProducts } from "./checkoutProducts.js";
import { RenderPaymentSummary } from "./paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";
import { cart } from "../../data/cart.js";
// import "../../backend/backendPractice.js";

/* loadProducts(() => {
  RenderProducts();
  RenderPaymentSummary();
}); */

async function renderPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.error(error);
  }

  RenderProducts();
  RenderPaymentSummary();
}

renderPage();

/* new promise((resolve) => {
  loadproducts(resolve);
}).then((message) => {
  renderproducts();
  renderpaymentsummary();
}); */
