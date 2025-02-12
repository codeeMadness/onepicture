import { Slide } from './Slide.js';

const javaSlides = new Slide("./images/java/", 2);

javaSlides.shuffleArray();
javaSlides.createSlides();
javaSlides.showSlides();

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

prev.addEventListener('click', () => {
    javaSlides.plusSlides(-1);
});

next.addEventListener('click', () => {
    javaSlides.plusSlides(1);
});


const musicFolderPath = 'music/'; // Change this to your music folder path
const musicFiles = [
    'track1.mp3',
    'track2.mp3',
    'track3.mp3',
    'track4.mp3',
    'track5.mp3'
]; // List all your music files here


let currentMusicIndex = 0;
const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.src = musicFolderPath + musicFiles[currentMusicIndex];

backgroundMusic.addEventListener('ended', () => {
    currentMusicIndex++;
    if (currentMusicIndex >= musicFiles.length) {
        currentMusicIndex = 0;
    }
    backgroundMusic.src = musicFolderPath + musicFiles[currentMusicIndex];
    backgroundMusic.play();
});

const toggleButton = document.querySelector('.music-toggle');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;

toggleButton.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicIcon.classList.add('fa-play');
        musicIcon.classList.remove('fa-pause');
    } else {
        backgroundMusic.play();
        musicIcon.classList.add('fa-pause');
        musicIcon.classList.remove('fa-play');
    }
    isPlaying = !isPlaying;
});


const stackList = document.querySelector('.stack-list');

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
stackList.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}