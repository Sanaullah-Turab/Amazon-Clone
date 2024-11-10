import { cart } from "../../data/cart.js";
import { GetProductById } from "../../data/products.js";
import {
  deliveryOptions,
  FormatDate,
  FormatPrice,
  GetDeliveryDate,
} from "../../data/deliveryOptions.js";
import { RenderPaymentSummary } from "./paymentSummary.js";

export function RenderProducts() {
  let checkoutHtml = "";
  cart.cartItems.forEach((cartItem) => {
    const productItem = GetProductById(cartItem.id);
    if (productItem) {
      checkoutHtml += `
      <div class="cart-item-container js-cart-item-container-${cartItem.id}">
        <div class="delivery-date">Delivery date: ${GetDeliveryDate(
          cartItem.deliveryOptionId
        )}</div>

        <div class="cart-item-details-grid">
          <img
            class="product-image"
            src="${productItem.image}"
          />

          <div class="cart-item-details">
            <div class="product-name">
              ${productItem.name}
            </div>
            <div class="product-price">$${productItem.priceCents / 100}</div>
            <div class="product-quantity">
              <span> Quantity: <span class="quantity-label">${
                cartItem.quantity
              }</span> </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${cartItem.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${RenderDeliveryOptions(cartItem)}
          </div>
        </div>
      </div>
    `;
    }
  });
  document.querySelector(".order-summary").innerHTML = checkoutHtml;

  document.querySelectorAll(".js-delete-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const productId = deleteLink.getAttribute("data-product-id");
      cart.DeleteFromCart(productId);
      RenderProducts();
      RenderPaymentSummary();
    });
  });

  cart.cartItems.forEach((cartItem) => {
    let deliveryOptionsElems = document.getElementsByName(
      `delivery-option-${cartItem.id}`
    );

    deliveryOptionsElems.forEach((option) => {
      option.addEventListener("change", () => {
        cartItem.deliveryOptionId = parseInt(option.value);
        RenderProducts();
        RenderPaymentSummary();
      });
    });
  });
}

function RenderDeliveryOptions(cartItem) {
  let deliveryOptionsHtml = "";
  deliveryOptions.forEach((option, index) => {
    deliveryOptionsHtml += `
      <div class="delivery-option">
        <input
          type="radio"
          class="delivery-option-input"
          name="delivery-option-${cartItem.id}"
          value="${option.id}"
          ${cartItem.deliveryOptionId === option.id ? "checked" : ""}
        />
        <div>
          <div class="delivery-option-date">${FormatDate(option.date)}</div>
          <div class="delivery-option-price">${FormatPrice(
            option.priceCents
          )}</div>
        </div>
      </div>
    `;
  });
  return deliveryOptionsHtml;
}
