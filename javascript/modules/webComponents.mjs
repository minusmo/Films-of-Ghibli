"use strict";

class MovieCard extends HTMLDivElement {
  constructor(posterUrl, movieTitle) {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
        <style>
          :host {
            background-repeat: no-repeat;
            background-size: cover;
          }
          #title-banner {
            text-decoration: underline;
            font-weight: bold;
          }
        </style>
      `;
    this.style.backgroundImage = posterUrl;
    shadowRoot.appendChild(this.titleBanner(movieTitle));

    this.addEventListener("click", this.openInfoCard);
  }

  titleBanner(movieTitle) {
    let titleBanner = document.createElement("h4");
    titleBanner.setAttribute("id", "title-banner");
    if (movieTitle) titleBanner.textContent = movieTitle;
    return titleBanner;
  }

  openInfoCard() {
    let infoCard = this.firstChild();
    infoCard.setAttribute("hidden", false);
  }
}
customElements.define("movie-card", MovieCard, { extends: "div" });

class InfoCard extends HTMLElement {
  constructor(filmData) {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
        <style>
          #banner-img {
  
          }
          #detail-article {
            max-width: 100%;
          }
          .label {
            font-size: 0.5rem;
          }
          .film-info {
            font-size: 0.3rem;
          }
        </style>
      `;
    if (filmData) {
      shadowRoot.appendChild(
        this.bannerImg(filmData.movie_banner, filmData.title)
      );
      shadowRoot.appendChild(this.detailArticle(filmData));
    }
  }

  bannerImg(movie_banner, movie_title) {
    let bannerImg = document.createElement("img");
    bannerImg.setAttribute("src", movie_banner);
    bannerImg.setAttribute("alt", movie_title);
    return bannerImg;
  }

  detailArticle(filmData) {
    let detailArticle = document.createElement("article");
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
    }
    return detailArticle;
  }
}
customElements.define("info-card", InfoCard);

export { MovieCard, InfoCard };
