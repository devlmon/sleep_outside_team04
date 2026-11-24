import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) ?? [];
    if (!Array.isArray(this.list)) {
      throw new TypeError("The saved cart must contain a list of items.");
    }
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    const itemTotalInCents = this.list.reduce((total, item) => {
      const price = Number(item.FinalPrice);
      if (!Number.isFinite(price) || price < 0) {
        throw new TypeError("A cart item has an invalid price.");
      }
      return total + Math.round(price * 100);
    }, 0);

    this.itemTotal = itemTotalInCents / 100;
    this.displayItemSubTotal();
  }

  displayItemSubTotal() {
    const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
    const itemCount = document.querySelector(
      `${this.outputSelector} #item-count`,
    );

    subtotal.textContent = this.formatCurrency(this.itemTotal);
    itemCount.textContent = `(${this.list.length} ${
      this.list.length === 1 ? "item" : "items"
    })`;
  }

  calculateOrderTotal() {
    const itemTotalInCents = Math.round(this.itemTotal * 100);
    this.tax = Math.round(itemTotalInCents * 0.06) / 100;
    this.shipping =
      this.list.length === 0 ? 0 : 10 + (this.list.length - 1) * 2;
    this.orderTotal =
      (itemTotalInCents + Math.round(this.tax * 100) + this.shipping * 100) /
      100;

    this.displayOrderTotals();
  }

  clearOrderTotals() {
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
    this.displayOrderTotals(false);
  }

  displayOrderTotals(showTotals = true) {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const total = document.querySelector(`${this.outputSelector} #total`);
    const displayValue = (amount) =>
      showTotals ? this.formatCurrency(amount) : "—";

    tax.textContent = displayValue(this.tax);
    shipping.textContent = displayValue(this.shipping);
    total.textContent = displayValue(this.orderTotal);
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }
}
