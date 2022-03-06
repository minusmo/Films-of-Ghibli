"use strict";
import { GHIBLI_API } from "../constants/ghibliApi.mjs";

function getGhibliFilms() {
  return fetch(GHIBLI_API).then(function (response) {
    let ghibliFilms = response.json();
    let responseProperly = response.ok;
    return { responseProperly, ghibliFilms };
  });
}

export { getGhibliFilms };
