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

class DateRange {
  constructor(lowerBound, upperBound) {
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
  }
}

class NonUpdatableItem {
  constructor(value) {
    this.value = value;
  }

  updateItem(item) {
    item.quality = this.value;
  }
}

class UpdatableItem extends NonUpdatableItem {
  constructor(minVal, maxVal, dateRange, valUpdateRange) {
    super();
    this.maxVal = maxVal;
    this.minVal = minVal;
    this.dateRange = [...dateRange];
    this.valUpdateRange = [...valUpdateRange];
  }

  updateItem(item) {
    item.sellIn--;
    for (let i = 0; i < this.dateRange.length; i++) {
      if (
        item.sellIn > this.dateRange[i].lowerBound &&
        item.sellIn <= this.dateRange[i].upperBound
      ) {
        item.quality += this.valUpdateRange[i];
        break;
      }
    }

    if (item.quality < this.minVal) item.quality = this.minVal;
    else if (item.quality > this.maxVal) item.quality = this.maxVal;
  }
}

const itemToParams = {
  "Aged Brie": {
    minVal: MIN_QUALITY_VALUE,
    maxVal: MAX_QUALITY_VALUE,
    dateRange: [
      new DateRange(Number.MIN_SAFE_INTEGER, -1),
      new DateRange(-1, Number.MAX_SAFE_INTEGER),
    ],
    valRange: function () {
      return [2, 1];
    },
  },
  "Backstage passes": {
    minVal: MIN_QUALITY_VALUE,
    maxVal: MAX_QUALITY_VALUE,
    dateRange: [
      new DateRange(Number.MIN_SAFE_INTEGER, -1),
      new DateRange(-1, 5),
      new DateRange(5, 10),
      new DateRange(10, Number.MAX_SAFE_INTEGER),
    ],
    valRange: function () {
      return [-this.maxVal, 3, 2, 1];
    },
  },
  default: {
    minVal: MIN_QUALITY_VALUE,
    maxVal: MAX_QUALITY_VALUE,
    dateRange: [
      new DateRange(Number.MIN_SAFE_INTEGER, -1),
      new DateRange(-1, Number.MAX_SAFE_INTEGER),
    ],
    valRange: function () {
      return [-2, -1];
    },
  },
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  getKey(name) {
    for (const key in itemToParams) {
      if (key === "default") continue;
      if (name.startsWith(key)) return itemToParams[key];
    }
    return itemToParams.default;
  }

  categorize(name) {
    if (name.startsWith("Sulfuras"))
      return new NonUpdatableItem(LEGENDARY_ITEM_VALUE);

    let itemParams = itemToParams["default"];
    for (const key in itemToParams) {
      if (key === "default") continue;
      if (name.startsWith(key)) itemParams = itemToParams[key];
    }
    return new UpdatableItem(
      itemParams.minVal,
      itemParams.maxVal,
      itemParams.dateRange,
      itemParams.valRange()
    );
  }

  updateQuality() {
    for (let item of this.items) {
      let updatedItem = this.categorize(item.name);
      updatedItem.updateItem(item);
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
