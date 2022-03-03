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

class Title {
  title() {
    let pageTitle = document.createElement("h1");
    pageTitle.setAttribute("id", "page-title");
    return pageTitle;
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

suite("test PageHeader", function () {
  test("PageHeader is header element", function () {
    expect(new Page().header().tagName).equals("HEADER");
  });
  test("PageHeader has pageTitle", function () {
    let page = new Page();
    let title = new Title();
    let pageHeader = page.header();
    let pageTitle = title.title();
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
});
