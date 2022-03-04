"use strict";
/*global suite, test, chai*/
let expect = chai.expect;

class Page {
  constructor() {
    this.page = document;
  }

  header() {
    let pageHeader = this.page.createElement("header");
    pageHeader.setAttribute("id", "page-header");
    return pageHeader;
  }

  main() {
    let pageMain = this.page.createElement("main");
    pageMain.setAttribute("id", "page-main");
    return pageMain;
  }

  footer() {
    let pageFooter = this.page.createElement("footer");
    pageFooter.setAttribute("id", "page-footer");
    return pageFooter;
  }
}

class Button {
  themeButton() {
    let themeButton = document.createElement("button");
    themeButton.setAttribute("id", "theme-button");
    return themeButton;
  }

  movieListToggleButton() {
    let movieListToggleButton = document.createElement("button");
    movieListToggleButton.setAttribute("id", "movieListToggle-button");
    return movieListToggleButton;
  }
}

class TextElement {
  title(textContent, id) {
    let pageTitle = document.createElement("h1");
    if (id) pageTitle.setAttribute("id", id);
    if (textContent) pageTitle.textContent = textContent;
    return pageTitle;
  }

  paragraph(textContent, id) {
    let paragraph = document.createElement("p");
    if (id) paragraph.setAttribute("id", id);
    if (textContent) paragraph.textContent = textContent;
    return paragraph;
  }
}

suite("test PageHeader", function () {
  test("PageHeader is header element", function () {
    expect(new Page().header().tagName).equals("HEADER");
  });
  test("PageHeader has pageTitle", function () {
    let page = new Page();
    let textElement = new TextElement();
    let pageHeader = page.header();
    let pageTitle = textElement.title("Films of Ghibli", "page-title");
    pageHeader.appendChild(pageTitle);
    expect(pageHeader.contains(pageTitle)).equals(true);
  });
  test("PageHeader has themeButton", function () {
    let page = new Page();
    let button = new Button();
    let pageHeader = page.header();
    let themeButton = button.themeButton();
    pageHeader.appendChild(themeButton);
    expect(pageHeader.contains(themeButton)).equals(true);
  });
  test("PageHeader has movieListToggleButton", function () {
    let page = new Page();
    let button = new Button();
    let pageHeader = page.header();
    let movieListToggleButton = button.movieListToggleButton();
    pageHeader.appendChild(movieListToggleButton);
    expect(pageHeader.contains(movieListToggleButton)).equals(true);
  });
});

suite("test PageMain", function () {
  test("PageMain is main element", function () {
    expect(new Page().main().tagName).equals("MAIN");
  });
});

suite("test PageFooter", function () {
  test("PageFooter is footer element", function () {
    expect(new Page().footer().tagName).equals("FOOTER");
  });
  test("PageFooter has content info", function () {
    let pageFooter = new Page().footer();
    let textElement = new TextElement();
    let contentInfo = textElement.paragraph(
      "Powered by Studio Ghibli",
      "content-info"
    );
    pageFooter.appendChild(contentInfo);
    expect(pageFooter.contains(contentInfo)).equals(true);
  });
  test("PageFooter has author info", function () {
    let pageFooter = new Page().footer();
    let textElement = new TextElement();
    let authorInfo = textElement.paragraph(
      "Designed and Developed by Hojoon Eum",
      "author-info"
    );
    pageFooter.appendChild(authorInfo);
    expect(pageFooter.contains(authorInfo)).equals(true);
  });
});
