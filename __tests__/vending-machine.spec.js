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
      const result = VendingMachine.buyItem("a1", 2.0);
      expect(result).toEqual({ name: "Chips", change: 0.25 });
    });
  });

  describe("purchase an item with exact change", () => {
    it("returns product name and no change", () => {
      const result = VendingMachine.buyItem("a2", 1.0);
      expect(result).toEqual({ name: "Candy", change: 0 });
    });
  });

  describe("purchase an item with more change than needed", () => {
    it("returns product name and change for item in coins", () => {
      const result = VendingMachine.buyItem("c4", 4.0);
      expect(result).toEqual({
        name: "Potato",
        change: [["TOONIES", 1], ["LOONIES", 1], ["QUARTERS", 2]]
      });
    });
  });

  describe("purchase item that does not exist", () => {
    it("returns item does not exist", () => {
      const result = VendingMachine.buyItem("r2");
      expect(result).toEqual("this item does not exist");
    });
  });

  describe("checking vending machine coins", () => {
    it("returns list of current coins", () => {
      const result = VendingMachine.checkCurrentChange();
      expect(result).toEqual([
        ["QUARTERS", 33],
        ["LOONIES", 39.0],
        ["TOONIES", 48.0]
      ]);
    });
  });

  describe("resuply coins in vending machine", () => {
    it("returns list of resuplied coins", () => {
      const result = VendingMachine.resupplyChange();
      expect(result).toEqual([
        ["QUARTERS", 50.0],
        ["LOONIES", 60.0],
        ["TOONIES", 100.0]
      ]);
    });
  });

  describe("check current stock of items in vending machine", () => {
    it("returns list of items and thier inventory", () => {
      const result = VendingMachine.checkCurrentStock();
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
    it("return list of new stock of items", () => {
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
