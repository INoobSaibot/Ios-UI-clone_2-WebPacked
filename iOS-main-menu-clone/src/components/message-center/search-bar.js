import {EventEmitter} from "../../common-components/EventEmitter/eventEmitter";
import './my_input'

class SearchBarService {
    constructor(searchBox) {
        this.subscriptions = [];
        this.elRef = searchBox;
        this.inputField = searchBox.find('my-input');

        // this.inputField[0].value = 'abcdefgh'
        this.init();
    }

    init() {
        this.inputField.on('click touchstart', (e) => {
            this.getKeyBoard(e);
        })
        this.myInput = this.elRef[0].querySelector('my-input')
        this.devOnly()
    }

    devOnly() {
        EventEmitter.subscribe('keyboard-testing', (e) => {
            this.getKeyBoard(e)
        })
    }

    getKeyBoard(e) {
        EventEmitter.dispatch('keyboard-request', e);

        this.lastKeyPress = Date.now();
        // this.safeSubscribe('key-up', (k)=>{this.keyPressed(k)});
        // todo this key-up and key press mix up needs fixed here and the dispatcher
        // this.safeSubscribe('key-pressed', (k)=>{this.keyPressed(k)})
        this.safeSubscribe('return-pressed', ()=>{this.searchPressed()})
        this.safeSubscribe('cursor-move', (e) => {this.moveCursor(e)})
        this.safeSubscribe('cursor-move-end', (d) =>{this.moveCursorEnd(d)})
        this.outsideTouchRegister()
    }

    moveCursor(d){
        this.myInput.cursorMove(d)
    }

    moveCursorEnd(d){
        this.myInput.cursorMoveEnd(d)
    }

    outsideTouchRegister(){
        $('#view-0').on('click touchstart', (e) => {
            if ($(e.target).closest(this.elRef).length == 0) {
                // .closest can help you determine if the element
                // or one of its ancestors is #menuscontainer
                EventEmitter.dispatch('keyboard-request_close', e);
            } else {
                // inside click... do nothing
            }
        });
    }

    searchPressed(){
        alert('we must search for '+ this.getInputFieldValue())
    }

    safeSubscribe(eventType, callBack) {
        // todo this would be good to move into super class to inherit from or, into Event class itself
        if (!this.subscriptions.includes(eventType)) {
            EventEmitter.subscribe(eventType, (d) => {
                if (callBack){callBack(d)
                } else{
                    // this.keyPressed(d);
                }
            })
            this.subscriptions.push(eventType);
        }
    }

    // keyPressed(k) {
    //     // return;
    //     const now = Date.now();
    //     const elapsedTimeSincePreviousKeyEvent =  now - this.lastKeyPress;
    //     if(elapsedTimeSincePreviousKeyEvent < 100) {return}
    //
    //     this.lastKeyPress = now;
    //     let tempStr = this.getInputFieldValue();
    //     if (k === 'DEL') {
    //         tempStr = this.strPop(tempStr);
    //     } else if (k === 'space') {
    //         tempStr += ' ';
    //     } else if (k === 'search' || k === 'return') {
    //         EventEmitter.dispatch('return-pressed');
    //     } else {
    //         tempStr += k;
    //     }
    //     this.updateInput(tempStr)
    // }

    updateInput(str) {
        this.inputField[0].value = str //+ this.cursor;
    }

    getInputFieldValue(){
        const str = this.inputField[0].value;

        return str
    }
}

export default SearchBarService;
