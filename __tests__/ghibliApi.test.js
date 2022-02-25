let { getGhibliFilms }  = require("../javascript/modules/dataFetcher");

test("getting right json data from ghibliApi", async () => {
  const ghibliFilms = await getGhibliFilms();
  expect(ghibliFilms).toBe("");
});

test("getting wrong json data from ghibliApi", async () => {
  expect.assertions(1);
  try {
    await getGhibliFilms();
  } catch (error) {
    expect(error).toMatch("error");
  }
});
