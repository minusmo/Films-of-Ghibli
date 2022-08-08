"use strict";
/*global suite, test, chai*/
import { NOTION_KEY, NOTION_DB_ID } from "../src/javascript/modules/Models/credentials/notionDB.mjs";
import { DataRetriever } from "../src/javascript/modules/Services/DataRetriever.mjs";

let expect = chai.expect;
suite("test Notion api", function () {
  test("DataRetriever instance", function() {
    const dataRetreiver = new DataRetriever();
  });
  test("whether movie data got properly", async function () {
    let { responseProperly } = await getGhibliFilms();
    expect(responseProperly).to.be.equals(true);
  });
});
