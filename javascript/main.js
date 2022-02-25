"use strict";
import { GHIBLI_API } from "./modules/ghibliApi.mjs";
import {
  toggleVisibilityOnScroll,
  showModalOnClick,
} from "./modules/eventHandlers.mjs";
import {
  makeHeroFrame,
  makeCatalog,
  makeImgFrame,
  makeModal,
  makeList,
} from "./modules/components.mjs";

class Ghibli {
  constructor() {
    this.root = document.getElementById("main-container");
    this.document = document;
    this.buildPage();
    this.document.addEventListener("scroll", toggleVisibilityOnScroll);
    this.createFrame = this.createFrame.bind(this);
  }

  makeFilmInfo(filmInfo) {
    let movieTitle = makeArticle("movieTitle");
    let movieDetails = makeArticle("movieDetails");
    let movieDetailsModal = makeModal();

    for (let [data, content] of Object.entries(filmInfo)) {
      let notNeededData = [
        "id",
        "people",
        "image",
        "movie_banner",
        "species",
        "locations",
        "vehicles",
        "url",
      ];

      if (notNeededData.includes(data)) {
        continue;
      }

      let listHead = makeList("listHead");
      let listContent = makeList("listContent");

      let heading = data.toUpperCase();
      listHead.textContent = `${heading}:`;

      if (data === "title" || data === "original_title") {
        listContent.textContent = content;
        movieTitle.appendChild(listHead);
        movieTitle.appendChild(listContent);
      } else {
        if (data === "description") {
          listHead.className = "description";

          let truncatedDescription = content.slice(0, 50);
          truncatedDescription += "...";
          listContent.textContent = truncatedDescription;
        } else {
          listContent.textContent = content;
        }

        movieDetails.appendChild(listHead);
        movieDetails.appendChild(listContent);
      }
    }

    let moreInfo = document.createElement("li");
    moreInfo.classList.add("moreInfo");
    moreInfo.textContent = "more info";
    moreInfo.addEventListener("click", showModalOnClick);

    movieTitle.appendChild(moreInfo);
    movieTitle.appendChild(modal);
    movieDetailsModal.appendChild(movieDetails);

    return titleList;
  }

  buildFrame(film, index) {
    let heroFrame = makeHeroFrame();
    heroFrame.setAttribute("id", index);

    let img = document.createElement("img");
    img.setAttribute("id", `${film.id}`);

    let titleList = this.makeFilmInfo(film);

    let catalog = makeCatalog();

    let imgFrame = makeImgFrame();
    imgFrame.appendChild(img);

    catalog.appendChild(titleList);

    heroFrame.appendChild(catalog);
    heroFrame.appendChild(imgFrame);
    img.src = `${film.image}`;

    this.root.appendChild(heroFrame);
  }

  async buildPage() {
    try {
      let ghibliFilms = await getGhibliFilms();
      buildFrames(ghibliFilms);
    }
    catch(error) {
      console.warn(error);
      buildFallbackPage();
    }

    function getGhibliFilms() {
      return fetch(GHIBLI_API).then(response => {
        let ghibliFilms = response.json();
        return ghibliFilms;
      });
    }
    function buildFrames(ghibliFilms) {
      ghibliFilms.forEach(this.buildFrame);
    }
}}

new Ghibli();