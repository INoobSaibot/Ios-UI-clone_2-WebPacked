import './now-playing-image.css'
class NowPlayingImage extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        this.render()
    }

    render(){
        this.innerHTML = `
        <div class="now-playing-image"><img src="https://lh3.googleusercontent.com/-9_jB8CuFrCw/YCswJf4xILI/AAAAAAAAMO8/aQesprSpqS8GQ88du5GoixkheqWCu6DAgCK8BGAsYHg/s0/2021-02-15.png"
        <div>
        `
    }
}

customElements.define('now-playing-image', NowPlayingImage);
