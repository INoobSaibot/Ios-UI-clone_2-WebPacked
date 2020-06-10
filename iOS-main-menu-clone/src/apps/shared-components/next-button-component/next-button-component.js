import './next-button-component.css';

class NextButtonComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<h1><i class="fa">&#xf105;</i></h1>`;
    }
}

customElements.define('next-button', NextButtonComponent);