"use strict";
import { GHIBLI_API } from "./modules/ghibliApi.mjs";
import { toggleVisibilityOnScroll, hideModalOnClick, showModalOnClick } from "./modules/eventHandlers.mjs";

class Ghibli {
  constructor() {
    this.root = document.getElementById("main-container");
    this.document = document;
    this.buildPage();
    this.document.addEventListener("scroll", toggleVisibilityOnScroll);
    this.createFrame = this.createFrame.bind(this);
  }

  makeHeroFrame() {
    let heroFrame = document.createElement("div");
    heroFrame.classList.add("heroFrame");
    return heroFrame;
  }

  makeFilmFrame() {
    let filmFrame = document.createElement("div");
    filmFrame.className = "filmFrame";
    return filmFrame;
  }

  makeList(film) {
    let titleList = document.createElement("ul");
    titleList.classList.add("titleList");

    let modal = document.createElement("div");
    modal.classList.add("infoModal");

    let closeButton = document.createElement("button");
    let closeImg = document.createElement("img");
    closeImg.src = "../images/cross.svg";

    closeButton.classList.add("closeButton");
    closeButton.appendChild(closeImg);
    closeImg.addEventListener("click", hideModalOnClick);
    modal.appendChild(closeButton);

    let infoList = document.createElement("ul");
    infoList.classList.add("infoList");

    for (let [key, value] of Object.entries(film)) {
      if (
        key === "id" ||
        key === "people" ||
        key === "image" ||
        key === "movie_banner" ||
        key === "species" ||
        key === "locations" ||
        key === "vehicles" ||
        key === "url"
      ) {
        continue;
      }

      let listHead = document.createElement("li");
      listHead.classList.add("listHead");
      let listContent = document.createElement("li");
      listContent.classList.add("listContent");
      let uppercaseKey = key.toUpperCase();
      listHead.textContent = `${uppercaseKey}:`;

      if (key === "title" || key === "original_title") {
        listContent.textContent = `${value}`;
        titleList.appendChild(listHead);
        titleList.appendChild(listContent);
      } else {
        if (key === "description") {
          listHead.className = "description";
          let slicedDescription = value.slice(0, 150);
          slicedDescription += "...";
          listContent.textContent = slicedDescription;
        } else {
          listContent.textContent = `${value}`;
        }
        infoList.appendChild(listHead);
        infoList.appendChild(listContent);
      }
    }

    let moreInfo = document.createElement("li");
    moreInfo.classList.add("moreInfo");
    moreInfo.textContent = "more info";
    moreInfo.addEventListener("click", showModalOnClick);

    titleList.appendChild(moreInfo);
    titleList.appendChild(modal);
    modal.appendChild(infoList);

    return titleList;
  }

  makeCatalog() {
    let catalog = document.createElement("div");
    catalog.className = "catalog";
    return catalog;
  }

  createFrame(film, index) {
    let heroFrame = this.makeHeroFrame();

    heroFrame.setAttribute("id", index);
    let imgFrame = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("id", `${film.id}`);
    let titleList = this.makeList(film);
    let catalog = this.makeCatalog();
    imgFrame.classList.add("filmFrame");
    imgFrame.appendChild(img);
    catalog.appendChild(titleList);
    heroFrame.appendChild(catalog);
    heroFrame.appendChild(imgFrame);
    img.src = `${film.image}`;

    this.root.appendChild(heroFrame);
  }

  buildPage() {
    fetch(GHIBLI_API)
      .then((response) => {
        let ghibliFilms = response.json();
        return ghibliFilms;
      })
      .then((ghibliFilms) => {
        ghibliFilms.forEach(this.createFrame);
      })
      .catch((err) => console.warn(err));
  }

  
}

window.ghibli = new Ghibli();
