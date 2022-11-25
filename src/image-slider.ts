import { SliderContent } from "./types";
import { easeInOutQuad } from "./easing";

export default async function imageSlider(
  element: HTMLDivElement | null,
  content: SliderContent
): Promise<() => void> {
  if (!element) return () => console.log("no element");

  // component variables

  let slider: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  let width = element.clientWidth;
  let height = element.clientHeight;
  let currentImage = 0;
  let isDragging = false;
  let startTime = 0;
  let direction = 0;
  let startX = 0;
  let shiftX = 0;
  let start = 0;
  let change = 0;

  // component methods

  const createCanvas = (): void => {
    slider = document.createElement("canvas");
    slider.id = "slider-canvas";
    slider.width = width;
    slider.height = height;
    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseUp);
    slider.addEventListener("mouseup", onMouseUp);
    element?.appendChild(slider);
    const tmpContext = slider.getContext("2d");
    if (!tmpContext) {
      throw new Error("No context");
    }
    context = tmpContext;
  };

  const loadImages = async (): Promise<HTMLImageElement[]> => {
    return (
      await Promise.allSettled(
        Array.from({ length: imageNb }, (_, i) => {
          const img = new Image();
          return new Promise((resolve, reject) => {
            img.src = imageUrl(i + 1);
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error("Image not loaded"));
          });
        })
      )
    )
      .filter(({ status }) => status === "fulfilled")
      .map((p) => (p as PromiseFulfilledResult<HTMLImageElement>).value);
  };

  const drawImage = (currentImage: number, shiftX: number) => {
    // here is the image centered on the canvas
    const image = images[currentImage];
    const ratio = Math.min(width / image.width, height / image.height);
    const x = shiftX + (width - image.width * ratio) / 2;
    const y = (height - image.height * ratio) / 2;

    context.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      x,
      y,
      image.width * ratio,
      image.height * ratio
    );
  };

  // draws either the previous and current or the current and next
  const drawImages = () => {
    clearCanvas();
    if (currentImage > 0) {
      drawImage(currentImage - 1, shiftX - width);
    }
    drawImage(currentImage, shiftX);
    if (currentImage < images.length - 1) {
      drawImage(currentImage + 1, shiftX + width);
    }
  };

  // this start an animation from where the drag and to the nearest image
  const finishTransition = () => {
    start = shiftX;
    change = width * -1 * direction - shiftX;
    startTime = Date.now();
    requestAnimationFrame(onFrame);
  };

  // this is the animation frame
  const onFrame = () => {
    const duration = 300;
    const time = Date.now() - startTime;
    shiftX = easeInOutQuad(time, start, change, duration);
    drawImages();
    if (time < duration) {
      requestAnimationFrame(onFrame);
    } else {
      currentImage = (currentImage + direction + imageNb) % imageNb;
      shiftX = 0;
      drawImages();
    }
  };

  // Events handlers

  const onMouseDown = (e: MouseEvent) => {
    if (isDragging) return;
    isDragging = true;
    startX = e.pageX;
    slider.addEventListener("mousemove", onMouseMove);
    element.classList.add("grabbing");
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    shiftX = e.pageX - startX;
    direction = (shiftX / Math.abs(shiftX)) * -1;
    // this prevents the slider to go beyond the first and last images
    if (currentImage === 0 && direction === -1) {
      shiftX = 0;
    } else if (currentImage === images.length - 1 && direction === 1) {
      shiftX = 0;
    }
    drawImages();
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    isDragging = false;
    // do nothing if the drag it smaller than 10px
    if (Math.abs(shiftX) < 10) {
      shiftX = 0;
      drawImages();
      return;
    }
    finishTransition();
    slider.removeEventListener("mousemove", onMouseMove);
    element.classList.remove("grabbing");
  };

  const onResize = () => {
    width = slider.width = element.clientWidth;
    height = slider.height = element.clientHeight;
    drawImages();
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, slider.width, slider.height);
  };

  function kill() {
    slider.removeEventListener("mousedown", onMouseDown);
    slider.removeEventListener("mouseleave", onMouseUp);
    slider.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("resize", onResize);
  }

  // component init

  const { imageNb, imageUrl } = content;
  createCanvas();

  // this component is simplisticly loading all the images before rending anything
  const images = await loadImages();

  // drawing initial first image
  drawImage(currentImage, 0);

  window.addEventListener("resize", onResize);

  return kill;
}
