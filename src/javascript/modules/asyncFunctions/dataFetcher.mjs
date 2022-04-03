"use strict";
import { GHIBLI_API } from "../constants/ghibliApi.mjs";

async function getMainData() {
  try {
    let ghiblifilms = await fetch(GHIBLI_API);
    return ghiblifilms.json();
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export { getMainData };
