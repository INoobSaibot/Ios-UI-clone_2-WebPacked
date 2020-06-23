import './wifi-settings-view.css'
import '../../shared-components/indicator-icons-component/indicator-icons-component.css';
import Utils from '../../../utils/utils';

class WifiSettingsView extends HTMLElement {

    static foo(title, icons, isLast) {
        const div = document.createElement('div')
        div.classList.add('wifi-switch')

        const iconsTemplate = !icons ? '' : `<span class="indicator-icons right">
                <i class="fa fa-lock" style=''></i>
                <i class="fa fa-wifi" style=""></i>
                <i class="fa fa-info-circle" style=""></i>
            </span>`
        const optionalTrailingHr = isLast ? '' : `<hr>`

        const main = `
            <div class="title-wifi">${title}</div>
            ${iconsTemplate}
            ${optionalTrailingHr}
    `

        div.innerHTML = main;
        return div
    }

    constructor(classRef) {
        super();
        this.classRef = classRef;
    }

    connectedCallback() {
        this.render();
        this.afterRender()
    }

    render() {
        // todo with this bit of trickery / hack, reference to own class, (js doesn't have a good .getClass() method etc.)
        // todo this now is good example of something that potentially can go into parent / super class
        this.innerHTML = this.classRef.markup(this);
    }

    afterRender() {
        this.registerEvents();

        const sections = this.getSections()
        const last = Utils.last(sections)
        sections.forEach((section) => {
            const isLast = section === last;
            this.addSections(section.title, section.icons, isLast)
        })
    }

    registerEvents() {
        // this.onclick = () => {
        //     this.handleClick()
        // }
    }

    handleClick() {
        // this.addSections()
    }

    addSections(sectionTitle, icons, isLast) {
        const div = this.classRef.foo(sectionTitle, icons, isLast);
        if (!this.nextSection) {
            this.buildSection()
        }
        this.nextSectionContentArea.append(div)
    }

    buildSection(){
        const parent = document.createElement('div')
        parent.classList.add('section')
        this.nextSection = parent
        const contentDiv = document.createElement('div')
        contentDiv.classList.add('section-content')
        this.nextSection.append(contentDiv)
        this.append(this.nextSection)
        this.nextSectionContentArea = this.nextSection.querySelector('.section-content')
    }

    getSections() {
        const list = []
        list.push({title:'ATTGlwwG4I', icons:true})
        list.push({title:'IDK5', icons:true})
        list.push({title:'je suis libre', icons:true})
        list.push({title:'NETGEAR89', icons:true})
        list.push({title:'NETGEAR90', icons:true})
        list.push({title:'Parlainth', icons:true})
        list.push({title:'Other...', icons:false})
        return list
    }

    static markup() {
        const foo = '<div style="font-size:48px;color:red">xxxx</div>';//foo();
        return `
<div class="section top">
    <div class="title">Wi-Fi</div>
</div>

<div class="section">
        <div class="wifi-switch">
            <div class="title-wifi">Wi-Fi</div>
            <flip-switch></flip-switch>
            <hr>
        </div>
        <div class="wifi-switch">
            <div class="title-wifi">NETGEAR89-5G</div>
            <span class="indicator-icons right">
                <i class="fa fa-lock" style=''></i>
                <i class="fa fa-wifi" style=""></i>
                <i class="fa fa-info-circle" style=""></i>
            </span>
        </div>
    <hr>
</div>
<div class="networks-title-container">
    <span class="networks">NETWORKS</span><i class="fa fa-refresh fa-spin"></i>
</div>
        `
    }
}

customElements.define('wifi-settings-view', WifiSettingsView)

export default WifiSettingsView;