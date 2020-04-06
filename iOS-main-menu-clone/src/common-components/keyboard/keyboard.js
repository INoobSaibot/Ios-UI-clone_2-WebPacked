import header from '../../components/network-time-battery-header/network-time-battery-header';
import './lost-motion-assembly.css';

class Keyboard {
    // static refs = []; /* break firefox and iOS safari*/

    constructor(container, modalRefs) {
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.floor(Math.random()); /*cant use static for firefox and safari ios :( */
            modalRefs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return MailAppComponent.refs[container.dataset.ref];
        }
    }

    init(container) {
        this.container = container;
        this.title = this.container.dataset.title || this.container.id;
        this.render();
    }

    setTitle(title) {
        this.title = title;
        this.render();
    }

    render() {
        this.container.innerHTML = LostMotionAssembly.markup(this);
    }

    static markup({title}) {
        const keyboard = `
<div class="keyboard">
    <div class="row row_1"><button class="key">q</button><button class="key">w</button><button class="key">e</button><button class="key">r</button><button class="key">t</button><button class="key">y</button><button class="key">u</button><button class="key">i</button><button class="key">o</button><button class="key">p</button></div>
    <div class="row row_2"><button class="key">a</button><button class="key">s</button><button class="key">d</button><button class="key">f</button><button class="key">g</button><button class="key">h</button><button class="key">j</button><button class="key">k</button><button class="key">l</button></div>
    <div class="row row_3"><button class="key upper-case function">UP</button><button class="key">z</button><button class="key">x</button><button class="key">c</button><button class="key">v</button><button class="key">b</button><button class="key">n</button><button class="key">m</button><button class="key del function">DEL</button></div>    
    <div class="row row_4">
        <button class="key function">123</button><button class="key function">:)</button><button class="key">&#xf130;</button>
        <button class="key space-bar">space</button><button class="key search">search</button>
   </div>    

</div>
        `

        return `
<div class="lost-motion-assembly-body">${header}</div>
<div class="app-content"></div> <h1 class="title">${title}</h1>
${keyboard}
`;
    }
}

export default LostMotionAssembly;