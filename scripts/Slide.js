export class Slide {
    constructor(path, imageCount) {
        this.folderPath = path;
        this.slideIndex = 0;
        this.images = [];
        for (let i = 1; i <= imageCount; i++) {
            this.images.push(this.folderPath + 'image' + i + '.png');
        }
        this.slideshowContainer = document.querySelector('.slideshow-container');
        this.createSlides();

        this.prev = document.querySelector('.prev');
        this.next = document.querySelector('.next');

        this.prev.addEventListener('click', () => {
            this.plusSlides(-1);
        });

        this.next.addEventListener('click', () => {
            this.plusSlides(1);
        });
    }

    addSlide(slide) {
        this.images = this.images.concat(slide.getImages());
    }

    getImages() {
        return this.images;
    }

    shuffleArray() {
        for (let i = this.images - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    createSlides() {
        this.images.forEach(src => {
            let slideDiv = document.createElement('div');
            slideDiv.className = 'slide fade';
            let img = document.createElement('img');
            img.src = src;
            img.style.width = '100%';
            slideDiv.appendChild(img);
            this.slideshowContainer.appendChild(slideDiv);
        });
    }

    showSlides() {
        let slides = document.getElementsByClassName("slide");

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        this.slideIndex++;
        if (this.slideIndex > slides.length || this.slideIndex-1 < 0) {this.slideIndex = 1}    
        slides[this.slideIndex - 1].style.display = "block";
        setTimeout(this.showSlides.bind(this), 10000); // Change image every 10 seconds
    }
 
    plusSlides(n) {
        this.slideIndex += n - 1;
        this.showSlides();
    }
    
}