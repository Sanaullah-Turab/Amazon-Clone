import { cart } from "../../data/cart.js";
import { GetProductById, CentsToDollars } from "../../data/products.js";
import { GetDeliveryPrice } from "../../data/deliveryOptions.js";

export function RenderPaymentSummary() {
  let itemTotal = 0;
  let deliveryTotal = 0;
  let itemAndDeliveryTotal = 0;
  let taxTotal = 0;
  let orderTotal = 0;

  // Calculate item total
  cart.cartItems.forEach((cartItem) => {
    const productItem = GetProductById(cartItem.id);
    if (productItem) {
      itemTotal += productItem.priceCents * cartItem.quantity;
    }
  });

  // Calculate delivery total
  cart.cartItems.forEach((cartItem) => {
    deliveryTotal += GetDeliveryPrice(cartItem.deliveryOptionId);
  });

  // Calculate item and delivery total
  itemAndDeliveryTotal = itemTotal + deliveryTotal;

  // Calculate tax total
  taxTotal = itemAndDeliveryTotal * 0.1;

  // Calculate order total
  orderTotal = itemAndDeliveryTotal + taxTotal;

  let paymentSummaryHtml = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
    <div>Items (3):</div>
    <div class="payment-summary-money js-payment-summary-item-total">${CentsToDollars(
      itemTotal
    )}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money js-payment-summary-delivery-total">${CentsToDollars(
      deliveryTotal
    )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">${CentsToDollars(
      itemAndDeliveryTotal
    )}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money js-payment-summary-tax-total">${CentsToDollars(
      taxTotal
    )}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money js-payment-summary-order-total">${CentsToDollars(
      orderTotal
    )}</div>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
    Place your order
    </button>
  `;
  document.querySelector(".payment-summary-js").innerHTML = paymentSummaryHtml;
  document
    .querySelector(".js-place-order-button")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("http://localhost:3000/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      window.location.href = "orders.html";
    });
}
