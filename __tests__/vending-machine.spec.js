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

  describe("purchase an item with more change than needed", () => {
    test("returns product name and change for item", () => {
      const result = item.buyItem("c4", 1.0);
      expect(result).toEqual({
        name: "Potato",
        change: ["QUARTERS", 6]
      });
    });
  });

  describe("purchase item with incorrect currency", () => {
    test("returns the currency given", () => {
      const result = item.buyItem(" a1", "pens");
      expect(result).toEqual("pens");
    });
  });

  describe("checking vending machine coins", () => {
    test("returns list of current coins", () => {
      const result = item.checkCurrentChange();
      expect(result).toEqual([
        ["QUARTERS", 33.5],
        ["LOONIES", 40.0],
        ["TOONIES", 50.0]
      ]);
    });
  });

  describe("resuply coins in vending machine", () => {
    test("returns list of resuplied coins", () => {
      const result = item.resuplyChange();
      expect(result).toEqual([
        ["QUARTERS", 50.0],
        ["LOONIES", 60.0],
        ["TOONIES", 100.0]
      ]);
    });
  });

  describe("check current stock of items in vending machine", () => {
    test("returns list of items and thier inventory", () => {
      const result = item.checkCurrentStock();
      expect(result).toEqual([
        "Chips: 10",
        "Candy: 9",
        "Pop: 10",
        "Water: 0",
        "Fruit: 10",
        "Coffee: 10",
        "Cookie: 10",
        "Energy Drink: 10",
        "Instant Noodles: 10",
        "Potato: 9"
      ]);
    });
  });

  describe("restock items in vending machine", () => {
    test("return list of new stock of items", () => {
      const result = item.resuplyStock();
      expect(result).toEqual([
        "Chips: 10",
        "Candy: 15",
        "Pop: 10",
        "Water: 10",
        "Fruit: 10",
        "Coffee: 20",
        "Cookie: 30",
        "Energy Drink: 10",
        "Instant Noodles: 10",
        "Potato: 14"
      ]);
    });
  });
});
