import './utilities-app.css';
import '../../../styles/icon-grid.css'
import '../calculator/calculator.css'

class UtilitiesComponent {
    // static refs = []; /* break firefox and iOS safari*/

    setTitle(title) {
        this.title = title;
        this.render();
    }

    init(container) {
        this.container = container;
        this.title = this.container.dataset.title || '';
        this.render();
    }


    render() {
        this.container.innerHTML = UtilitiesComponent.markup(this);
        this.container.style.color = 'red';
    }

    static markup({title}) {
        const calculator = `
<div class="calculator-icon">
    <div class="lcd"></div>
    <div class="buttons">
        <div class="btn-row"><div class="grey"></div><div class="grey"></div><div class="gold"></div></div>
        <div class="btn-row"><div class="grey"></div><div class="grey"></div><div class="gold"></div></div>
        <div class="btn-row"><div class="grey zero"></div><div class="gold"></div></div>
    </div>
</div>`;


        return `
<div class="utilities-body">
    <div class="title">Utilities</div>
    <div class="content">
        <div class="grid-container">
            <div class="icon-and-name"><button class='app-icon clock'><span class='icons8-apple-logo'></span></button><div class='icon-text-name'>Voice Memos</div></div>
            <div class="icon-and-name"><button class='app-icon clock'>2</button><div class='icon-text-name'>Compass</div></div>
            <div class="icon-and-name"><button class='app-icon clock'>3</button><div class='icon-text-name'>Measure</div></div>
            
            <!-- new row -->
            <div class="icon-and-name"><button class='app-icon contacts'>${calculator}</button><div class='icon-text-name'>Calculator</div></div>
        </div>
    </div>
</div>

`;
    }

    constructor(container, modalRefs) {
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.floor(Math.random()); /*cant use static for firefox and safari ios :( */
            modalRefs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return ExampleComponent.refs[container.dataset.ref];
        }
    }
}

export default UtilitiesComponent;