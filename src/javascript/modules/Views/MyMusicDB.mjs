"use strict";

const style = `
    <style>
        :host {
            width: 100vw;
            height: 100vh;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr 1fr;
        }
    </style>
`;

export class MyMusicDB extends HTMLElement {
    #shadowRoot;
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = style;
        this.#shadowRoot = shadowRoot;
    }
    addChild(child) {
        this.#shadowRoot.appendChild(child);
    }
}

customElements.define("my-music-db", MyMusicDB);