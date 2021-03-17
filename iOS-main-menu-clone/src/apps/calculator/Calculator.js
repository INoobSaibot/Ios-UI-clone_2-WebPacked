const $ = require("jquery");

class Calculator extends HTMLElement {
    constructor() {
        super()
        this.operators = ['multiply', 'minus', 'plus', 'equals', 'divide']
        this.delegates = {'multiply': this.multiply, 'plus': this.add}
        this.init();
    }

    connectedCallback(){
        this.innerHTML = `
        <!-- calculator app       -->
        <div id="calculator-app" class="slide-modal-box calculator-app">
            <div class='header'><div class="left signal-bars"><div class="bar first-bar"></div><div class="bar second-bar"></div><div class="bar third-bar"></div><div class="bar fourth-bar bar-not-receiving"></div>
                    <!-- Network name-->
                    &nbsp; <span class='network'><span class='carrier'>Verizon</span> &nbsp; <span class='network-type'>LTE</span></span>
                </div>
                <span class='center time'>4:26 PM</span><span class='right battery-power'><i class="battery-icon fa fa-battery-0"></i></span>
            </div>

            <div class="result-box"><span class="result">0</span></div>
            <div class="calc-grid-container">
                <button class='calculator-btn light-grey-button'><span class=''></span></button>
                <button class='calculator-btn light-grey-button'><span class=''></span></button>
                <button class='calculator-btn light-grey-button'><span class=''></span></button>
                <button class='calculator-btn operator-button'><span class=''></span></button>

                <button class='calculator-btn' value="7"><span class='button-label' value="7">7</span></button>
                <button class='calculator-btn' value="8"><span class='button-label' value="8">8</span></button>
                <button class='calculator-btn' value="9"><span class='button-label' value="9">9</span></button>
                <button class='calculator-btn operator-button' value="multiply-operator"><span class='butt-label' value="multiply-operator">x</span></button>

                <button class='calculator-btn'><span class=''></span></button>
                <button class='calculator-btn'><span class=''></span></button>
                <button class='calculator-btn'><span class=''></span></button>
                <button class='calculator-btn operator-button'><div class="minus-sign"></div></button>

                <button class='calculator-btn' value="1"><span class='button-label'>1</span></button>
                <button class='calculator-btn'><span class=''></span></button>
                <button class='calculator-btn'><span class=''></span></button>
                <button class='calculator-btn operator-button plus-operator-button' value="plus-operator"><span class='plus-label' value="plus-operator">+</span></button>

            </div>
            <div class="bottom-grid">
                <button class='calculator-btn item8 zero' value="0"><span class='button-label'>0</span></button>
                <button class='calculator-btn item10'><span class='button-label'>.</span></button>
                <button class='calculator-btn operator-button equals-operator-button item9' value="equals-operator"><span class='button-label equals-label' value="equals-operator">=</span></button>
            </div>
        </div>
        <!-- end-calculator-app-->
        `
    }

    init() {
        this.slideModalContainerRef = $('.slide-modal-container');
        this.slideContainerRef = $('#slide-container');
        this.el = $('#calculator-app');
        this.icon = $('#calculator-icon')
        this.icon.on('touchstart', (e) => {
            this.open();
        })
        this.resultBox = this.el.find('.result');
        this.el.find('.calculator-btn').on('click', (e) => {
            this.handleButton(e)
        })
    }

    open() {
        if (this.focused) {
            return
        } // double tap, already open/opening;
        this.slideContainerRef.append(this.el);
        this.slideModalContainerRef.addClass('active')
        setTimeout(() => {
            this.el.removeClass('fall-back')
            this.el.toggleClass('slide-modal-focused-position ')
            this.isOpen = true;
        }, 50)
        this.focused = true
    }

    minimize() {
        this.el = $('#calculator-app');
        if (this.isOpen != true) {
            return
        }
        this.isOpen = false;

        $('body').one('transitionend', (e) => {
            this.el.toggleClass('hidden');
            this.el.toggleClass('slide-modal-focused-position');
            this.slideModalContainerRef.toggleClass('active');
            $('.fall-back').toggleClass('fall-back').addClass('transition-transform');
            setTimeout(() => {
                this.el.toggleClass('hidden')
            }, 35)
        });
        this.el.addClass('fall-back');
        this.focused = false;
    }

    handleButton(e) {
        const nValue = Number(e.currentTarget.value);
        const value = e.currentTarget.value;

        if (nValue || nValue === 0) {
            if (!this.operand_1 || !this.operatorSelected) {
                this.operand_1 = this.concatValue(value, this.operand_1);

                this.updateResultLcd(this.operand_1);
            } else if (!this.operand_2) {
                this.operand_2 = nValue;
                this.updateResultLcd(this.operand_2);
                this.removeOperatorHighlight()
            } else if (this.operand_2) {
                this.operand_2 = this.concatValue(value, this.operand_2);
                this.updateResultLcd(this.operand_2);
            } else if (this.operand_1 && this.operand_2) {
                this.calculate();
                this.removeOperatorHighlight()
                this.updateResultLcd(this.operand_1)
            }

        } else if (this.isOperator(value)) {
            this.handleOperator(value)
        }
    }

    updateResultLcd(n) {
        this.resultBox.html(n);
    }


    concatValue(value, priorOperand) {
        if (!priorOperand) {
            return Number(value);
        } else {
            return Number(priorOperand + value)
        }
    }

    calculate() {
        const delegateFunction = this.delegates[this.operatorSelected];
        const result = delegateFunction(this.operand_1, this.operand_2);
        this.operand_1 = result;
    }

    isOperator(value) {
        const operatorValue = value.replace('-operator', '');
        return this.operators.includes(operatorValue)
    }

    handleOperator(value) {
        const opValue = value.replace('-operator', '');
        const isPlus = opValue === 'plus';
        const isEquals = opValue === 'equals'
        if (isPlus) {
            this.handlePlus()
        } else if (isEquals) {
            this.handleEquals()
        }
    }

    handleEquals() {
        if (this.operatorSelected === 'plus') {
            this.result = this.add(this.operand_1, this.operand_2);

            this.calculate();
            this.removeOperatorHighlight()
            this.updateResultLcd(this.operand_1)
        }
    }

    add(n1, n2) {
        return (n1 + n2);
    }

    multiply(n1, n2) {
        return (n1 * n2);
    }

    handlePlus() {
        this.operatorSelected = 'plus'
        this.operand_2 = undefined;
        $('.plus-label').addClass('selected')
        $('.plus-operator-button').addClass('selected')
    }

    removeOperatorHighlight() {
        if (this.operatorSelected === 'plus') {
            $('.plus-label').removeClass('selected')
            $('.plus-operator-button').removeClass('selected')
        }
    }
}

customElements.define('calculator-app', Calculator);

export default Calculator
