"use strict";
let expect = chai.expect;

class Page {
  constructor(header, main, footer) {
    this.header = header ? header : null;
    this.main = main ? main : null;
    this.footer = footer ? footer : null;
  }

  addHeader() {}

  addMain() {}

  addFooter() {}
}

class Header {
  constructor() {}
}

suite("test Page instance property", function () {
  test("Page exists", function () {
    expect(new Page()).is.not.undefined;
  });
  test("Page instance has header", function () {
    expect(new Page("header")).to.has.property("header");
  });
  test("Page instance has main", function () {
    expect(new Page("header", "main")).to.has.property("main");
  });
  test("Page instance has footer", function () {
    expect(new Page("header", "main", "footer")).to.has.property("footer");
  });
});

suite("test Header instance", function () {
  test("Header exists", function () {
    expect(new Header()).is.not.undefined;
  });
  test("Header is instance of htmlElement", function () {
    expect(new Header()).is.instanceOf(new HTMLElement());
  });
});
