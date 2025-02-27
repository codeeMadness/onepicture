import { Slide } from "./Slide.js";
import { Thumbnail } from "./Thumbnail.js";

export class Init {
    constructor() {
        this.slides = [];
        this.thumbnails = [];

    }

    addSlide(imgArr, id, isDefault) {
        const slide = new Slide(imgArr);
        this.slides.push(slide);

        const thumbnail = new Thumbnail(imgArr);
        this.thumbnails.push(thumbnail);

        if(isDefault) {
            slide.createSlides();
            slide.showSlides();
            thumbnail.generate();
        }

        const pickSlide = document.getElementById(id);
        pickSlide.addEventListener('click', () => {
            slide.createSlides();
            slide.showSlides();
            thumbnail.generate();
        })
    }
}