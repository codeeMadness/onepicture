import { Modal } from './Modal.js';
import { Music } from './Music.js';
import { Slide } from './Slide.js';

const javaSlides = new Slide("./images/java/", 3);
javaSlides.createSlides();
javaSlides.showSlides();

const systemSlides = new Slide("./images/systemdesign/", 2);

const pickJava = document.getElementById("java");
pickJava.addEventListener('click', () => {
    javaSlides.createSlides();
    javaSlides.showSlides();
});

const pickDesignPatterns = document.getElementById("system-designs");
pickDesignPatterns.addEventListener('click', () => {
    systemSlides.createSlides();
    systemSlides.showSlides();
});

const music = new Music();
music.play();

const modal = new Modal();
modal.action();

//copyright
document.getElementById('currentYear').textContent = new Date().getFullYear();