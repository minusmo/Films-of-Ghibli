export class ItemListController {
    #itemCollection;
    #itemListView;
    constructor(itemListModel, itemListView) {
        this.#itemCollection = itemListModel;
        this.#itemListView = itemListView;
    }
    displayView() {
        this.#itemListView.display();
    }
    getItemList() {
        return this.#itemCollection.getItems();
    }
    getItemIterator() {
        return this.#itemCollection.createIterator();
    }

    sortBy(itemField) {
        let copiedItems = this.#itemCollection.getItems().slice();
        let sortedItems;
        switch (itemField) {
            case "artist":
                sortedItems = this.#sortByArtist(copiedItems);
                break;
            case "releasedDate":
                sortedItems = this.#sortByReleasedDate(copiedItems);
                break;
            case "recommendation":
                sortedItems = this.#sortByRecommendation(copiedItems);
                break;
        }
        return sortedItems;
    }
    #sortByArtist(copiedItems) {
        return copiedItems.sort((itemA,itemB) => {
            const artistA = itemA.getArtist();
            const artistB = itemB.getArtist();
            if (artistA < artistB) {
                return -1;
            }
            else if (artistA > artistB) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }
    #sortByReleasedDate(copiedItems) {
        return copiedItems.sort((itemA, itemB) => {
            const dateA = new Date(itemA.getReleasedDate());
            const dateB = new Date(itemB.getReleasedDate());
            if (dateA < dateB) {
                return -1;
            }
            else if (dateA > dateB) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }
    #sortByRecommendation(copiedItems) {
        const recommendationPoint = {
            "strong": 10,
            "medium": 5,
            "weak": 1,
        };
        return copiedItems.sort((itemA, itemB) => {
            const recoA = itemA.getRecommendation();
            const recoB = itemB.getRecommendation();
            return recommendationPoint[recoA] - recommendationPoint[recoB];
        });
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