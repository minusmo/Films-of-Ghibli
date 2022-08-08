export class MultiItemView extends HTMLElement {
  #imgs = [];
  #currentImg = -1;
  #imgElement;
  constructor(imgs = []) {
    super();
    for (let img of imgs) {
      this.#imgs.push(img);
    }
    if (this.#imgs.length >= 1) {
      this.#currentImg = 0;
    }
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      <style>
      </style>
    `;
  }

  addImg(img) {
    if (img) {
      this.#imgs.push(img);
    }
  }

  #addImg() {
    const imgElement = document.createElement("imgElement");
    imgElement.setAttribute("id", "imgElement");
    imgElement.src = this.#imgs[this.#currentImg];
    this.appendChild(imgElement);
    this.#imgElement = imgElement;
  }

  #addPrevButton() {
    const prevButton = document.createElement("button");
    prevButton.setAttribute("id", "button-prev");
    prevButton.addEventListener("click", () => {
      this.#currentImg -= 1;
      if (this.#currentImg < 0) {
        this.#currentImg = this.#imgs.length -1;
      }
      this.#imgElement.src = this.#imgs[this.#currentImg];
    });
    this.appendChild(prevButton);
  }

  #addNextButton() {
    const nextButton = document.createElement("button");
    nextButton.setAttribute("id", "button-next");
    nextButton.addEventListener("click", () => {
      this.#currentImg = (this.#currentImg + 1) % this.#imgs.length;
      this.#imgElement.src = this.#imgs[this.#currentImg];
    });
    this.appendChild(nextButton);
  }
}

customElements.define("multiiItem", MultiItemView);