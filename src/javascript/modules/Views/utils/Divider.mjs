"use strict";

const style = `
    <style>
        :host {
            position: absolute;
            display: block;
            background-color: black;
            width: 2px;
            height: 90%;
            top: 5%;
            left: 50%;
        }
    </style>
`;

export class Divider extends HTMLElement {
    #shadowRoot;
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open"});
        shadowRoot.innerHTML = style;
        this.#shadowRoot = shadowRoot;
    }
}

customElements.define("section-divider", Divider);