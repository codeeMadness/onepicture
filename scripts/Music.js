export class Music {
    constructor() {
        this.musicFolderPath = 'music/'; // Change this to your music folder path
        this.musicFiles = [
            'track1.mp3',
            'track2.mp3',
            'track3.mp3',
            'track4.mp3',
            'track5.mp3'
        ]; // List all your music files here
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.toggleButton = document.querySelector('.music-toggle');
        this.musicIcon = document.getElementById('music-icon');
        this.isPlaying = false;
        this.currentMusicIndex = 0;
    }

    toggle() {
        this.toggleButton.addEventListener('click', () => {
            if (this.isPlaying) {
                this.backgroundMusic.pause();
                this.musicIcon.classList.add('fa-play');
                this.musicIcon.classList.remove('fa-pause');
            } else {
                this.backgroundMusic.play();
                this.musicIcon.classList.add('fa-pause');
                this.musicIcon.classList.remove('fa-play');
            }
            this.isPlaying = !this.isPlaying;
        });
    }

    play() {
        this.backgroundMusic.src = this.musicFolderPath + this.musicFiles[this.currentMusicIndex];
        this.backgroundMusic.addEventListener('ended', () => {
            this.currentMusicIndex++;
            if (this.currentMusicIndex >= this.musicFiles.length) {
                this.currentMusicIndex = 0;
            }
            this.backgroundMusic.src = this.musicFolderPath + this.musicFiles[this.currentMusicIndex];
            this.backgroundMusic.play();
        });
        this.toggle();
    }
    
}