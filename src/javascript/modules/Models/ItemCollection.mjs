export class ItemCollection {
    #items = [];
    #itemFields;
    constructor(items) {
        if (items) {
            this.#items = items;
        }
    }
    setItems(items) {
        this.#items = items;
    }
    getItems() {
        return this.#items;
    }
    getItemAt(position) {
        if (position >= this.#items.length) {
            throw new RangeError("Index out of range");
        }
        return this.#items[position];
    }
    createIterator() {
        return new ItemIterator(this.#items);
    }
}

export class ItemIterator {
    #collection = [];
    #iterationState = -1;
    constructor(itemCollection) {
        this.#collection = itemCollection;
    }
    getCurrentPosition() {
        return this.#iterationState;
    }
    getNext() {
        this.#iterationState = (this.#iterationState + 1) % this.#collection.length;
        return this.#collection[this.#iterationState];
    }
    hasMore() {
        if (this.#iterationState === this.#collection.length - 1) {
            return false;
        }
        else {
            return true;
        }
    }
}