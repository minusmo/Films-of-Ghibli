"use strict";

import { ElementBuilder } from "../elementbuilder.mjs";

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
    const heading = new ElementBuilder().of("h1").hasIdAs("collection-name")
    .hasTextOf(this.#collectionInfoController.getCollectionName())
    .build();
    this.#shadowRoot.appendChild(heading);
  }

  addCollectionDescription() {
    const paragraph = new ElementBuilder().of("p").hasIdAs("collection-description")
    .hasTextOf(this.#collectionInfoController.getCollectionDescription())
    .build();
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
