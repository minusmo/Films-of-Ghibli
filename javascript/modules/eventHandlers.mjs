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
}

export { EventHandlers };
