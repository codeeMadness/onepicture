const folderPath = 'images/'; // Change this to your folder path
const imageCount = 5; // Change this to the total number of images in your folder

const musicFolderPath = 'music/'; // Change this to your music folder path
const musicFiles = [
    'track1.mp3',
    'track2.mp3',
    'track3.mp3',
    'track4.mp3',
    'track5.mp3'
]; // List all your music files here

let slideIndex = 0;
let images = [];

for (let i = 1; i <= imageCount; i++) {
    images.push(folderPath + 'image' + i + '.png');
}

shuffleArray(images);
createSlides();

showSlides();

let currentMusicIndex = 0;
const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.src = musicFolderPath + musicFiles[currentMusicIndex];
backgroundMusic.play();

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
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
    } else {
        backgroundMusic.play();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
    }
    isPlaying = !isPlaying;
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createSlides() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    images.forEach(src => {
        let slideDiv = document.createElement('div');
        slideDiv.className = 'slide fade';
        let img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        slideDiv.appendChild(img);
        slideshowContainer.appendChild(slideDiv);
    });
}

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 10000); // Change image every 10 seconds
}

function plusSlides(n) {
    slideIndex += n - 1;
    showSlides();
}