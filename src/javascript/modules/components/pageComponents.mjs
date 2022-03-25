"use strict";
import { Page, TextElement } from "./modules/components/components.mjs";
import { MovieCard, InfoCard } from "./webComponents.mjs";
import { fetchGhibliFilms } from "../asyncFunctions/dataFetcher.mjs";

class PageBody {
  constructor() {
    this.htmlBody = document.body;
    this.buildPage();
  }

  async buildPage() {
    let page = new Page();
    this.buildHeader(page);
    this.buildMain(page);
    this.buildFooter(page);

    try {
      let { ghibliFilms } = await fetchGhibliFilms();
      await this.addMovieCards(ghibliFilms);
    } catch (error) {
      console.warn(error);
      let fallbackPage = this.buildFallbackPage();
      this.showFallbackPage(fallbackPage);
    }
  }

  async addMovieCards(ghilbliFilms) {
    let films = await ghilbliFilms;

    for (let film of films) {
      let movieCard = new MovieCard(film.image, film.title);
      let infoCard = new InfoCard(film);
      infoCard.classList.add("info-card");
      let pageMain = document.querySelector("#page-main");
      pageMain.appendChild(movieCard);
      pageMain.appendChild(infoCard);
    }
  }

  buildFallbackPage() {
    let fallbackPage = document.createElement("main");
    fallbackPage.setAttribute("id", "fallback-main");

    let fallbackMessage = document.createElement("h1");
    fallbackMessage.setAttribute("id", "fallback-heading");
    fallbackMessage.textContent = "Sorry! Something went Wrong!";

    fallbackPage.appendChild(fallbackMessage);
    return fallbackPage;
  }

  showFallbackPage(fallbackPage) {
    let pageMain = document.querySelector("#page-main");
    pageMain.replaceWith(fallbackPage);
  }
}

class PageHeader {
  constructor() {
    let page = new Page();
    let pageHeader = page.header();
    let textElement = new TextElement();
    let pageTitle = textElement.title("Films of Ghibli", "page-title");
    pageHeader.appendChild(pageTitle);
    this.htmlBody.appendChild(pageHeader);
  }
}

class PageFooter {
  constructor() {
    let page = new Page();
    let textElement = new TextElement();
    let pageFooter = page.footer();

    let contentInfo = textElement.paragraph(
      "Powered by Studio Ghibli and janaipakos",
      "content-info"
    );

    let authorInfo = textElement.paragraph(
      "Designed and Developed by Hojoon Eum",
      "author-info"
    );

    pageFooter.appendChild(contentInfo);
    pageFooter.appendChild(authorInfo);

    this.pageFooter = pageFooter;
  }

  getPageFooter() {
    return this.pageFooter;
  }
}

class PageMain {
  constructor() {
    let pageMain = page.main();
    this.pageMain = pageMain;
    this.htmlBody.appendChild(pageMain);
  }
}

export { PageBody, PageHeader, PageMain, PageFooter };
