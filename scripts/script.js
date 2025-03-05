import { database_arr, design_pattern_arr, hibernate, java_arr, mixed, spring_arr, system_design_arr } from './data.js';
import { Init } from './Init.js';
import { Modal } from './Modal.js';
import { Music } from './Music.js';
import { ViewMode } from './ViewMode.js';


const init = new Init();
init.addSlide(mixed(), 'mixed-topics', true);
init.addSlide(java_arr, 'java', false);
init.addSlide(system_design_arr, 'system-designs', false);
init.addSlide(database_arr, 'database', false);
init.addSlide(spring_arr, 'spring', false);
init.addSlide(hibernate, 'hibernate', false);
init.addSlide(design_pattern_arr, 'design-patterns', false);

const music = new Music();
music.play();

const modal = new Modal("myModal", document.querySelector('.stack-list'));
modal.action();

const infoModal = new Modal("myInfo", document.querySelector('.info'));
infoModal.action();

const feedbackModal = new Modal("myFeedback", document.querySelector('.feedback'));
feedbackModal.action();

const viewMode = new ViewMode();
viewMode.toggleViewMode();

//copyright
document.getElementById('currentYear').textContent = new Date().getFullYear();