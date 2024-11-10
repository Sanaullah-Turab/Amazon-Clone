import { RenderPaymentSummary } from "../../../scripts/checkout/paymentSummary.js";
import { cart } from "../../../data/cart.js";
import { loadProducts } from "../../../data/products.js";

describe("RenderPaymentSummary", () => {
  beforeAll((done) => {
    loadProducts(done);
  });
  afterAll(() => {
    document.querySelector(".test-container").innerHTML = "";
  });

  it("renders the payment summary", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          quantity: 8,
          deliveryOptionId: 2,
        },
      ]);
    });
    cart.loadCartFromStorage();

    document.querySelector(".test-container").innerHTML = `
      <div class="payment-summary-js"></div> `;

    RenderPaymentSummary();
    expect(
      document.querySelector(".js-payment-summary-item-total").innerHTML
    ).toBe("$63.92");
    expect(
      document.querySelector(".js-payment-summary-delivery-total").innerHTML
    ).toBe("$4.99");
    expect(
      document.querySelector(".js-payment-summary-tax-total").innerHTML
    ).toBe("$6.89");
    expect(
      document.querySelector(".js-payment-summary-order-total").innerHTML
    ).toBe("$75.80");
  });
});
