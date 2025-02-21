export class Slide {
    constructor(imageArr) {
        this.folderPath = './images/';
        this.slideIndex = 0;
        this.imageArr = imageArr;
        this.images = [];
        for (let i = 0; i < this.imageArr.length; i++) {
            this.images.push(this.folderPath + this.imageArr[i] + '.png');
        }
        this.init();
    }

    init() {
        this.slideshowContainer = document.querySelector('.slideshow-container');

        this.prev = document.querySelector('.prev');
        this.next = document.querySelector('.next');

        this.prev.addEventListener('click', () => {
            this.plusSlides(-1);
        });

        this.next.addEventListener('click', () => {
            this.plusSlides(1);
        });
    }

    reset() {
        this.slideshowContainer.innerHTML = "";
        this.slideIndex = 0;
    }

    createSlides() {
        this.reset();
        this.images.forEach(src => {
            let slideDiv = document.createElement('div');
            slideDiv.className = 'slide fade';
            let img = document.createElement('img');
            img.className = 'img-slide';
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
        // setTimeout(this.showSlides.bind(this), 10000); // Change image every 10 seconds
    }
 
    plusSlides(n) {
        this.slideIndex += n - 1;
        this.showSlides();
    }
    
}