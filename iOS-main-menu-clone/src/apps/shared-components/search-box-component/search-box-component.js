import './search-box-component.css'
class SearchBoxCompoent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<h1>Hello world, Search Box placeholder</h1>`;
    }
}

customElements.define('search-box', SearchBoxCompoent);