class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  addQuality(item, quality) {
    item.quality += quality;
    if (item.quality < 0) item.quality = 0;
    else if (item.quality > 50) item.quality = 50;
  }

  updateQuality() {
    for (let item of this.items) {
      item.sellIn--;
      if (item.quality < 0) item.quality = 0;

      switch (item.name) {
        case "Sulfuras, Hand of Ragnaros":
          item.quality = 80;
          item.sellIn++;
          break;
        case "Aged Brie":
          this.addQuality(item, item.sellIn < 0 ? 2 : 1);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          let newQuality;
          if (item.sellIn > 10) newQuality = 1;
          else if (item.sellIn > 5) newQuality = 2;
          else if (item.sellIn >= 0) newQuality = 3;
          else newQuality = -item.quality;

          this.addQuality(item, newQuality);
          break;
        default:
          this.addQuality(item, item.sellIn < 0 ? -2 : -1);
          break;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
