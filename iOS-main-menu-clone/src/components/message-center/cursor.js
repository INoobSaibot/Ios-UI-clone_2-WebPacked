import './cursor.css';

class TextCursor extends HTMLElement {
    static get observedAttributes() {
        return['move']
    }

    constructor() {
        super();
        this.start_offset = 150;
        this.ref = $(this)
    }

    connectedCallback() {
        this.render()
        this.afterRender()
    }

    render(){
        this.innerHTML = `<span id="cursor" class="cursor w3-animate-fading">|</span><span id="moving-cursor" class="move-cursor">|</span>`;
    }

    afterRender(){
        const r = $(this)[0].getBoundingClientRect();
        this.slidingCursor = this.ref.find('.move-cursor');
        this.normalCursor = this.ref.find('.cursor');
    }

    move(m){
        this.x_position = m

        this.slidingCursor.attr('cursor-enabled', true)
        this.normalCursor.attr('cursor-enabled', false)
        this.slidingCursor.css({'left': this.x_position});
    }

    set offset(n){
        this.start_offset = n;
        this.x_position = this.start_offset + 0;
        this.ref = $(this)
    }
}

customElements.define('text-cursor', TextCursor);
