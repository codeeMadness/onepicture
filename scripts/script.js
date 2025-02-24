import { java_arr, mixed, system_design_arr } from './data.js';
import { Modal } from './Modal.js';
import { Music } from './Music.js';
import { Slide } from './Slide.js';
import { Thumbnail } from './Thumbnail.js';
import { ViewMode } from './ViewMode.js';

//default Slide
const mixedTopic = new Slide(mixed());
mixedTopic.createSlides();
mixedTopic.showSlides();
const mixedThumbnail = new Thumbnail(mixed());
mixedThumbnail.generate();
const pickMixed = document.getElementById("mixed-topics");
pickMixed.addEventListener('click', () => {
    mixedTopic.createSlides();
    mixedTopic.showSlides();
    mixedThumbnail.generate();
});

const javaTopic = new Slide(java_arr);
const javaThumbnail = new Thumbnail(java_arr);
const pickJava = document.getElementById("java");
pickJava.addEventListener('click', () => {
    javaTopic.createSlides();
    javaTopic.showSlides();
    javaThumbnail.generate();
});

const systemTopic = new Slide(system_design_arr);
const systemThumbnail = new Thumbnail(system_design_arr);
const pickSystemDesign = document.getElementById("system-designs");
pickSystemDesign.addEventListener('click', () => {
    systemTopic.createSlides();
    systemTopic.showSlides();
    systemThumbnail.generate();
});


const music = new Music();
music.play();

const modal = new Modal("myModal", document.querySelector('.stack-list'));
modal.action();

const infoModal = new Modal("myInfo", document.querySelector('.info'));
infoModal.action();

const viewMode = new ViewMode();
viewMode.toggleViewMode();

//copyright
document.getElementById('currentYear').textContent = new Date().getFullYear();