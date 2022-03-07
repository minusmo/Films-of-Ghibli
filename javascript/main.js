"use strict";
import { Page, TextElement } from "./modules/components.mjs";
import { MovieCard, InfoCard } from "./modules/webComponents.mjs";
import { EventHandlers } from "./modules/eventHandlers.mjs";
import { fetchGhibliFilms } from "./modules/dataFetcher.mjs";

class HtmlBody {
  constructor() {
    this.htmlBody = document.body;
    this.addScrollEvent();
    this.buildPage();
  }

  addScrollEvent() {
    document.addEventListener(
      "scroll",
      new EventHandlers().toggleVisibilityOnScroll
    );
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

  buildHeader(page) {
    let pageHeader = page.header();
    let textElement = new TextElement();
    let pageTitle = textElement.title("Films of Ghibli", "page-title");
    pageHeader.appendChild(pageTitle);
    this.pageHeader = pageHeader;
    this.htmlBody.appendChild(pageHeader);
  }

  buildMain(page) {
    let pageMain = page.main();
    this.pageMain = pageMain;
    this.htmlBody.appendChild(pageMain);
  }

  buildFooter(page) {
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
    this.htmlBody.appendChild(pageFooter);
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

new HtmlBody();
