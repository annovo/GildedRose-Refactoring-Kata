const { Item } = require("../src/gilded_rose");

const singleItemTestTable = [
  {
    name: "foo",
    description: "standart item updated correctly",
    sellIn: 2,
    quality: 3,
    expectedSellIn: 1,
    expectedQuality: 2,
  },
  {
    name: "foo",
    description: "standart item quality is not negative",
    sellIn: 1,
    quality: 0,
    expectedSellIn: 0,
    expectedQuality: 0,
  },
  {
    name: "Aged Brie",
    description: "Aged Brie updates correctly",
    sellIn: 2,
    quality: 4,
    expectedSellIn: 1,
    expectedQuality: 5,
  },
  {
    name: "Aged Brie",
    description: "quality less or equal than 50",
    sellIn: 2,
    quality: 50,
    expectedSellIn: 1,
    expectedQuality: 50,
  },
  {
    name: "Sulfuras, Hand of Ragnaros",
    description: "Sulfuras quality and sell date not updated",
    sellIn: -2,
    quality: 80,
    expectedSellIn: 2,
    expectedQuality: 80,
  },
  {
    name: "Backstage passes to a TAFKAL80ETC concert",
    description: "quality updated for more than 10 days prior concert",
    sellIn: 11,
    quality: 2,
    expectedSellIn: 10,
    expectedQuality: 3,
  },
  {
    name: "Backstage passes to a TAFKAL80ETC concert",
    description: "quality updated for less than 10 days prior concert",
    sellIn: 9,
    quality: 3,
    expectedSellIn: 8,
    expectedQuality: 5,
  },
  {
    name: "Backstage passes to a TAFKAL80ETC concert",
    description: "quality updated for less than 5 days prior concert",
    sellIn: 5,
    quality: 4,
    expectedSellIn: 4,
    expectedQuality: 7,
  },
  {
    name: "Backstage passes to a TAFKAL80ETC concert",
    description: "quality not bigger that 50",
    sellIn: 5,
    quality: 49,
    expectedSellIn: 4,
    expectedQuality: 50,
  },
  {
    name: "Backstage passes to a TAFKAL80ETC concert",
    description: "after concert quality 0",
    sellIn: 0,
    quality: 49,
    expectedSellIn: -1,
    expectedQuality: 0,
  },
];

module.exports = {
  singleItemTestTable,
};
