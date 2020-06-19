import './next-button-component.css';

class NextButtonComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<span><i class="fa">&#xf105;</i></span>`;
    }
}

customElements.define('next-button', NextButtonComponent);