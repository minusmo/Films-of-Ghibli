"use strict";

const options = {
    "addedOrder": "추가된 순서",
    "artist": "아티스트",
    "recommendation": "추천도",
    "releasedDate": "발매년도",
};

const style = `
    <style>
        :host {
            display: flex;
            width: 100%;
            height: 10%;
            border: 2px solid black;
            box-shadow: 3px 3px black;
            flex-direction: row;
            align-items: center;
            justify-content: center;
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
            option.textContent = options[value];
            select.appendChild(option);
        }
    }
    
}

customElements.define("sort-selection", SortSelection);