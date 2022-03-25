"use strict";
import {
  PageBody,
  PageHeader,
  PageMain,
  PageFooter,
} from "./modules/components/pageComponents.mjs";

function main() {
  let dataMain = getDataMain();
  renderPage(dataMain);
}

function renderPage(dataMain) {
  let pageBody = new PageBody();
  let pageHeader = new PageHeader();
  let pageMain = new PageMain(dataMain);
  let pageFooter = new PageFooter();
  pageBody.addPageHeader(pageHeader);
  pageBody.addPageMain(pageMain);
  pageBody.addPageFooter(pageFooter);
}

main();
