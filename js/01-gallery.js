import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "IMG") {
    return;
  }
  const imageUrl = target.dataset.source;
  const instance = basicLightbox.create(
    `
    <div class="modal">
      <img src="">
    </div>
  `,
    {
      onShow: (instance) => {
        const imgEl = instance.element().querySelector("img");
        imgEl.src = imageUrl;
      },
    }
  );
  instance.show();

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      instance.close();
    }
  });

  instance.element().addEventListener("click", (event) => {
    if (event.target.nodeName == "IMG") {
      instance.close();
    }
  });
});

const galleryItemsMarkup = galleryItems
  .map(
    (item) => `
  <div class="gallery__item">
    <a class="gallery__link" href="${item.original}">
      <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}">
    </a>
  </div>
`
  )
  .join("");

gallery.insertAdjacentHTML("beforeend", galleryItemsMarkup);
