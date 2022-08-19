import { toggleBar } from "./toggle.js";

toggleBar();

const sliders = document.querySelectorAll(".slider");
let counter = 0;

setInterval(() => {
  sliders.forEach((slider, index) => {
    slider.style.left = `${index * 100}%`;
  });

  console.log(counter);

  sliders.forEach((slider) => {
    slider.style.transform = `translateX(-${counter * 100}%)`;
    if (counter === sliders.length) {
      counter = -1;
    }
  });
  counter++;
}, 2000);
