"use strict";

const style = `
    <style>
        :host {
            display: grid;
            grid-template-rows: repeat(auto-fill, minmax(8rem, 1fr));
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2%;
            padding: 1rem;
            overflow: scroll;
        }
    </style>
`;

export class ItemListView extends HTMLElement {
    #itemListController;
    #ItemView;
    #shadowRoot;
    constructor(ItemView) {
        super();
        this.#ItemView = ItemView;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = style;
        this.#shadowRoot = shadowRoot;
    }
    
    connectedCallback() {
        if (this.isConnected) {
            const itemIterator = this.#itemListController.getItemIterator();
            while (itemIterator.hasMore()) {
                const currentItem = itemIterator.getNext();
                const itemView = new this.#ItemView(currentItem);
                this.#shadowRoot.appendChild(itemView);
            }
        }
    }
    
    disconnectedCallback() {
        for (let child of this.children) {
            this.#shadowRoot.removeChild(child);
        }
    }
    
    addController(controller) {
        this.#itemListController = controller;
    }
}

customElements.define("item-list", ItemListView);