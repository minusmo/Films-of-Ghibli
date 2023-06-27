"use strict";

export class ItemSorter {
    #itemFields;
    constructor(itemFields) {
        this.#itemFields = itemFields;
    }

    sortBy(items, itemField) {
        let sortedItems;
        switch (itemField) {
            case "addedOrder":
                sortedItems = this.#sortByAddedOrder(items);
                break;
            case "artist":
                sortedItems = this.#sortByArtist(items);
                break;
            case "releasedDate":
                sortedItems = this.#sortByReleasedDate(items);
                break;
            case "recommendation":
                sortedItems = this.#sortByRecommendation(items);
                break;
        }
        return sortedItems;
    }
    #sortByAddedOrder(items) {
        return items.sort((itemA, itemB) => {
            return itemA.getId() - itemB.getId();
        });
    }
    #sortByArtist(items) {
        return items.sort((itemA,itemB) => {
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
    #sortByReleasedDate(items) {
        return items.sort((itemA, itemB) => {
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
    #sortByRecommendation(items) {
        const recommendationPoint = {
            "strong": 10,
            "medium": 5,
            "weak": 1,
        };
        return items.sort((itemA, itemB) => {
            const recoA = itemA.getRecommendation();
            const recoB = itemB.getRecommendation();
            return recommendationPoint[recoA] - recommendationPoint[recoB];
        });
    }
}