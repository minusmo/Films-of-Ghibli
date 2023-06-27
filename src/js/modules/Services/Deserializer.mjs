export class Deserializer {
  #deserializedData;
  constructor(JSONData, Item) {
    if (JSONData) {
      let items = [];
      for (const item of JSONData) {
        items.push(new Item(item));
      }
      this.#deserializedData = items;
    }
  }

  getDeserialized() {
    if (this.#deserializedData) {
      return this.#deserializedData;
    }
  }
}
