"use strict";
import { GHIBLI_API } from "../constants/ghibliApi.mjs";

function fetchGhibliFilms() {
  return fetch(GHIBLI_API).then(function (response) {
    let ghibliFilms = response.json();
    let responseProperly = response.ok;
    return { responseProperly, ghibliFilms };
  });
}

export { fetchGhibliFilms };
