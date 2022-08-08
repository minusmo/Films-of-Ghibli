"use strict";
import { Button } from "./components.mjs";

class MovieCard extends HTMLElement {
  constructor(posterUrl, movieTitle) {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
        <style>
          :host {
            box-shadow: 0px 5px 10px lightgrey;
            display: flex;
            flex-direction: column;
            flex: 1;
            flex-basis: 30%;
            flex-shrink: 1;
            flex-grow: 0;
            cursor: pointer;
          }
          #poster-img {
            width: 100%;
            flex: 4;
          }
          #title-banner {
            flex: 1;
            font-weight: bold;
            max-inline-width: 20ch;
            color: black;
            background-color: var(--light-font-color);
            margin: 0;
            padding: var(--box-padding);
          }
        </style>
    `;
    shadowRoot.appendChild(this.posterImg(posterUrl, movieTitle));
    shadowRoot.appendChild(this.titleBanner(movieTitle));
    this.addEventListener("click", this.openInfoCard);
  }

  posterImg(posterUrl, movieTitle) {
    let posterImg = document.createElement("img");
    posterImg.setAttribute("id", "poster-img");
    posterImg.setAttribute("src", posterUrl);
    posterImg.setAttribute("alt", movieTitle);
    return posterImg;
  }

  titleBanner(movieTitle) {
    let titleBanner = document.createElement("h4");
    titleBanner.setAttribute("id", "title-banner");
    if (movieTitle) titleBanner.textContent = movieTitle;
    return titleBanner;
  }

  openInfoCard() {
    let infoCard = this.nextElementSibling;
    console.log(infoCard);
    infoCard.toggleAttribute("hidden");
    infoCard.classList.add("showing");
  }
}
customElements.define("movie-card", MovieCard);

class InfoCard extends HTMLElement {
  constructor(filmData) {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
        <style>
          #banner-img {
            flex-basis: auto;
            flex-shrink: 1;
            flex-grow: 1;
            margin: 1rem;
            max-width: 95%;
            box-shadow: 5px 5px 10px lightgrey;
            border: 5px solid black;
          }
          @media (min-width: 1000px) {
            #banner-img {
              max-width: 60%;
            } 
          }
          #detail-article {
            max-width: 100%;
            flex-basis: auto;
		        flex-shrink: 1;
		        flex-grow: 1;
		        padding: 1rem;
            line-height: .7;
          }
          @media (max-width: 550px) {
            #detail-article {
              align-self: stretch;
            }
          }
          .label {
            font-size: 1rem;
          }
          .film-info {
            font-size: .75rem;
          }
          .film-info::before {
            content: '➩';
            margin-right: .5rem;
          }
          .closeButton {
            min-width: 15px;
            border: none;
            padding: 0;
            background: transparent;
            position: absolute;
            top: var(--box-padding);
            left: var(--box-padding);
            cursor: pointer;
          }
        </style>
    `;
    shadowRoot.appendChild(this.closeButton());
    if (filmData) {
      shadowRoot.appendChild(
        this.bannerImg(filmData.movie_banner, filmData.title)
      );
      shadowRoot.appendChild(this.detailArticle(filmData));
    }
    this.classList.add("info-card");
    this.hidden = true;
  }

  closeButton() {
    let closeButton = Button.closeButton();
    let infocard = this;
    closeButton.addEventListener("click", function () {
      infocard.classList.remove("showing");
      infocard.hidden = true;
    });
    return closeButton;
  }

  bannerImg(movie_banner, movie_title) {
    let bannerImg = document.createElement("img");
    bannerImg.setAttribute("id", "banner-img");
    bannerImg.setAttribute("src", movie_banner);
    bannerImg.setAttribute("alt", movie_title);
    return bannerImg;
  }

  detailArticle(filmData) {
    let detailArticle = document.createElement("article");
    detailArticle.setAttribute("id", "detail-article");
    for (let [data, content] of Object.entries(filmData)) {
      let notNeededData = [
        "id",
        "people",
        "image",
        "movie_banner",
        "species",
        "locations",
        "vehicles",
        "url",
        "rt_score",
        "title",
        "description",
      ];

      if (notNeededData.includes(data)) {
        continue;
      }

      let label = document.createElement("p");
      label.classList.add("label");
      label.textContent = data;
      let info = document.createElement("p");
      info.classList.add("film-info");
      info.textContent = content;
      detailArticle.appendChild(label);
      detailArticle.appendChild(info);
    }
    return detailArticle;
  }
}
customElements.define("info-card", InfoCard);

export { MovieCard, InfoCard };
