"use strict";

const style = `
    <style>
        :host {
            cursor: pointer;
            transition: .3s;
        }
        :host(:hover) {
          scale: 1.2;

        }
        #item-img {
            width: 100%;
            aspect-ratio: 1 / 1;
            border-radius: .2rem;
        }
    </style>
`;

export class Item extends HTMLElement {
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
        const itemDetail = document.querySelector("item-detail");
        itemDetail.showItem(this.#item);
    });
      const itemImg = this.#shadowRoot.querySelector("#item-img");
      itemImg.src = this.#item.getAlbumArt();
    }
  }

  #disableItemListScroll() {
    const myMusicDB = document.querySelector("my-music-db");
    const itemList = myMusicDB.shadowRoot.querySelector("item-list");
    itemList.style.overflow = "hidden";
  }
}

customElements.define("a-item", Item);
