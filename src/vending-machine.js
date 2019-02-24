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
      { name: " QUARTER", val: 0.25 },
      { name: "LOONIE", val: 1.0 },
      { name: "TOONIE", val: 2.0 }
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

  buyItem(item, cost) {
    if (this.stock[item].inventory === 0) {
      return "out of stock";
    } else if (!cost) {
      return {
        name: this.stock[item].name,
        change: this.stock[item].price
      };
    } else if (typeof cost !== "number" || cost > 10 || cost < 0.05) {
      return cost;
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

  checkCurrentChange() {
    return this.change.current;
  }

  resuplyChange() {
    this.change.max.forEach((change, index) => {
      this.change.current[index] = change;
    });
    return this.change.current;
  }

  checkCurrentStock() {
    let inv = [];
    const indexArr = Object.keys(this.stock);
    indexArr.forEach(stock => {
      inv.push(`${this.stock[stock].name}: ${this.stock[stock].inventory}`);
    });
    return inv;
  }

  resuplyStock() {
    let inv = [];
    const indexArr = Object.keys(this.stock);
    indexArr.forEach(stock => {
      this.stock[stock].inventory = this.stock[stock].maxInv;
      inv.push(`${this.stock[stock].name}: ${this.stock[stock].inventory}`);
    });
    return inv;
  }
}

module.exports = VendingMachine;
