import './red-counter-component.css'
class RedCounterComponent extends HTMLElement {
    connectedCallback() {
        const number = numberFormatter(this.getAttribute('number') || '');
        this.innerHTML = `<span class="counter-background"><span class="counter-number">${number}</span></span>`;
    }
}

// todo put somewhere else we can all use
function numberFormatter(number){
    //todo implement commas etc, probaly import library from external actually
    return number;
}

customElements.define('red-counter', RedCounterComponent);