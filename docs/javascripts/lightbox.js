(function () {
  const screenshotSelector = "img.saber-screenshot";
  let lightbox = null;
  let lightboxImage = null;
  let lightboxCaption = null;
  let closeButton = null;

  function ensureLightbox() {
    if (lightbox) {
      return;
    }

    lightbox = document.createElement("div");
    lightbox.className = "saber-lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("role", "dialog");

    const content = document.createElement("div");
    content.className = "saber-lightbox__content";

    closeButton = document.createElement("button");
    closeButton.className = "saber-lightbox__close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close image preview");
    closeButton.textContent = "Close";

    lightboxImage = document.createElement("img");
    lightboxImage.className = "saber-lightbox__image";
    lightboxImage.alt = "";

    lightboxCaption = document.createElement("div");
    lightboxCaption.className = "saber-lightbox__caption";

    content.appendChild(closeButton);
    content.appendChild(lightboxImage);
    content.appendChild(lightboxCaption);
    lightbox.appendChild(content);
    document.body.appendChild(lightbox);
  }

  function markScreenshots(root) {
    root.querySelectorAll(screenshotSelector).forEach((image) => {
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("title", "Click to enlarge");
    });
  }

  function openLightbox(image) {
    ensureLightbox();

    const alt = image.getAttribute("alt") || "Screenshot";
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = alt;
    lightboxCaption.textContent = alt;

    lightbox.hidden = false;
    document.body.classList.add("saber-lightbox-open");
    closeButton.focus({ preventScroll: true });
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) {
      return;
    }

    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    document.body.classList.remove("saber-lightbox-open");
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const screenshot = target.closest(screenshotSelector);
    if (screenshot) {
      event.preventDefault();
      openLightbox(screenshot);
      return;
    }

    if (target.matches(".saber-lightbox") || target.matches(".saber-lightbox__close")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (!(target instanceof Element) || !target.matches(screenshotSelector)) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(target);
    }
  });

  if (window.document$) {
    window.document$.subscribe(() => markScreenshots(document));
  } else {
    document.addEventListener("DOMContentLoaded", () => markScreenshots(document));
  }
})();
