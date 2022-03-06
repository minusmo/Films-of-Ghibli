"use strict";
import { Page, Button, TextElement } from "./modules/components.mjs";
import { MovieCard, InfoCard } from "./modules/webComponents.mjs";
import { EventHandlers } from "./modules/eventHandlers.mjs";
import { getGhibliFilms } from "./modules/dataFetcher.mjs";

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
      let { ghibliFilms } = await getGhibliFilms();
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
    let button = new Button();
    let themeButton = button.themeButton();
    let pageTitle = textElement.title("Films of Ghibli", "page-title");

    pageHeader.appendChild(pageTitle);
    pageHeader.appendChild(themeButton);
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
    console.log(films);
    for (let film of films) {
      let movieCard = new MovieCard(film.image, film.title);
      let infoCard = new InfoCard(film);
      movieCard.appendChild(infoCard);
      let pageMain = document.querySelector("#page-main");
      pageMain.appendChild(movieCard);
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
