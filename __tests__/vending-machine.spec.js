const vendingMachine = require("../src/vending-machine");
let item = new vendingMachine("./inventory.json");

describe("Vending Machine", () => {
  describe("purchase item that is out of stock", () => {
    test("return out of stock", () => {
      const result = item.buyItem("b1", 1.25);
      expect(result).toEqual("out of stock");
    });
  });

  describe("purchase an item with no change", () => {
    test("returns name of product and cost", () => {
      const result = item.buyItem("a1");
      expect(result).toEqual({ name: "Chips", change: 2.25 });
    });
  });

  describe("purchase item with not enough change", () => {
    test("returns the product name and change needed", () => {
      const result = item.buyItem("a1", 2.0);
      expect(result).toEqual({ name: "Chips", change: 0.25 });
    });
  });

  describe("purchase an item with exact change", () => {
    test("returns product name and no change", () => {
      const result = item.buyItem("a2", 1.0);
      expect(result).toEqual({ name: "Candy", change: 0 });
    });
  });
});
