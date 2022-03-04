"use strict";

class EventHandlers {
  toggleVisibilityOnScroll() {
    let scrollTop = document.scrollingElement.scrollTop;
    let pageBottomPosition = scrollTop + window.innerHeight;
    let frames = document.getElementsByClassName("heroFrame");

    for (let i = 0; i < frames.length; i++) {
      let aFrame = frames[i];
      let topPos = aFrame.offsetTop;

      if (topPos < pageBottomPosition) {
        aFrame.classList.add("visible");
        aFrame.firstElementChild.classList.add("visible");
      } else {
        aFrame.classList.remove("visible");
        aFrame.firstElementChild.classList.remove("visible");
      }
    }
  }

  hideModalOnClick(event) {
    let modal = event.target.parentElement.parentElement;
    modal.classList.remove("showing");
    modal.style.animation = "fadeOut 500ms forwards";
    event.preventDefault();
  }

  showModalOnClick(event) {
    let modal = event.target.nextElementSibling;
    modal.classList.add("showing");
    modal.style.animation = "fadeIn 500ms forwards";
    event.preventDefault();
  }
}

export { EventHandlers };
