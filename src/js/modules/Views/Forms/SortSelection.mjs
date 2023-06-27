"use strict";
import { ElementBuilder } from "../elementbuilder.mjs";

const options = {
    "addedOrder": "추가된 순서",
    "artist": "아티스트",
    "recommendation": "추천도",
    "releasedDate": "발매년도",
};

const style = `
    <style>
        :host {
            width: 100%;
            height: 10%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            border: 2px solid black;
            box-shadow: 3px 3px black;
        }
        #sort-select {
            margin: 0.5rem;
            padding: 0.3rem;
            border-radius: 0.3rem;
            border: 3px solid black;
        }
    </style>
`;

export class SortSelection extends HTMLElement {
    #shadowRoot;
    #itemListController;
    #selectedValue;
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
        const label = new ElementBuilder()
        .of("label").for("sort-selected").hasTextOf("SortBy").build();
        this.#shadowRoot.appendChild(label);
    }

    #addSelect() {
        const select = new ElementBuilder().of("select")
        .hasIdAs("sort-select").hasNameOf("sort-select")
        .listeningOn("change", (event) => {
            this.#selectedValue = event.target.value;
            this.#sortByOption(this.#selectedValue);
        }).build();
        this.#shadowRoot.appendChild(select);
    }

    #sortByOption(option) {
        this.#itemListController.sortItemsBy(option);
        this.#itemListController.renderItemListView();
    }

    #addOptions(values) {
        const select = this.#shadowRoot.querySelector("#sort-select");
        for (const value of values) {
            const option = new ElementBuilder().of("option")
            .hasValueOf(value).hasTextOf(options[value]).build();
            select.appendChild(option);
        }
    }
    
}

customElements.define("sort-selection", SortSelection);