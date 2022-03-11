const { Shop, Item } = require("../src/gilded_rose");
const { singleItemTestTable, multipleItemsTable } = require("./helper");

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

describe("Multiple items tests", function () {
  multipleItemsTable.forEach((test) => {
    it(test.description, function () {
      const itemsArray = test.items.map(
        (item) => new Item(item.name, item.sellIn, item.quality)
      );
      const gildedRose = new Shop(itemsArray);
      const items = gildedRose.updateQuality();
      expect(items.length).toBe(itemsArray.length);
      items.forEach((item, index) => {
        expect(item.name).toBe(test.items[index].name);
        expect(item.sellIn).toBe(test.items[index].expectedSellIn);
        expect(item.quality).toBe(test.items[index].expectedQuality);
      });
    });
  });
});
