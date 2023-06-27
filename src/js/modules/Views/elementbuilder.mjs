export class ElementBuilder {
  #element;
  #style;
  constructor(baseElement = null) {
    this.#element = baseElement;
  }
  of(tag) { 
    this.#element = document.createElement(tag);
    return this;
  }
  for (label) {
    if (!this.#element) throw Error("No element before add label");
    this.#element.setAttribute("for", label);
    return this;
  }
  hasAttributeOf(attName, attVal) {
    if (!this.#element) throw Error("No element before add attribute");
    this.#element.setAttribute(attName, attVal);
    return this;
  }
  hasIdAs(id) { 
    if (!this.#element) throw Error("No element before add id"); 
    this.#element.setAttribute("id", id);
    return this;
  }
  hasNameOf(name) {
    if (!this.#element) throw Error("No element before add name");
    this.#element.setAttribute("name", name);
    return this;
  }
  hasValueOf(value) {
    if (!this.#element) throw Error("No element before add value");
    this.#element.setAttribute("value", value);
    return this;
  }
  inTheClassesOf(classList) {
    if (!this.#element) throw Error("No element before add class list");
    this.#element.classList = classList;
    return this;
  }
  styledAs(styleObj) {
    if (!this.#element) throw Error("No element before add style");
    this.#style = styleObj;
    for (const [prop, val] of Object.entries(styleObj)) {
      this.#element.style[prop] = val;
    }
    return this;
  }
  listeningOn(eventType, eventListener) {
    if (!this.#element) throw Error("No element before add event listner");
    this.#element.addEventListener(eventType, eventListener);
    return this;
  }
  hasTextOf(text) {
    if (!this.#element) throw Error("No element before add text content");
    this.#element.textContent = text;
    return this;
  }
  hasChildrenOf(children) {
    if (!this.#element) throw Error("No element before add children");
    for (const child of children) {
      this.#element.appendChild(child);
    }
    return this;
  }
  build() { return this.#element; }
}
