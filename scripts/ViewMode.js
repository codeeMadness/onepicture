export class ViewMode {
    constructor() {
        this.isThumbNail = true;
        this.viewBtn = document.querySelector('.view-mode');
        this.viewIcon = document.getElementById('view-icon');

        this.slideshowMode = document.getElementById('slideshowMode');
        this.thumbnailMode = document.getElementById('thumbnailMode');

        this.prev = document.querySelector('.prev');
        this.next = document.querySelector('.next');
    }

    toggleViewMode() {
        this.viewBtn.addEventListener('click', () => {
            if (this.isThumbNail) {
                this.displayThumbnail();
            } else {
                this.displaySlide();
            }
            this.isThumbNail = !this.isThumbNail;
        });
    }

    displayThumbnail() {
        this.viewIcon.classList.add('fa-images');
        this.viewIcon.classList.remove('fa-grip-horizontal');
        this.slideshowMode.style.display = 'none';
        this.thumbnailMode.style.display = 'flex';
        this.prev.style.display = 'none';
        this.next.style.display = 'none';
    }

    displaySlide() {
        this.slideshowMode.style.display = 'block';
        this.thumbnailMode.style.display = 'none';
        this.viewIcon.classList.add('fa-grip-horizontal');
        this.viewIcon.classList.remove('fa-images');
        this.prev.style.display = 'block';
        this.next.style.display = 'block';
    }
}