class VendingMachine {
  constructor(allItem) {
    this.data = require(allItem);
    this.stock = this.data.stock;
    this.change = this.data.change;
  }

  calChange(change, price, cost) {
    let amountOwed = cost - price;
    if (amountOwed === 0) return 0;
    const VALUES = [
      { name: "TOONIES", val: 2.0 },
      { name: "LOONIES", val: 1.0 },
      { name: "QUARTERS", val: 0.25 }
    ];

    const vendingChange = change.reduce((acc, currency) => {
      acc[currency[0]] = currency[1];
      return acc;
    }, {});

    const coins = VALUES.reduce((acc, currency) => {
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

    change.forEach(value => {
      value[1] = vendingChange[value[0]];
    });
    return coins;
  }

  checkCurrentChange() {
    return this.change.current;
  }

  resupplyChange() {
    this.change.max.forEach((change, index) => {
      this.change.current[index] = change;
    });
    return this.change.current;
  }

  checkCurrentStock() {
    const inv = [];
    const allItems = Object.keys(this.stock);
    allItems.forEach(stock => {
      inv.push(`${this.stock[stock].name}: ${this.stock[stock].inventory}`);
    });
    // console.log(inv);
    return inv;
  }

  resupplyStock() {
    const inv = [];
    const allItems = Object.keys(this.stock);
    allItems.forEach(item => {
      this.stock[item].inventory = this.stock[item].maxInv;
      inv.push(`${this.stock[item].name}: ${this.stock[item].inventory}`);
    });
    return inv;
  }

  buyItem(item, cost) {
    if (!this.stock[item]) {
      return "this item does not exist";
    } else if (this.stock[item].inventory === 0) {
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
