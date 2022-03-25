"use strict";
import { Page, TextElement } from "./components.mjs";
import { MovieCard, InfoCard } from "./webComponents.mjs";

class PageBody {
  constructor() {
    this.htmlBody = document.body;
  }

  addPageHeader(pageHeader) {
    this.htmlBody.appendChild(pageHeader);
  }

  addPageMain(pageMain) {
    this.htmlBody.appendChild(pageMain);
  }

  addPageFooter(pageFooter) {
    this.htmlBody.appendChild(pageFooter);
  }
}

class PageHeader {
  constructor() {
    let pageHeader = Page.header();
    let pageTitle = TextElement.title("Films of Ghibli", "page-title");
    pageHeader.appendChild(pageTitle);
    this.pageHeader = pageHeader;
  }

  getPageHeader() {
    return this.pageHeader;
  }
}

class PageFooter {
  constructor() {
    let pageFooter = Page.footer();

    let contentInfo = TextElement.paragraph(
      "Powered by Studio Ghibli and janaipakos",
      "content-info"
    );

    let authorInfo = TextElement.paragraph(
      "Designed and developed by Hojoon Eum",
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
  constructor(mainData) {
    let pageMain = Page.main("page-main");
    this.pageMain = pageMain;
    this.buildMain(mainData);
  }

  async buildMain(mainData) {
    if (mainData) {
      await this.addMovieCards(mainData);
    } else {
      this.buildFallbackMain();
    }
  }

  getPageMain() {
    return this.pageMain;
  }

  async addMovieCards(ghibliFilms) {
    let films = await ghibliFilms;
    for (let film of films) {
      let movieCard = new MovieCard(film.image, film.title);
      let infoCard = new InfoCard(film);
      this.pageMain.appendChild(movieCard);
      this.pageMain.appendChild(infoCard);
    }
  }

  buildFallbackMain() {
    this.pageMain.setAttribute("id", "fallback-main");
    let fallbackMessage = TextElement.title(
      "Sorry! Something went Wrong!",
      "fallback-heading"
    );
    this.pageMain.appendChild(fallbackMessage);
  }
}

export { PageBody, PageHeader, PageMain, PageFooter };
