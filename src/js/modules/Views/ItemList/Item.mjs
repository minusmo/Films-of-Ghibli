"use strict";
import { ElementBuilder } from "../elementbuilder.mjs";
import { generateSrcSet, generateSizes } from "../utils/generateSrcset.js";

const style = `
    <style>
        :host {
            position: relative;
            width: 32%;
            height: fit-content;
            cursor: pointer;
            transition: .3s;
        }
        :host(:hover) {
          scale: 1.2;
        }
        #item-img {
            width: 100%;
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

    const itemImg = new ElementBuilder().of("img").hasIdAs("item-img").build();
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
      itemImg.srcset = generateSrcSet(this.#item.getAlbumArt());
      itemImg.sizes = generateSizes();
      itemImg.alt = this.#item.getTitle();
      itemImg.src = this.#item.getAlbumArt();
      itemImg.loading = "lazy";
    }
  }

  #disableItemListScroll() {
    const myMusicDB = document.querySelector("my-music-db");
    const itemList = myMusicDB.shadowRoot.querySelector("item-list");
    itemList.style.overflow = "hidden";
  }
}

customElements.define("a-item", Item);
