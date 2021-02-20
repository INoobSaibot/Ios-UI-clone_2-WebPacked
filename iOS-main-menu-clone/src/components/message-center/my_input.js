import './my_input.css';
import './cursor'
import {EventEmitter} from "../../common-components/EventEmitter/eventEmitter";
import $ from "jquery";

class MyInput extends HTMLElement {
    // static get observedAttributes() {
    //     return['move']
    // }

    constructor() {
        super();
        this._value = ['cursor'];
        this.state = {}
    }

    connectedCallback() {
        this.render()
        this.registerEvents()

        this.devOnly()
    }

    afterRender() {
        // const cursor_position = this.rightPos()
        // this.elCursor = this.child('text-cursor')
        // this.elCursor.offset = cursor_position;
        //
        // this.charPositions();
    }

    devOnly() {
        const str = 'This is a test';
        str.split('').forEach((char) => {
            this.keyPressed(char)
        })

    }


    registerEvents() {
        // this.safeSubscribe('key-up', (k)=>{this.keyPressed(k)});
        EventEmitter.subscribe('key-up', (k) => {
            this.keyPressed(k)
        })
        EventEmitter.subscribe('ArrowLeft', (k) => {
            this.handleArrowLeft()
        })
        EventEmitter.subscribe('ArrowRight', (k) => {
            this.handleArrowRight()
        })
    }

    handleArrowLeft() {
        const cursorAt = this._value.indexOf('cursor')
        if (cursorAt < 1) {
            return;
        }
        const cursor = this._value[cursorAt]
        const charCopy = this._value[cursorAt - 1]

        this._value[cursorAt - 1] = cursor;
        this._value[cursorAt] = charCopy;
        this.render()
        console.log(this._value)
    }

    cursorMoveEnd(d) {
        const charPositions = this.newCharPositions()
        const moveCursorPosition = this.child('.move-cursor').getBoundingClientRect().x

        const cursor_target_pos_value = charPositions.reduce((prev, curr) => Math.abs(curr - moveCursorPosition) < Math.abs(prev - moveCursorPosition) ? curr : prev);
        const targetCharIndex = charPositions.indexOf(cursor_target_pos_value)
        console.log(targetCharIndex)
        let targetChar = this._value[targetCharIndex]
        targetChar = targetChar != ' ' ? targetChar : '<space>';
        console.log(targetChar)


        const cursorAt = this._value.indexOf('cursor')
        const cursor = this._value[cursorAt]
        const copyValArr = this._value;
        copyValArr.splice(cursorAt, 1)
        copyValArr.splice(targetCharIndex+0, 0, cursor)

        this._value = copyValArr;
        this.render()
    }

    handleArrowRight() {
        const cursorAt = this._value.indexOf('cursor')
        if (cursorAt >= this._value.length - 1) {
            return;
        }
        const cursor = this._value[cursorAt]
        const charCopy = this._value[cursorAt + 1]

        this._value[cursorAt + 1] = cursor;
        this._value[cursorAt] = charCopy;
        this.render()
        console.log(this._value)
    }

    keyPressed(k) {
        if (k === 'DEL') {
            const cursorAt = this._value.indexOf('cursor')
            if (!(this._value.length == 1 ||(cursorAt==0))) {
                this._value.splice(cursorAt - 1, 1);
            }
        } else if (k === 'space') {
            const space = ' ';
            const cursorAt = this._value.indexOf('cursor')
            this._value.splice(cursorAt, 0, space)
        } else if (k === 'search' || k === 'return') {
            EventEmitter.dispatch('return-pressed');
        } else {
            const cursorAt = this._value.indexOf('cursor')
            this._value.splice(cursorAt, 0, k)
        }

        this.render()
    }

    set value(v) {
        this._value = v.split('');
        this._value.push('cursor')
        this._cursorStringPosition = this._value.length;

        this.render()
        console.log(this._value)
    }

    get value() {
        return this._value.join('');
    }

    render() {
        let chars_html = ``
        let cursor = (this.elCursor && this.elCursor.outerHTML) ? this.elCursor.outerHTML : '<text-cursor></text-cursor>'; // reuse done make new, unless doesnt exist, ie first render;

        this._value.forEach((char) => {
            if (char === 'cursor') {
                chars_html += cursor;
            } else {
                char = char != ' ' ? char : '&nbsp'
                chars_html += `<span class="input-char">${char}</span>`
            }
        })

        this.innerHTML = `<div type='text' class='search-box-input' placeholder='Search'>${chars_html}</div>`;
    }


    cursorMove(d) {
        this.elCursor = this.child('text-cursor')
        this.elCursor.move(d)
    }



    newCharPositions() {
        const spansArr = this.getAllCharSpans();
        const x_posList = spansArr.map((charSpan) => {
            return charSpan.getBoundingClientRect().x + (charSpan.getBoundingClientRect().width/2);
        })

        const firstCharLeftEdge = spansArr[0].getBoundingClientRect().x; // left side of first char
        x_posList.unshift(firstCharLeftEdge);

        return x_posList;
    }

    getAllCharSpans() {
        // todo better query, more specific
        const spans = document.getElementsByClassName('input-char')
        const spansArr = Array.from(spans);
        return spansArr;
    }


    ///////////////////////////////////////////////////////////////////////// todo, put these in base class
    child(selector) {
        // todo add this to a base class all can inherit from
        let els = $(this).find(selector)[0]
        return els
    }

}

customElements.define('my-input', MyInput);
