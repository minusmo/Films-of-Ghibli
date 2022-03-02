/*global*/
"use strict";
// import {suite, test, it} from "../node_modules/mocha/mocha-es2018.js";
// import * as chai from "../node_modules/chai/index.js";
// import * as chaiHttp from "../node_modules/chai-http/index.js";
// import { GHIBLI_API } from "../javascript/constants/ghibliApi.mjs";
import { getGhibliFilms } from "../javascript/modules/dataFetcher.mjs";

// chai.use(chaiHttp);
let expect = chai.expect;
suite("studio ghibli film api test", function () {
  test("whether movie data got properly", async function () {
    let { responseProperly } = await getGhibliFilms();
    expect(responseProperly).to.be.equals(true);
  });
});
