"use strict";
/*global suite, test, chai*/
import { MovieCard, InfoCard } from "../javascript/modules/webComponents.mjs";
let expect = chai.expect;

suite("test movieCard component", function () {
  test("movie-card instance", function () {
    expect(new MovieCard()).is.instanceOf(MovieCard);
  });
});

suite("test infoCard component", function () {
  test("info-card instance", function () {
    expect(new InfoCard()).is.instanceOf(InfoCard);
  });
});
