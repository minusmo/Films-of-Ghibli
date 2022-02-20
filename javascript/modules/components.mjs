"use strict";
import { hideModalOnClick } from "./eventHandlers.mjs";

function makeHeroFrame() {
  let heroFrame = document.createElement("section");
  heroFrame.classList.add("heroFrame");
  return heroFrame;
}

function makeFilmFrame() {
  let filmFrame = document.createElement("div");
  filmFrame.className = "filmFrame";
  return filmFrame;
}

function makeCatalog() {
  let catalog = document.createElement("article");
  catalog.className = "catalog";
  return catalog;
}

function makeImgFrame() {
    let imgFrame = document.createElement("div");
    imgFrame.classList.add("filmFrame");
    return imgFrame;
}

function makeModal() {
    let modal = document.createElement("div");
    modal.classList.add("infoModal");

    let closeButton = makeCloseButton();
    modal.appendChild(closeButton);
    return modal;
}

function makeCloseButton() {
    let closeButton = document.createElement("button");
    let closeIcon = makeCloseIcon();
    
    closeButton.classList.add("closeButton");
    closeButton.appendChild(closeIcon);
    closeIcon.addEventListener("click", hideModalOnClick);
    return closeButton;
}

function makeCloseIcon() {
    let closeIcon = document.createElement("img");
    closeIcon.src = "../images/cross.svg";
    return closeIcon;
}

function makeUnorderedList(className) {
  let unorderedList = document.createElement("ul");
  unorderedList.classList.add(className ? className : '');
  return unorderedList;
}

function makeList(className) {
  let list = document.createElement("li");
  list.classList.add(className);
  return list;
}

export { makeHeroFrame, makeFilmFrame, makeCatalog, makeImgFrame, makeCloseButton, makeModal, makeUnorderedList, makeList };
