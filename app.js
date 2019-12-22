const root = document.getElementById("root");

// let filmData = {
//   filmdata: []
// };

// const getData = async () => {
//   const films = await axios.get("https://ghibliapi.herokuapp.com/films");
//   console.log(films.data);

//   filmData.filmdata = films.data;
// };

// getData();

// console.log(filmData);

function makeFrame() {
  let frame = document.createElement("div");

  frame.className = "frame";

  return frame;
}

function makeList(film) {
  let unList = document.createElement("ul");

  const {
    id,
    title,
    description,
    director,
    producer,
    release_date,
    rt_score
  } = film;

  for (let [key, value] of Object.entries(film)) {
    if (key === "id") {
      continue;
    }
    if (key === "people") {
      break;
    }
    let list = document.createElement("li");
    if (key === "description") {
      list.className = "description";
    }
    list.textContent = `${key}: ${value}`;
    unList.appendChild(list);
  }

  return unList;
}

// filmData.filmdata.forEach(film => {
//   let filmFrame = makeFrame();
//   let filmList = makeList(film);
//   filmFrame.appendChild(filmList);
//   root.appendChild(filmFrame);
// });

fetch("https://ghibliapi.herokuapp.com/films")
  .then(res => {
    return res.json();
  })
  .then(filmdata => {
    console.log(filmdata);
    filmdata.forEach(film => {
      //   if (
      //     film.title ===
      //     ("Grave of the Fireflies" ||
      //       "Only Yesterday" ||
      //       "Pom Poko" ||
      //       "My Neighbors the Yamadas")
      //   ) {
      //     return;
      //   }
      switch (film.title) {
        case "Grave of the Fireflies":
          break;
        case "Only Yesterday":
          break;
        case "Pom Poko":
          break;
        case "My Neighbors the Yamadas":
          break;
        default:
          let filmFrame = makeFrame();
          filmFrame.setAttribute("id", `${film.id}`);
          let filmList = makeList(film);
          filmFrame.appendChild(filmList);
          if (
            film.title === "Whisper of the Heart" ||
            film.title === "Princess Mononoke"
          ) {
            filmFrame.style.backgroundImage = `linear-gradient(to right bottom, #d9eb34, #e2eb34, transparent 50%), url("images/${film.title}.jpeg")`;
          } else {
            filmFrame.style.backgroundImage = `linear-gradient(to right bottom, #d9eb34, #e2eb34, transparent 50%), url("images/${film.title}.jpg")`;
          }
          root.appendChild(filmFrame);
      }
      return root;
    });
  });

const frames = document.getElementsByClassName("frame");
