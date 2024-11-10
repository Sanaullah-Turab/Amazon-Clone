/**
 * Represents a shopping cart.
 */
class Cart {
  cartItems;

  /**
   * Constructs a new Cart object.
   */
  constructor() {
    this.cartItems = [];
    this.loadCartFromStorage();
  }

  /**
   * Loads the cart items from local storage.
   */
  loadCartFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem("cart"));
    if (!this.cartItems) {
      this.cartItems = [
        {
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: 1,
        },
        {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: 2,
        },
      ];
      this.SaveToStorage();
    }
  }

  /**
   * Adds an item to the cart.
   * @param {string} itemId - The ID of the item to add.
   * @param {number} [quantity=1] - The quantity of the item to add.
   * @param {number} [deliveryOptionId=1] - The delivery option ID for the item.
   */
  addToCart(itemId, quantity = 1, deliveryOptionId = 1) {
    let matchingItem = null;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.id === itemId) {
        cartItem.quantity += quantity;
        matchingItem = cartItem;
      }
    });
    if (!matchingItem) {
      this.cartItems.push({
        id: itemId,
        quantity: quantity,
        deliveryOptionId,
      });
    }
    document.querySelector(".js-cart-quantity").textContent =
      this.cartItems.length;
    this.SaveToStorage();
  }

  /**
   * Deletes an item from the cart.
   * @param {string} productId - The ID of the product to delete.
   */
  DeleteFromCart(productId) {
    console.log(productId);
    let newCartItems = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.id !== productId) {
        newCartItems.push(cartItem);
      }
    });
    this.cartItems = newCartItems;
    this.SaveToStorage();
  }

  /**
   * Saves the cart items to local storage.
   */
  SaveToStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
  }
}

export const cart = new Cart();
