"use strict";
/*global suite, test, chai*/
import { getGhibliFilms } from "../javascript/modules/dataFetcher.mjs";

let expect = chai.expect;
suite("studio ghibli film api test", function () {
  test("whether movie data got properly", async function () {
    let { responseProperly } = await getGhibliFilms();
    expect(responseProperly).to.be.equals(true);
  });
});
