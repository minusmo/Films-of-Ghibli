import { albumFields } from "../Models/enums/AlbumFields.mjs";
import { ItemSorter } from "./ItemSorter.mjs";

export class ItemListController {
    #itemCollection;
    #itemListView;
    #itemSorter;
    constructor(itemListModel, itemListView) {
        this.#itemCollection = itemListModel;
        this.#itemListView = itemListView;
        this.#itemSorter = new ItemSorter(albumFields);
    }

    renderItemListView() {
        this.#itemListView.renderItems();
    }

    getItemList() {
        return this.#itemCollection.getItems();
    }
    getItemIterator() {
        return this.#itemCollection.createIterator();
    }

    sortItemsBy(itemField) {
        const sortedItems = this.#itemSorter.sortBy(this.#itemCollection.getItems(), itemField);
        this.#itemCollection.setItems(sortedItems);
    }

    filterBy(itemField, value) {
        let copiedItems = this.#itemCollection.getItems().slice();
        let filteredItems;
        switch (itemField) {
            case "genre":
                filteredItems = this.#filterByGenre(copiedItems, value);
                break;
        }
        return filteredItems;
    }
    #filterByGenre(copiedItems, value) {
        return copiedItems.filter(item => {
            const genre = item.getGenre();
            return genre == value;
        });
    }
    
    searchItems(query) {
        let result = [];
        const iterator = this.#itemCollection.createIterator();
        while (iterator.hasMore()) {
            const currentItem = iterator.getNext();
            let contains = false;
            if (query in currentItem.getTitle()) {
                contains = true;
            }
            if (contains) {
                result.push(currentItem);
            }
        }
        return result;
    }
}