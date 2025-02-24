export class Thumbnail {
    constructor(images) {
       this.folderPath = './images/';
       this.images = images;
       this.thumbnailContainer = document.getElementById('thumbnailMode');
    }

    reset() {
        this.thumbnailContainer.innerHTML = "";
    }

    generate() {
        this.reset();
        this.images.forEach(image => {
            const src = this.folderPath + image + '.png';
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            thumbnail.onclick = () => this.showFullSize(src);
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = image;
    
            const title = document.createElement('p');
            title.style.backgroundColor = "white";
            title.innerText = image;
    
            thumbnail.appendChild(img);
            thumbnail.appendChild(title);
            this.thumbnailContainer.appendChild(thumbnail);
        });
    }

    showFullSize(imageSrc) {
        var modal = document.getElementById("fullSizeModal");
        var modalImg = document.getElementById("fullSizeImage");
        modal.style.display = "block";
        modalImg.src = imageSrc;

        this.span = document.getElementsByClassName("fullSizeModal close")[0];
        this.span.onclick = function() {
            modal.style.display = "none";
        }.bind(this);
    }

    closeFullSize() {
        var modal = document.getElementById("fullSizeModal");
        modal.style.display = "none";
    }
}