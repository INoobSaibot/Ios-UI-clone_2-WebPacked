import './utilities-app.css';
import '../../styles/icon-grid.css'
import '../calculator/calculator.css'
import '../calculator/calculator-icon'
import calculator_icon from "../calculator/calculator-icon";

class UtilitiesComponent {
    // refs = []; /* break firefox and iOS safari*/

    init(container) {
        this.container = container;
        this.outsideClick(container);
        this.render();
    }

    outsideClick() {
        $('#modal-container').on('click touchstart', (e) => {
            if ($(e.target).closest(".content").length == 0) {
                // .closest can help you determine if the element
                // or one of its ancestors is #menuscontainer

                // const e = new Event('cat')
                // e.
                if (this.isMinimized()){console.log("already hidden");return}
                else {this.minimize();console.log("hide");}
            }
        });
    }

    render() {
        this.container.innerHTML = UtilitiesComponent.markup(this);
    }

    static markup({title}) {
        const calculator = calculator_icon;

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

    constructor(container, modalRefs, css, minimize, isMinimized) {
        this.minimize = minimize;
        this.isMinimized = isMinimized;
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.floor(Math.random()); /*cant use static for firefox and safari ios :( */
            modalRefs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return modalRefs[container.dataset.ref];
        }
    }
}

export default UtilitiesComponent;