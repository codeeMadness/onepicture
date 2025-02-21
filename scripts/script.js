import { java_arr, mixed, system_design_arr } from './data.js';
import { Modal } from './Modal.js';
import { Music } from './Music.js';
import { Slide } from './Slide.js';

//default Slide
const mixedTopic = new Slide(mixed());
mixedTopic.createSlides();
mixedTopic.showSlides();
const pickMixed = document.getElementById("mixed-topics");
pickMixed.addEventListener('click', () => {
    mixedTopic.createSlides();
    mixedTopic.showSlides();
});

const javaTopic = new Slide(java_arr);
const pickJava = document.getElementById("java");
pickJava.addEventListener('click', () => {
    javaTopic.createSlides();
    javaTopic.showSlides();
});

const systemTopic = new Slide(system_design_arr);
const pickSystemDesign = document.getElementById("system-designs");
pickSystemDesign.addEventListener('click', () => {
    systemTopic.createSlides();
    systemTopic.showSlides();
});


const music = new Music();
music.play();

const modal = new Modal();
modal.action();

//copyright
document.getElementById('currentYear').textContent = new Date().getFullYear();