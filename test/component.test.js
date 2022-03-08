"use strict";
/*global suite, test, chai*/
import {
  MovieCard,
  InfoCard,
} from "../src/javascript/modules/components/webComponents.mjs";
let expect = chai.expect;

suite("test MovieCard component", function () {
  test("movie-card instance", function () {
    expect(new MovieCard()).is.instanceOf(MovieCard);
  });
});

suite("test InfoCard component", function () {
  test("info-card instance", function () {
    expect(new InfoCard()).is.instanceOf(InfoCard);
  });
});
