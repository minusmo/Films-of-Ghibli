"use strict";

const style = `
    <style>
        :host {
            display: block;
            padding: 2rem;
        }
    </style>
`;

export class CollectionInfoView extends HTMLElement {
  #collectionInfoController;
  #shadowRoot;
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = style;
    this.#shadowRoot = shadowRoot;
  }
  connectedCallback() {
    const heading = document.createElement("h1");
    heading.setAttribute("id", "collection-name");
    heading.textContent = this.#collectionInfoController.getCollectionName();
    this.#shadowRoot.appendChild(heading);

    const paragraph = document.createElement("p");
    paragraph.setAttribute("id", "collection-description");
    paragraph.textContent =
      this.#collectionInfoController.getCollectionDescription();
    this.#shadowRoot.appendChild(paragraph);
  }
  addController(controller) {
    this.#collectionInfoController = controller;
  }
  display() {
    this.setAttribute("hidden", false);
  }
}

customElements.define("collection-info", CollectionInfoView);
