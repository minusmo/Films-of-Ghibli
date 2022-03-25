"use strict";

class Page {
  static header() {
    let pageHeader = document.createElement("header");
    pageHeader.setAttribute("id", "page-header");
    return pageHeader;
  }

  static main(id) {
    let pageMain = document.createElement("main");
    pageMain.setAttribute("id", id);
    return pageMain;
  }

  static footer() {
    let pageFooter = document.createElement("footer");
    pageFooter.setAttribute("id", "page-footer");
    return pageFooter;
  }
}

class Button {
  static themeButton() {
    let themeButton = document.createElement("button");
    themeButton.setAttribute("id", "theme-button");
    return themeButton;
  }

  static movieListToggleButton() {
    let movieListToggleButton = document.createElement("button");
    movieListToggleButton.setAttribute("id", "movieListToggle-button");
    return movieListToggleButton;
  }

  static closeButton() {
    let closeButton = document.createElement("button");
    let closeIcon = this.closeIcon();

    closeButton.classList.add("closeButton");
    closeButton.appendChild(closeIcon);
    return closeButton;
  }

  static closeIcon() {
    let closeIcon = document.createElement("img");
    closeIcon.setAttribute("src", "./src/images/cross.svg");
    return closeIcon;
  }
}

class TextElement {
  static title(textContent, id) {
    let pageTitle = document.createElement("h1");
    if (id) pageTitle.setAttribute("id", id);
    if (textContent) pageTitle.textContent = textContent;
    return pageTitle;
  }

  static paragraph(textContent, id) {
    let paragraph = document.createElement("p");
    if (id) paragraph.setAttribute("id", id);
    if (textContent) paragraph.textContent = textContent;
    return paragraph;
  }
}

export { Page, Button, TextElement };
