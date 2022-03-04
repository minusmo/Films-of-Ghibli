"use strict";
import { EventHandlers } from "./eventHandlers.mjs";

class Page {
  constructor() {
    this.page = document;
  }

  header() {
    let pageHeader = this.page.createElement("header");
    pageHeader.setAttribute("id", "page-header");
    return pageHeader;
  }

  main() {
    let pageMain = this.page.createElement("main");
    pageMain.setAttribute("id", "page-main");
    return pageMain;
  }

  footer() {
    let pageFooter = this.page.createElement("footer");
    pageFooter.setAttribute("id", "page-footer");
    return pageFooter;
  }
}

class Button {
  themeButton() {
    let themeButton = document.createElement("button");
    themeButton.setAttribute("id", "theme-button");
    return themeButton;
  }

  movieListToggleButton() {
    let movieListToggleButton = document.createElement("button");
    movieListToggleButton.setAttribute("id", "movieListToggle-button");
    return movieListToggleButton;
  }

  closeButton() {
    let closeButton = document.createElement("button");
    let closeIcon = this.closeIcon();

    closeButton.classList.add("closeButton");
    closeButton.appendChild(closeIcon);
    closeIcon.addEventListener("click", new EventHandlers().hideModalOnClick);
    return closeButton;
  }

  closeIcon() {
    let closeIcon = document.createElement("img");
    closeIcon.src = "../../images/cross.svg";
    return closeIcon;
  }
}

class TextElement {
  title(textContent, id) {
    let pageTitle = document.createElement("h1");
    if (id) pageTitle.setAttribute("id", id);
    if (textContent) pageTitle.textContent = textContent;
    return pageTitle;
  }

  paragraph(textContent, id) {
    let paragraph = document.createElement("p");
    if (id) paragraph.setAttribute("id", id);
    if (textContent) paragraph.textContent = textContent;
    return paragraph;
  }
}

export { Page, Button, TextElement };
