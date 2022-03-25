"use strict";
import { GHIBLI_API } from "../constants/ghibliApi.mjs";

async function getMainData() {
  try {
    let { ghibliFilms } = await fetch(GHIBLI_API).then(
      function (response) {
        let ghibliFilms = response.json();
        let responseProperly = response.ok;
        return { ghibliFilms, responseProperly };
      }
    );

    return { ghibliFilms };
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export { getMainData };
