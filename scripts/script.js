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

//swipe
document.addEventListener('DOMContentLoaded', (event) => {
  const swipeArea = document.querySelector('.slideshow-container');

  let startX;
  let startY;
  let distX;
  let distY;
  const threshold = 100; // Minimum distance for a swipe
  const restraint = 50;  // Maximum distance for vertical movement
  const allowedTime = 300; // Maximum time allowed to take the swipe action
  let startTime;

  swipeArea.addEventListener('touchstart', function(e) {
      const touchObj = e.changedTouches[0];
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime(); // Record time when the finger first makes contact with the surface
      e.preventDefault();
  }, false);

  swipeArea.addEventListener('touchmove', function(e) {
      e.preventDefault(); // Prevent scrolling when inside swipeArea
  }, false);

  swipeArea.addEventListener('touchend', function(e) {
      const touchObj = e.changedTouches[0];
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      const elapsedTime = new Date().getTime() - startTime; // Get time elapsed
      if (elapsedTime <= allowedTime) { // First condition for a swipe met
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // Horizontal swipe
              if (distX > 0) {
                  alert('Swipe Right');
              } else {
                  alert('Swipe Left');
              }
          }
      }
      e.preventDefault();
  }, false);
});
