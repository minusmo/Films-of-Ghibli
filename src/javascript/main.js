"use strict";
import {
  PageBody,
  PageHeader,
  PageMain,
  PageFooter,
} from "./modules/components/pageComponents.mjs";
import { getMainData } from "./modules/asyncFunctions/dataFetcher.mjs";

async function main() {
  let ghibliFilms = await getMainData();
  renderPage(ghibliFilms);
}

function renderPage(mainData) {
  let pageBody = new PageBody();
  let pageHeader = new PageHeader().getPageHeader();
  let pageMain = new PageMain(mainData).getPageMain();
  let pageFooter = new PageFooter().getPageFooter();
  pageBody.addPageHeader(pageHeader);
  pageBody.addPageMain(pageMain);
  pageBody.addPageFooter(pageFooter);
}

main();
