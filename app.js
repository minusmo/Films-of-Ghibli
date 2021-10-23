const root = document.getElementById("root");

const makeHeroFrame = (_) => {
  const heroFrame = document.createElement("div");
  heroFrame.classList.add("heroFrame");
  return heroFrame;
};

function makeFilmFrame() {
  let filmFrame = document.createElement("div");
  filmFrame.className = "filmFrame";
  return filmFrame;
}

const hideModal = (e) => {
  e.preventDefault();
  const modal = e.target.parentElement.parentElement;
  modal.classList.remove("showing");
  modal.style.animation = "fadeOut 500ms forwards";
};

const showModal = (e) => {
  e.preventDefault();
  const modal = e.target.nextElementSibling;
  modal.classList.add("showing");
  modal.style.animation = "fadeIn 500ms forwards";
};

function makeList(film) {
  let titleList = document.createElement("ul");
  titleList.classList.add("titleList");

  let modal = document.createElement("div");
  modal.classList.add("infoModal");

  let closeButton = document.createElement("button");
  let closeImg = document.createElement("img");
  closeImg.src = "./images/cross.svg";

  closeButton.classList.add("closeButton");
  closeImg.addEventListener("click", hideModal);
  closeButton.appendChild(closeImg);
  modal.appendChild(closeButton);

  let infoList = document.createElement("ul");
  infoList.classList.add("infoList");

  for (let [key, value] of Object.entries(film)) {
    if (
      key === "id" ||
      key === "people" ||
      key === "image" ||
      key === "movie_banner" ||
      key === "species" ||
      key === "locations" ||
      key === "vehicles" ||
      key === "url"
    ) {
      continue;
    }

    let listHead = document.createElement("li");
    listHead.classList.add("listHead");
    let listContent = document.createElement("li");
    listContent.classList.add("listContent");
    const uppercaseKey = key.toUpperCase();
    listHead.textContent = `${uppercaseKey}:`;

    if (key === "title" || key === "original_title") {
      listContent.textContent = `${value}`;

      titleList.appendChild(listHead);
      titleList.appendChild(listContent);
    } else {
      if (key === "description") {
        listHead.className = "description";
        let slicedDescription = value.slice(0, 150);
        slicedDescription += "...";
        listContent.textContent = slicedDescription;
      } else {
        listContent.textContent = `${value}`;
      }

      infoList.appendChild(listHead);
      infoList.appendChild(listContent);
    }
  }

  let moreInfo = document.createElement("li");
  moreInfo.classList.add("moreInfo");
  moreInfo.textContent = "more info";
  moreInfo.addEventListener("click", showModal);

  titleList.appendChild(moreInfo);
  titleList.appendChild(modal);
  modal.appendChild(infoList);

  return titleList;
}

function makeCatalog() {
  const catalog = document.createElement("div");
  catalog.className = "catalog";
  return catalog;
}

fetch("https://ghibliapi.herokuapp.com/films")
  .then((res) => {
    return res.json();
  })
  .then((filmdata) => {
    filmdata.forEach((film, index) => {
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
          let heroFrame = makeHeroFrame();
          heroFrame.id = index;

          let imgFrame = document.createElement("div");
          let img = document.createElement("img");
          img.setAttribute("id", `${film.id}`);

          let titleList = makeList(film);
          let catalog = makeCatalog();

          imgFrame.classList.add("filmFrame");
          imgFrame.appendChild(img);
          catalog.appendChild(titleList);
          heroFrame.appendChild(catalog);
          heroFrame.appendChild(imgFrame);

          img.src = `${film.image}`;

          root.appendChild(heroFrame);
      }
      return root;
    });
  })
  .catch((err) => console.warn(err));

const onScroll = (e) => {
  const scrollTop = document.scrollingElement.scrollTop;
  const pageBottomPos = scrollTop + window.innerHeight;
  const frames = document.getElementsByClassName("heroFrame");

  for (i = 0; i < frames.length; i++) {
    const aFrame = frames[i];
    const topPos = aFrame.offsetTop;

    if (topPos < pageBottomPos) {
      aFrame.classList.add("visible");
      aFrame.firstElementChild.classList.add("visible");
    } else {
      aFrame.classList.remove("visible");
      aFrame.firstElementChild.classList.remove("visible");
    }
  }
};

document.addEventListener("scroll", onScroll);
