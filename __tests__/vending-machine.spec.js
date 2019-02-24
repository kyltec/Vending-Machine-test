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
});
