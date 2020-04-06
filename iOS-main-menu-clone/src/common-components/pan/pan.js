import Touches from '../touch-screen/touches';

class Pan {
    constructor(elementID) {
        this.init(elementID);
    }

    init(elementID) {
        $(".right-button").click(this.right);
        $(".left-button").click(this.left);

        this.moving = Date.now();
        this.touchmoveRegister = new Touches(elementID, {right: this.right, left: this.left, home: this.home});
    }

    home() {
        let now = Date.now();
        let millis = Date.now() - this.moving
        if (millis < 250) {
            return;
        } else {
            this.moving = now;
        }

        let grid_0_in_view = $('#view-0').hasClass('focused-position');
        let grid_1_in_view = $('#view-1').hasClass('focused-position');
        let grid_2_in_view = $('#view-2').hasClass('focused-position');
        let grid_3_in_view = $('#view-3').hasClass('focused-position');

        if (grid_1_in_view) {
            // do nothing, already at home
        }

        if (grid_0_in_view) {
            $('#view-0').toggleClass('left-transition');
            $('#view-0').toggleClass('focused-position');
            $('#view-dot-0').toggleClass('active');

            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');

            $('#bottom').toggleClass('focused-position');
        }

        if (grid_2_in_view) {
            $('#view-2').toggleClass('focused-position');
            $('#view-dot-2').toggleClass('active');

            $('#view-1').toggleClass('left-transition');
            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');
        }

        if (grid_3_in_view) {
            $('#view-3').toggleClass('focused-position');
            $('#view-dot-3').toggleClass('active');

            $('#view-2').toggleClass('left-transition');
            $('#view-1').toggleClass('left-transition');

            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');
        }
    }

    left() {
        let now = Date.now();
        let millis = Date.now() - this.moving
        if (millis < 250) {
            return;
        } else {
            this.moving = now;
        }

        let grid_1_in_view = $('#view-1').hasClass('focused-position');
        let grid_2_in_view = $('#view-2').hasClass('focused-position');
        let grid_3_in_view = $('#view-3').hasClass('focused-position');

        if (grid_1_in_view) {
            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');

            $('#view-0').toggleClass('left-transition');
            $('#view-0').toggleClass('focused-position');
            $('#view-dot-0').toggleClass('active');

            $('#bottom').toggleClass('focused-position');
        } else if (grid_2_in_view) {
            $('#view-2').toggleClass('focused-position');
            $('#view-dot-2').toggleClass('active');

            $('#view-1').toggleClass('left-transition');
            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');
        } else if (grid_3_in_view) {
            $('#view-3').toggleClass('focused-position');
            $('#view-dot-3').toggleClass('active');

            $('#view-2').toggleClass('left-transition');
            $('#view-2').toggleClass('focused-position');
            $('#view-dot-2').toggleClass('active');
        } else {
            this.moving = false;
        }
    }

    right() {
        let now = Date.now();
        let millis = Date.now() - this.moving
        if (millis < 250) {
            return;
        } else {
            this.moving = now;
        }

        let grid_0_in_view = $('#view-0').hasClass('focused-position');
        let grid_1_in_view = $('#view-1').hasClass('focused-position');
        let grid_2_in_view = $('#view-2').hasClass('focused-position');
        let grid_3_in_view = $('#view-3').hasClass('focused-position');

        if (grid_0_in_view) {
            $('#view-0').toggleClass('left-transition');
            $('#view-0').toggleClass('focused-position');
            $('#view-dot-0').toggleClass('active');

            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');

            $('#bottom').toggleClass('focused-position');
        }

        if (grid_1_in_view) {
            $('#view-1').toggleClass('left-transition');
            $('#view-1').toggleClass('focused-position');
            $('#view-dot-1').toggleClass('active');

            $('#view-2').toggleClass('focused-position');
            $('#view-dot-2').toggleClass('active');
        }
        if (grid_2_in_view) {
            $('#view-2').toggleClass('left-transition');
            $('#view-2').toggleClass('focused-position');
            $('#view-dot-2').toggleClass('active');

            $('#view-3').toggleClass('focused-position');
            $('#view-dot-3').toggleClass('active');

        }
    }
}


export default Pan;