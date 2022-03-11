class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
const MAX_QUALITY_VALUE = 50;
const MIN_QUALITY_VALUE = 0;
const LEGENDARY_ITEM_VALUE = 80;

class NonUpdatableItem {
  constructor(value = LEGENDARY_ITEM_VALUE) {
    this.value = value;
  }

  updateItem(item) {
    item.quality = this.value;
  }
}

class UpdatableItem extends NonUpdatableItem {
  constructor(
    decreaseVal,
    minVal = MIN_QUALITY_VALUE,
    maxVal = MAX_QUALITY_VALUE
  ) {
    super();
    this.decreaseVal = decreaseVal;
    this.maxVal = maxVal;
    this.minVal = minVal;
  }

  decreaseSellIn(item) {
    item.sellIn--;
  }

  decreaseQuality(item) {
    item.quality += item.sellIn > 0 ? this.decreaseVal : this.decreaseVal * 2;
  }

  checkItem(item) {
    if (item.quality < this.minVal) item.quality = this.minVal;
    else if (item.quality > this.maxVal) item.quality = this.maxVal;
  }

  updateItem(item) {
    this.decreaseSellIn(item);
    this.decreaseQuality(item);
    this.checkItem(item);
  }
}

class UpdateInRange extends UpdatableItem {
  constructor(...props) {
    super(...props);
  }

  decreaseQuality(item) {
    if (item.sellIn > 10) item.quality += this.decreaseVal;
    else if (item.sellIn > 5) item.quality += this.decreaseVal + 1;
    else if (item.sellIn >= 0) item.quality += this.decreaseVal + 2;
    else item.quality = 0;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  createCategory(name) {
    if (name.startsWith("Sulfuras")) return new NonUpdatableItem();

    if (name.startsWith("Backstage passes")) return new UpdateInRange(1);

    if (name.startsWith("Aged Brie")) return new UpdatableItem(1);

    if (name.startsWith("Conjured")) return new UpdatableItem(-2);

    return new UpdatableItem(-1);
  }

  updateQuality() {
    for (let item of this.items) {
      this.createCategory(item.name).updateItem(item);
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
