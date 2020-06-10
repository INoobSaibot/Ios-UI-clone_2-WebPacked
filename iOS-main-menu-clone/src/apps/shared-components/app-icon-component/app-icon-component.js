import './app-icon-component.css';

class AppIconComponent extends HTMLElement {
    connectedCallback() {
        const height = this.getAttribute('height') || '33rem';
        this.innerHTML = `<div></div>`;
    }
}

customElements.define('app-icon', AppIconComponent);