import './app-title.css';

class AppTitleComponent extends HTMLElement {
    connectedCallback() {
        const appName = this.getAttribute('app-name') || 'missing app name';
        this.innerHTML = `<h1 class="title">${appName}</h1>`;
    }
}

customElements.define('app-title', AppTitleComponent);