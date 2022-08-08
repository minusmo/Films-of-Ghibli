"use strict";

const style = `
    <style>
        :host {
            cursor: pointer;
        }
        #item-img {
            width: 100%;
            aspect-ratio: 1 / 1;
            border-radius: .2rem;
        }
    </style>
`;

export class ItemView extends HTMLElement {
  #item;
  #shadowRoot;
  constructor(item) {
    super();
    this.#item = item;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = style;
    this.#shadowRoot = shadowRoot;
    const itemImg = document.createElement("img");
    itemImg.setAttribute("id", "item-img");
    shadowRoot.appendChild(itemImg);
  }

  connectedCallback() {
    if (this.isConnected) {
      this.addEventListener("click", () => {
        this.#disableItemListScroll();
        const singleItemView = document.querySelector("single-item");
        singleItemView.showItem(this.#item);
    });
      const itemImg = this.#shadowRoot.querySelector("#item-img");
      itemImg.src = this.#item.getAlbumArt();
    }
  }

  #disableItemListScroll() {
    const mainContainer = document.querySelector("main-container");
    const itemList = mainContainer.shadowRoot.querySelector("item-list");
    itemList.style.overflow = "hidden";
  }
}

customElements.define("item-view", ItemView);
