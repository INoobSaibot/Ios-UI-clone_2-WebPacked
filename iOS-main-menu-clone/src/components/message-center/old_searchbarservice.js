// import {EventEmitter} from "../../common-components/EventEmitter/eventEmitter";
//
// class SearchBarService {
//     constructor(searchBox) {
//         this.subscriptions = [];
//         this.elRef = searchBox;
//         this.inputField = searchBox.find('.search-box-input');
//
//         // this.inputField[0].value = 'foof'
//         this.cursor ='_'
//         this.init();
//     }
//
//     init() {
//         this.inputField.on('click touchstart', (e) => {
//             this.getKeyBoard(e);
//         })
//         this.elCursor = this.elRef[0].querySelector('text-cursor')
//         this.devOnly()
//     }
//
//     devOnly() {
//         EventEmitter.subscribe('keyboard-testing', (e) => {
//             this.getKeyBoard(e)
//         })
//
//         // console.log(this.elCursor)
//         // let f = this.inputField[0].getClientRects()[0]
//         // console.log(f)
//         // this.updateInput('d')
//         // this.updateInput('d')
//         // this.updateInput('d')
//         // this.updateInput('d')
//         // this.updateInput('d')
//         // this.updateInput('d')
//         // this.updateInput('d')
//         // this.updateInput('d')
//     }
//
//     getKeyBoard(e) {
//         EventEmitter.dispatch('keyboard-request', e);
//
//         this.lastKeyPress = Date.now();
//         this.safeSubscribe('key-up');
//         this.safeSubscribe('key-pressed', (k)=>{this.keyPressed(k)})
//         this.safeSubscribe('return-pressed', ()=>{this.searchPressed()})
//         this.safeSubscribe('cursor-move', (e) => {this.moveCursor(e)})
//         this.outsideTouchRegister()
//     }
//
//     moveCursor(d){
//         // console.log(d)
//         // const searchInput = this.elRef[0].querySelector('input')
//         // console.log(searchInput)
//
//         this.elCursor.move(d)
//     }
//
//     outsideTouchRegister(){
//         $('#view-0').on('click touchstart', (e) => {
//             if ($(e.target).closest(this.elRef).length == 0) {
//                 // .closest can help you determine if the element
//                 // or one of its ancestors is #menuscontainer
//                 EventEmitter.dispatch('keyboard-request_close', e);
//             } else {
//                 // inside click... do nothing
//             }
//         });
//     }
//
//     searchPressed(){
//         alert('we must search for '+ this.getInputFieldValue())
//     }
//
//     safeSubscribe(eventType, callBack) {
//         if (!this.subscriptions.includes(eventType)) {
//             EventEmitter.subscribe(eventType, (d) => {
//                 if (callBack){callBack(d)
//                 } else{
//                     // this.keyPressed(d);
//                 }
//             })
//             this.subscriptions.push(eventType);
//         }
//     }
//
//     keyPressed(k) {
//         const now = Date.now();
//         const elapsedTimeSincePreviousKeyEvent =  now - this.lastKeyPress;
//         if(elapsedTimeSincePreviousKeyEvent < 100) {return}
//
//         this.lastKeyPress = now;
//         let tempStr = ''//this.getInputFieldValue();
//         if (k === 'DEL') {
//             tempStr = this.strPop(tempStr);
//             this.del()
//         } else if (k === 'space') {
//             tempStr += ' ';
//         } else if (k === 'search' || k === 'return') {
//             EventEmitter.dispatch('return-pressed');
//         } else {
//             tempStr += k;
//         }
//         this.updateInput(tempStr)
//     }
//
//     updateInput(str) {
//         // let char = document.createElement('div');
//         // char.classList = 'input-char';
//         // char.innerText = str;
//
//         let char = `<div class="input-char">${str}</div>`
//
//         this.inputField[0].innerHTML = this.inputField[0].innerHTML + char;
//         // this.inputField[0].appendChild(char)
//         // this.inputField[0].focus();
//     }
//
//     del(){
//         // let charEls = this.inputField[0].querySelectorAll('.char')
//         // const charElsList = Array.from(charEls)
//         // charElsList.pop();
//         //
//         // this.inputField[0].innerHTML = charEls
//     }
//
//     getInputFieldValue(){
//         const str = this.inputField[0].value;
//         const replacement = '';
//
//         return str.replace(/_([^_]*)$/, replacement + '$1');
//     }
//
//     strPop(str) {
//         let out = '';
//         out = str.substring(0, str.length - 1)
//         return out;
//     }
// }
//
// export default SearchBarService;
