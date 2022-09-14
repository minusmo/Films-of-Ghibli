"use strict";

const style = `
    <style>
        :host {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            padding: 5%;
            overflow: auto;
        }
    </style>
`;

export class ItemList extends HTMLElement {
  #itemListController;
  #ItemView;
  #shadowRoot;
  constructor(ItemView) {
    super();
    this.#ItemView = ItemView;
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.#shadowRoot = shadowRoot;
    this.#addStyle(style);
  }

  renderItems() {
    this.#shadowRoot.replaceChildren();
    this.#addStyle(style);
    this.#appendItems();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.#appendItems();
    }
  }

  #addStyle(hostStyle) {
    this.#shadowRoot.innerHTML = hostStyle;
  }

  #appendItems() {
    const itemIterator = this.#itemListController.getItemIterator();
    while (itemIterator.hasMore()) {
      const currentItem = itemIterator.getNext();
      const itemView = new this.#ItemView(currentItem);
      this.#shadowRoot.appendChild(itemView);
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

customElements.define("item-list", ItemList);
