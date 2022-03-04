"use strict";
/*global suite, test, chai*/
let expect = chai.expect;

class MovieCard extends HTMLDivElement {
  constructor(posterUrl, movieTitle) {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });
    this.style.backgroundImage = posterUrl;
    shadowRoot.appendChild(this.movieCardStyle());
    shadowRoot.appendChild(this.titleBanner(movieTitle));

    this.addEventListener("click", this.openInfoCard);
  }

  titleBanner(movieTitle) {
    let titleBanner = document.createElement("h4");
    titleBanner.setAttribute("id", "title-banner");
    if (movieTitle) titleBanner.textContent = movieTitle;
    return titleBanner;
  }

  movieCardStyle() {
    let styleSheetLink = document.createElement("link");
    styleSheetLink.setAttribute("rel", "stylesheet");
    styleSheetLink.setAttribute("href", "../../styles/movieCardStyle.css");
    return styleSheetLink;
  }

  openInfoCard(event) {
    let infoCard = this.firstChild();
    infoCard.setAttribute("hidden", false);
  }
}
customElements.define("movie-card", MovieCard, { extends: "div" });

class InfoCard extends HTMLElement {
  constructor(filmData) {
    super();

    let shadowRoot = this.attachShadow({ mode: "open"});
    shadowRoot.appendChild(this.infoCardStyle());
    shadowRoot.appendChild(this.bannerImg());
    shadowRoot.appendChild(this.detailArticle());
  }

  infoCardStyle() {
    let infoCardStyle = document.createElement("link");
    infoCardStyle.setAttribute("rel", "stylesheet");
    infoCardStyle.setAttribute("href", "../")
  }

}
suite("test movieCard component", function () {
  test("movie-card instance", function () {
    expect(new MovieCard()).is.instanceOf(MovieCard);
  });
});

suite("test infoCard component", function () {
  test("info-card instance", function () {
    expect(new InfoCard()).is.instanceOf(InfoCard);
  });
});
