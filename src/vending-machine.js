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
      { name: "LOONIE", val: 1.0 },
      { name: "TOONIE", val: 2.0 }
    ];

    const vendingChange = change.reduce((acc, currency) => {
      acc[currency[0]] = currency[1];
      return acc;
    }, {});

    const coins = VALUES((acc, currency) => {
      let amount = 0;

      while (currency.val <= amountOwed && amountOwed !== 0) {
        amountOwed -= currency.val;
        vendingChange[currency.name] -= currency.val;
        amount++;
      }

      if (amount > 0) {
        acc.push([currency.name, amount]);
      }

      return acc;
    }, []);
  }

  buyItem(item, cost) {
    if (this.stock[item].inventory === 0) {
      return "out of stock";
    } else if (!cost) {
      return {
        name: this.stock[item].name,
        change: this.stock[item].price
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
