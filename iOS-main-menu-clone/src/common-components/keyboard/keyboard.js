import './keyboard.css';
import '../../components/message-center/cursor.css';
import {EventEmitter} from "../EventEmitter/eventEmitter";
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
        this.registerEvents();

        this.downKeys = []
        this.space = 'space'

        this.devOnly()
    }

    devOnly(){
        // const spaceBar = this.container.querySelector('.space-bar')
        // const keyValue = this.space
        // EventEmitter.dispatch('key-down', keyValue);

        // let d = 0;
        // let v = 1;
        // let limit = 200;
        // setInterval(()=>{
        //     if ((d >= limit)||(d < 0)) {v *= -1}
        //     d = d + v;
        //     this.uiKeyMove(d)
        // }, 125)
        // this.generatorStuff()
    }

    generatorStuff(){
        function* generator(i) {
            yield i;
            yield i + 1;
        }

        const gen = generator(1);
        console.log(gen.next().value);
        // should output 1;

        console.log(gen.next().value);
        // should be 2
    }

    registerEvents(){
        let mousedown_startX = 0;
        let mousedown_x_dist = 0;

        $('.key').on('mousedown', (e) => {
            mousedown_x_dist = 0;
            mousedown_startX = e.pageX; //e.originalEvent.clientX
            this.keyDown(e)
        })

        $('.key').on('mousemove', (e) => {
            mousedown_x_dist = e.pageX - mousedown_startX
            this.uiKeyMove(mousedown_x_dist)
        })

        $('.key').on('mouseup', (e) => {
            this.keyUp(e)
            if (mousedown_x_dist){
                this.uiKeyMoveEnd(mousedown_x_dist)
            }
            mousedown_x_dist= 0;
        })

        let touch_x_dist = 0
        let touch_startX = 0

        $('.key').on('touchstart', (e) => {
            touch_startX = e.changedTouches[0].pageX
            e.preventDefault();
            this.keyDown(e)
        })
            .on('touchmove', (e) => {
                let touchobj = e.changedTouches[0];
                touch_x_dist = touchobj.pageX - touch_startX; // get total dist traveled by finger while in contact with surface
                this.uiKeyMove(touch_x_dist)
            })
            .on('touchend', (e) => {
                this.keyUp(e)
                this.uiKeyMoveEnd(touch_x_dist)
        })
    }

    handleKeyPresses(e){
        const keyValue = this.keyValue(e)
        EventEmitter.dispatch('key-pressed', keyValue);
    }

    keyDown(e){
        const keyValue = this.keyValue(e)
        this.uiKeyDown(keyValue)
        EventEmitter.dispatch('key-down', keyValue);
    }

    uiKeyDown(key){
        // todo will eventually need to capture other keys being held
        if (key !== this.space) {return;}
        this.downKeys.push(key)
        setTimeout(()=> {
            if (this.downKeys.includes(key)) {
                this.handleKeyHold(key);
            }
        }, 500)
    }

    handleKeyHold(key){
        console.log('holding key: '+key)
        this.disableAllKeys();
        EventEmitter.dispatch('cursor-move', 0)
    }

    disableAllKeys(){
        this.disabled = true
        const allKeys = this.container.querySelectorAll('.key')
        // console.log(allKeys)
        allKeys.forEach((key)=>{
            key.setAttribute('keydisabled', true)
        })
    }

    uiKeyMove(d){
        if (!this.disabled){return;}
        EventEmitter.dispatch('cursor-move', d)
    }

    uiKeyMoveEnd(d){
        EventEmitter.dispatch('cursor-move-end', d)
    }

    keyUp(e){
        const keyValue = this.keyValue(e)
        if(!this.disabled){EventEmitter.dispatch('key-up', keyValue);}
        this.uiKeyUp(keyValue)
    }

    uiKeyUp(upkey){
        // console.log(upkey)
        this.downKeys = this.downKeys.filter((key)=> key !== upkey)
        if (upkey === this.space) {
            this.handleSpaceUp()
        }
    }

    handleSpaceUp(){
        // if (!this.disabled){
        //     return;
        // }
        this.enableAllKeys()
    }

    enableAllKeys(){
        this.disabled = false
        const allKeys = this.container.querySelectorAll('.key')
        allKeys.forEach((key)=>{
            key.removeAttribute('keydisabled')
        })
    }


    keyValue(e){
        return e.currentTarget.innerText;
    }

    setTitle(title) {
        this.title = title;
        this.render();
    }

    render() {
        this.container.innerHTML = Keyboard.markup(this);
    }

    static key(value){
        return `<button class="key" value="${value}">${value}</button>`
    }

    static markup({title}) {
        const key_q = `<button class="key" value="q">q</button>`
        const key_w = Keyboard.key('w');
        const keyboard = `
<div class="keyboard">
    <div class="row row_1">${key_q}${key_w}<button class="key">e</button><button class="key">r</button><button class="key">t</button><button class="key">y</button><button class="key">u</button><button class="key">i</button><button class="key">o</button><button class="key">p</button></div>
    <div class="row row_2"><button class="key">a</button><button class="key">s</button><button class="key">d</button><button class="key">f</button><button class="key">g</button><button class="key">h</button><button class="key">j</button><button class="key">k</button><button class="key">l</button></div>
    <div class="row row_3"><button class="key upper-case function">UP</button><button class="key">z</button><button class="key">x</button><button class="key">c</button><button class="key">v</button><button class="key">b</button><button class="key">n</button><button class="key">m</button><button class="key del function">DEL</button></div>    
    <div class="row row_4">
        <button class="key function">123</button><button class="key function">:)</button><button class="key mic">&#xf130;</button>
        <button class="key space-bar">space</button><button class="key search">search</button>
   </div>    

</div>
        `

        return `${keyboard}`;
    }
}

export default Keyboard;
