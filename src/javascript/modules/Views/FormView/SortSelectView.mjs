"use strict";

import { ItemSorter } from "../../Services/ItemSorter.mjs";
import { albumFields } from "../../Models/enums/AlbumFields.mjs";

const style = `
    <style>
        :host {
            display: block;
            width: 100%;
            height: 10%;
            border: 2px solid black;
        }
    </style>
`;

export class SortSelectView extends HTMLElement {
    #shadowRoot;
    #itemListController;
    #selectedValue;
    #itemSorter = new ItemSorter(albumFields);
    constructor(itemListController, optionValues) {
        super();
        this.#itemListController = itemListController;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = style;
        this.#shadowRoot = shadowRoot;
        this.#addLabel();
        this.#addSelect();
        this.#addOptions(optionValues);
    }
    
    #addLabel() {
        const label = document.createElement("label");
        label.setAttribute("for", "sort-select");
        label.textContent = "SortBy";
        this.#shadowRoot.appendChild(label);
    }

    #addSelect() {
        const select = document.createElement("select");
        select.setAttribute("id", "sort-select");
        select.setAttribute("name", "sort-select");
        select.addEventListener("change", (event) => {
            this.#selectedValue = event.target.value;
            this.#sortByOption(this.#selectedValue);
        });
        this.#shadowRoot.appendChild(select);
    }

    #sortByOption(option) {
        this.#itemListController.sortItemsBy(option);
        this.#itemListController.renderItemListView();
    }

    #addOptions(values) {
        const select = this.#shadowRoot.querySelector("#sort-select");
        for (const value of values) {
            const option = document.createElement("option");
            option.setAttribute("value", value);
            option.textContent = value;
            select.appendChild(option);
        }
    }
    
}

customElements.define("input-sort", SortSelectView);