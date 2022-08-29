"use strict";

const style = `
    <style>
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #img-content {
            width: 75%;
            aspect-ratio: 1 / 1;
            box-shadow: 5px 5px black;
        }
    </style>
`;

export class SingleImg extends HTMLElement {
    #imgSrc;
    #imgContent;
    constructor(imgSrc = "") {
        super();
        this.#imgSrc = imgSrc;
        const shadowRoot = this.attachShadow({ mode: "open"});
        shadowRoot.innerHTML = style;
        const imgContent = document.createElement("img");
        imgContent.setAttribute("id", "img-content");
        this.#imgContent = imgContent;
        shadowRoot.appendChild(imgContent);
    }

    addImg(img) {
        this.#imgSrc = img;
        this.#imgContent.src = img;
    }
}

customElements.define("single-img", SingleImg);