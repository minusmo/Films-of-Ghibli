"use strict";

const style = `
    <style>
        :host {
            display: block;
            padding: 5%;
        }
    </style>
`;

export class CollectionInfo extends HTMLElement {
  #collectionInfoController;
  #shadowRoot;
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = style;
    this.#shadowRoot = shadowRoot;
  }

  addCollectionName() {
    const heading = document.createElement("h1");
    heading.setAttribute("id", "collection-name");
    heading.textContent = this.#collectionInfoController.getCollectionName();
    this.#shadowRoot.appendChild(heading);
  }

  addCollectionDescription() {
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
    this.style.display = "block";
  }

  addChild(node) {
    this.#shadowRoot.appendChild(node);
  }
}

customElements.define("collection-info", CollectionInfo);
