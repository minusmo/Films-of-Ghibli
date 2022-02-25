/*global*/
"use strict";
import assert from "assert";
import { suite, test } from "mocha";
import { getGhibliFilms } from "../javascript/modules/dataFetcher.mjs";

suite("studio ghibli film api test", function () {
  test("whether movie data got properly", async function () {
    let { responseProperly } = await getGhibliFilms();
    assert.equal(true, responseProperly);
  });
});
