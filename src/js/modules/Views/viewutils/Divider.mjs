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
        @media (max-width: 500px) {
            :host {
                position: static;
                display: block;
                background-color: black;
                width: 90%;
                height: 2px;
            }
        }
    </style>
`;

export class Divider extends HTMLElement {
    #shadowRoot;
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = style;
        this.#shadowRoot = shadowRoot;
        this.setAttribute("id", "divider");
    }
}

customElements.define("section-divider", Divider);