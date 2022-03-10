const { Shop, Item } = require("../src/gilded_rose");
const { singleItemTestTable } = require("./helper");

describe("Single item tests", function () {
  singleItemTestTable.forEach((test) => {
    it(test.description, function () {
      const gildedRose = new Shop([
        new Item(test.name, test.sellIn, test.quality),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe(test.name);
      expect(items[0].sellIn).toBe(test.expectedSellIn);
      expect(items[0].quality).toBe(test.expectedQuality);
    });
  });
});
