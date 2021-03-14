import {EventEmitter} from '../../../../../../common-components/EventEmitter/eventEmitter'

const SPACE = ' ';

const getClassListFromNode = function(domNode){
    const c = domNode.className || ''
    const css = c.split(SPACE);
    return css
}

const getInlineStylesObj = function(domNode){
    let entries = []
    const style = domNode.attributes ? domNode.attributes.style : undefined;
    const styleStr = style ? style.value : '';
    const styleList = styleStr.split(',')
    styleList.forEach((kvPair)=>{
        const kvMap = kvPair.split(':')
        if (kvMap[0].length){
            entries.push(kvMap)
        }
    })

    const styleObj = Object.fromEntries(entries)
    return styleObj;
}

class BaseFoo extends HTMLElement {
    constructor() {
        super();
        this.events()
    }

    connectedCallback() {
        setTimeout(() => {
            this.innerHTML = this.render()
            this.afterConnected()
        })
    }

    afterConnected(){
    //    todo: conditiional call on derived class... no, something else
    //    this may or may not be implimented on derived class
    }

    render() {
        console.error('your derived class must implement render, which should return an html template to render')
    }

    events() {
    }

    somethingChanged() {
        setTimeout(() => {
            this.otherNewStuff()
        })
    }

    otherNewStuff() {
        const nr = this.getNewRender()
        const oldRender = this.children

        this.changeCssRecursively(oldRender, nr)
    }

    changeCssRecursively(oldNodes, newNodes) {
        Array.from(oldNodes).forEach((oDomNode, index) => { // nodes are collections not arrays, convert to array to use Array.forEach
            const ndomNode = newNodes[index] // 2 arrays to compare, this lets you iter both at once
            const newCss = getClassListFromNode(ndomNode); // only using function so i dont have to repeat null safe checks
            const prevCss = getClassListFromNode(oDomNode);

            const inlineStyles = getInlineStylesObj(oDomNode)
            const nStyles = getInlineStylesObj(ndomNode)
            console.log(inlineStyles)
            for(const [key, value] of Object.entries(nStyles)){
                console.log(`${key}: ${value}`);
                oDomNode.style[key] = value
            }
            // console.log(oDomNode.style['color'] = 'red')

            const cssDiff = this.compareCss(prevCss, newCss) // compare the css/style list for this node/Element
            if(cssDiff.remove.length > 0){
                oDomNode.classList.remove(cssDiff.remove)
            }
            if(cssDiff.add.length > 0){
                oDomNode.classList.add(cssDiff.add)
            }

            if (ndomNode.childNodes) {
                this.changeCssRecursively(oDomNode.childNodes, ndomNode.childNodes) /*elements usually contain... more elements! best call yoe self*/
            }
        })
    }

    compareCss(cssList, otherCssList) {
        const diffObj = {remove: [], add: []}
        cssList.forEach((cssClass) => {
            if (!otherCssList.includes(cssClass)) {
                diffObj.remove.push(cssClass)
            }
        })

        otherCssList.forEach((cssClass) => {
            if (!cssList.includes(cssClass)) {
                diffObj.add.push(cssClass)
            }
        })

        return diffObj;
    }

    getNewRender(strHtml) {
        const str = strHtml === undefined ? this.render() : strHtml
        const parser = new DOMParser()
        const doc = parser.parseFromString(str, 'text/html')
        const r = doc.body
        return r.childNodes
    }

    newStuff() {
        // const prevCss = this.childNodes[1].childNodes[0].className.split(' ')
        // // console.log(prevCss)
        // const newRender = this.render()
        // const el = document.createElement('div')
        // // const el = document.createDocumentFragment().appendChild(newRender);
        // el.innerHTML = newRender
        // const newCss = el.childNodes[1].childNodes[0].className.split(' ')
        // console.log(el)
        // console.log(newCss)
        //
        // const cssDiff = this.compareCss(prevCss, newCss)
        //
        // this.childNodes[1].childNodes[0].classList.remove(cssDiff.remove)
        // this.childNodes[1].childNodes[0].classList.add(cssDiff.add)
        // console.log(this.childNodes[1].childNodes[0].classList)
        // console.log(el)
        // console.log(this.innerHTML)
    }

    subscribeEventChannel(eventname, callBack) {
        EventEmitter.subscribe(eventname, callBack)
    }

    broadCastEvent(eventName) {
        EventEmitter.dispatch(eventName)
    }
}

export default BaseFoo;

