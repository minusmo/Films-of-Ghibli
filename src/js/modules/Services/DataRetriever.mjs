"use strict";

export class DataRetriever {
    #data;
    #url;
    #jsonData;
    constructor(url) {
        if (url) {
            this.#url = url;
        }
    }

    fetchData() {
        return fetch(this.#url);
    }
}