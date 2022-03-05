"use strict";
import { Page, Button, TextElement } from "./modules/components.mjs";
import { MovieCard, InfoCard } from "./modules/webComponents.mjs";
import { EventHandlers } from "./modules/eventHandlers.mjs";
import { getGhibliFilms } from "./modules/dataFetcher.mjs";

class HtmlBody {
  constructor() {
    this.htmlBody = document.body;
    document.addEventListener(
      "scroll",
      new EventHandlers().toggleVisibilityOnScroll
    );
    this.buildPage();
  }

  async buildPage() {
    let page = new Page();
    this.buildHeader(page);
    this.buildMain(page);
    this.buildfooter(page);
    
    try {
      let ghibliFilms = await getGhibliFilms();
    } catch (error) {
      console.warn(error);
      buildFallbackPage();
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
    this.htmlBody.appendChild(page.header());
  }

  buildMain(page) {
    let pageMain = page.main();
    this.htmlBody.appendChild(pageMain);
  }

  buildFooter(page) {
    let textElement = new TextElement();
    let pageFooter = page.footer();

    let contentInfo = textElement.paragraph(
      "Powered by Studio Ghibli",
      "content-info"
    );
    
    let authorInfo = textElement.paragraph(
      "Designed and Developed by Hojoon Eum",
      "author-info"
      );
      
    pageFooter.appendChild(contentInfo);
    pageFooter.appendChild(authorInfo);

    this.htmlBody.appendChild(pageFooter);
  }

}

new HtmlBody();
