export class Modal {
    constructor() {
        // Get the modal
        this.modal = document.getElementById("myModal");
        // Get the <span> element that closes the modal
        this.span = document.getElementsByClassName("close")[0];
        // When the user clicks the button, open the modal 
        this.stackList = document.querySelector('.stack-list');
    }

    action() {
        this.stackList.onclick = function() {
            this.modal.style.display = "block";
        }.bind(this);

        // When the user clicks on <span> (x), close the modal
        this.span.onclick = function() {
            this.modal.style.display = "none";
        }.bind(this);
    }
}