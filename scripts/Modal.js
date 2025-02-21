export class Modal {
    constructor(id, component) {
        // Get the modal
        this.modal = document.getElementById(id);
        // Get the <span> element that closes the modal
        this.span = document.getElementsByClassName(id + " close")[0];
        this.component = component;
    }

    action() {
        this.component.onclick = function() {
            this.modal.style.display = "block";
        }.bind(this);

        // When the user clicks on <span> (x), close the modal
        this.span.onclick = function() {
            this.modal.style.display = "none";
        }.bind(this);
    }
}