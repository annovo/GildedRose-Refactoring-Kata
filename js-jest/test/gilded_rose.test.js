const { Shop, Item } = require("../src/gilded_rose");
const { singleItemTestTable } = require("./helper");

describe("Gilded Rose", function () {
  for (test of singleItemTestTable) {
    it(test.description, function () {
      const gildedRose = new Shop([
        new Item(test.name, test.sellIn, test.quantity),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe(test.name);
      expect(items[0].sellIn).toBe(test.expectedSellIn);
      expect(items[0].quantity).toBe(test.expectedQuantity);
    });
  }
});
