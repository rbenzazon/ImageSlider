// this sheet is only setting layout around the slider, not the slider itself
import "./style.css";
import imageSlider from "./image-slider";

/**
 * here is the entry point of the application
 * the component requires an element, a number of images and their urls
 * to be more convenient supporting different url schemas,
 * they are given as a single function
 *
 * Here the images are taken from a kind of "lorem ipsum" photo service
 * the image size is varying to demonstrate that the slider takes any size and ratio
 */

const killSlider = imageSlider(document.querySelector<HTMLDivElement>("#app"), {
  imageNb: 5,
  imageUrl: (num: number) => {
    const width = 1600 + Math.round(Math.random() * 500 - 250);
    const height = 1100 + Math.round(Math.random() * 500 - 250);
    return `https://picsum.photos/id/${num}/${width}/${height}`;
  },
});

// this is just to prevent a lint error but in a real world usage, the return value would be either ignored or used
killSlider;
