class VendingMachine {
  constructor(inventory) {
    this.data = require(inventory);
    this.stock = this.data.stock;
    this.change = this.data.change;
  }

  calChange(change, price, cost) {
    let amountOwed = cost - price;
    if (amountOwed === 0) return 0;
    const VALUES = [
      { name: " QUARTER", val: 0.25 },
      { name: "LOONIE", val: 1 },
      { name: "TOONIE", val: 2 }
    ];
  }

  buyItem(item, cost) {
    if (this.stock[item].inventory === 0) {
      return "out of stock";
    } else if (!cost) {
      return {
        name: this.stock[item].name,
        change: this.change[item].price
      };
    } else if (this.stock[item].price - cost > 0) {
      const excess = this.stock[item].price - cost;
      return {
        name: this.stock[item].name,
        change: excess
      };
    }
    this.stock[item].inventory--;
    return {
      name: this.stock[item].name,
      change: this.calChange(this.change.current, this.stock[item].price, cost)
    };
  }
}

module.exports = VendingMachine;
