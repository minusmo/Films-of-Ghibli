/*global*/
"use strict";
import {suite, test, it} from "../node_modules/mocha/mocha-es2018.js";
import * as chai from "../node_modules/chai/index.js";
import * as chaiHttp from "../node_modules/chai-http/index.js";
import { GHIBLI_API } from "../javascript/constants/ghibliApi.mjs";

chai.use(chaiHttp);
let expect = chai.expect;
suite("studio ghibli film api test", function () {
  test("whether movie data got properly", async function () {
    it("gets movie data", function (done) {
      chai
        .request(GHIBLI_API)
        .get("/")
        .end(function (error, response) {
          expect(response).to.have.status(200);
          done();
        });
    });
  });
});
