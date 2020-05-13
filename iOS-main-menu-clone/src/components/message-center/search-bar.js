import {EventEmitter} from "../../common-components/EventEmitter/eventEmitter";

class SearchBarService {
    constructor(searchBox) {
        this.subscriptions = [];
        this.elRef = searchBox;
        this.inputField = searchBox.find('input');

        this.inputField[0].value = 'foof'
        this.cursor ='_'
        this.init();
    }

    init() {
        this.inputField.on('click touchend', (e) => {
            this.getKeyBoard(e);
        })
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
        this.safeSubscribe('key-up');
        this.safeSubscribe('key-pressed')
        this.safeSubscribe('return-pressed', ()=>{this.searchPressed()})
        this.outsideTouchRegister()
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
        if (!this.subscriptions.includes(eventType)) {
            EventEmitter.subscribe(eventType, (d) => {
                if (callBack){callBack(d)
                } else{
                    this.keyPressed(d);
                }
            })
            this.subscriptions.push(eventType);
        }
    }

    keyPressed(k) {
        const now = Date.now();
        const elapsedTimeSincePreviousKeyEvent =  now - this.lastKeyPress;
        if(elapsedTimeSincePreviousKeyEvent < 100) {return}

        this.lastKeyPress = now;
        let tempStr = this.getInputFieldValue();
        if (k === 'DEL') {
            tempStr = this.strPop(tempStr);
        } else if (k === 'space') {
            tempStr += ' ';
        } else if (k === 'search' || k === 'return') {
            EventEmitter.dispatch('return-pressed');
        } else {
            tempStr += k;
        }
        this.updateInput(tempStr)
    }

    updateInput(str) {
        this.inputField[0].value = str + this.cursor;
        // this.inputField[0].focus();
    }

    getInputFieldValue(){
        const str = this.inputField[0].value;
        const replacement = '';

        return str.replace(/_([^_]*)$/, replacement + '$1');
    }

    strPop(str) {
        let out = '';
        out = str.substring(0, str.length - 1)
        return out;
    }
}

export default SearchBarService;