const vendingMachine = require("../src/vending-machine");
const VendingMachine = new vendingMachine("./inventory.json");

describe("Vending Machine", () => {
  describe("purchase an item that is out of stock", () => {
    it("should return out of stock", () => {
      const result = VendingMachine.buyItem("b1", 1.25);
      expect(result).toEqual("out of stock");
    });
  });

  describe("purchase an item with no change", () => {
    it("should return the name of the product and its cost", () => {
      const result = VendingMachine.buyItem("a1");
      expect(result).toEqual({ name: "Chips", change: 2.25 });
    });
  });

  describe("purchase item with not enough change", () => {
    it("should return the product name and the remaining change needed", () => {
      const result = VendingMachine.buyItem("c3", 0.75);
      expect(result).toEqual({ name: "Instant Noodles", change: 0.25 });
    });
  });

  describe("purchase an item with exact change", () => {
    it("should return the product name and no change", () => {
      const result = VendingMachine.buyItem("c2", 2.5);
      expect(result).toEqual({ name: "Energy Drink", change: 0 });
    });
  });

  describe("purchase an item with more change than needed", () => {
    it("should return the product name and change for item in coins", () => {
      const result = VendingMachine.buyItem("c4", 4.0);
      expect(result).toEqual({
        name: "Potato",
        change: [["TOONIES", 1], ["LOONIES", 1], ["QUARTERS", 2]]
      });
    });
  });

  describe("purchase item that does not exist", () => {
    it("should return this item does not exist", () => {
      const result = VendingMachine.buyItem("r2");
      expect(result).toEqual("this item does not exist");
    });
  });

  describe("checking vending machine coins", () => {
    it("should return a list that shows the current quantity of coins", () => {
      const result = VendingMachine.checkCurrentChange();
      expect(result).toEqual([
        ["QUARTERS", 33],
        ["LOONIES", 39.0],
        ["TOONIES", 48.0]
      ]);
    });
  });

  describe("resuply coins in vending machine", () => {
    it("should return a list of resupplied coins ", () => {
      const result = VendingMachine.resupplyChange();
      expect(result).toEqual([
        ["QUARTERS", 50.0],
        ["LOONIES", 60.0],
        ["TOONIES", 100.0]
      ]);
    });
  });

  describe("check current stock of items in vending machine", () => {
    it("should return a list of items and thier inventory", () => {
      const result = VendingMachine.checkCurrentStock();
      expect(result).toEqual([
        "Chips: 10",
        "Candy: 10",
        "Pop: 10",
        "Water: 0",
        "Fruit: 10",
        "Coffee: 10",
        "Cookie: 10",
        "Energy Drink: 9",
        "Instant Noodles: 10",
        "Potato: 9"
      ]);
    });
  });

  describe("restock items in vending machine", () => {
    it("should return a list of items at their new stock", () => {
      const result = VendingMachine.resupplyStock();
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
