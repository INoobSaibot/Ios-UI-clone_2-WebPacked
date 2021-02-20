import './track-title.css'
class TrackTitle extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        this.devOnly()
        this.render()
    }

    devOnly(){
        this.title = 'O Holy Night'
    }

    render(){
        this.innerHTML = `
        <div class="track-title">${this.title}
        <div>
        `
    }
}

customElements.define('track-title', TrackTitle);

