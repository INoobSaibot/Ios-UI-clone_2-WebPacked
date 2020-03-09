const Index = {
    init: function() {
        // dev testing start at #0 search screen
        // this.left();
        // end dev only code

        $(".home-button").click(this.home);
        $(".right-button").click(this.right);
        $(".left-button").click(this.left);

        document.body.addEventListener('keydown', function (e) {
            let key = e.key;

            if (key === 'ArrowRight') {
                this.right();
            } else
                if (key === 'ArrowLeft') {
                    this.left();
                } else if (key === 'ArrowUp') {
                    this.home();
                }
        }.bind(this));

    },

    home: function() {
        let grid_0_in_view = $('#view-0').hasClass('focused-position');
        let grid_1_in_view = $('#view-1').hasClass('focused-position');
        let grid_2_in_view = $('#view-2').hasClass('focused-position');
        let grid_3_in_view = $('#view-3').hasClass('focused-position');

        if (grid_1_in_view) {
            // do nothing, already at home
        }

        if(grid_0_in_view) {
            $( '#view-0').toggleClass( 'left-transition');
            $( '#view-0').toggleClass( 'focused-position');
            $( '#view-dot-0').toggleClass('active');

            $( '#view-1').toggleClass( 'focused-position');
            $( '#view-dot-1').toggleClass('active');

            $('#bottom').toggleClass('focused-position');
        }

        if (grid_2_in_view) {
            $( '#view-2').toggleClass( 'focused-position');
            $( '#view-dot-2').toggleClass('active');

            $( '#view-1').toggleClass( 'left-transition');
            $( '#view-1').toggleClass( 'focused-position');
            $( '#view-dot-1').toggleClass('active');
        }

        if (grid_3_in_view) {
            $( '#view-3').toggleClass( 'focused-position');
            $( '#view-dot-3').toggleClass('active');

            $( '#view-2').toggleClass( 'left-transition');
            $( '#view-1').toggleClass( 'left-transition');

            $( '#view-1').toggleClass( 'focused-position');
            $( '#view-dot-1').toggleClass('active');
        }

    },

    right: function () {
        let grid_0_in_view = $('#view-0').hasClass('focused-position');
        let grid_1_in_view = $('#view-1').hasClass('focused-position');
        let grid_2_in_view = $('#view-2').hasClass('focused-position');
        let grid_3_in_view = $('#view-3').hasClass('focused-position');

        if (grid_0_in_view) {
            $( '#view-0').toggleClass( 'left-transition');
            $( '#view-0').toggleClass( 'focused-position');
            $( '#view-dot-0').toggleClass('active');

            $( '#view-1').toggleClass( 'focused-position');
            $( '#view-dot-1').toggleClass('active');

            $('#bottom').toggleClass('focused-position');
        }

        if (grid_1_in_view) {
            $( '#view-1').toggleClass( 'left-transition');
            $( '#view-1').toggleClass( 'focused-position');
            $( '#view-dot-1').toggleClass('active');

            $( '#view-2').toggleClass( 'focused-position');
            $( '#view-dot-2').toggleClass('active');
        }
        if (grid_2_in_view) {
            $( '#view-2').toggleClass( 'left-transition');
            $( '#view-2').toggleClass( 'focused-position');
            $( '#view-dot-2').toggleClass('active');

            $( '#view-3').toggleClass( 'focused-position');
            $( '#view-dot-3').toggleClass('active');

        }
    },

    left: function () {
        let grid_1_in_view = $('#view-1').hasClass('focused-position');
        let grid_2_in_view = $('#view-2').hasClass('focused-position');
        let grid_3_in_view = $('#view-3').hasClass('focused-position');

        if (grid_1_in_view) {
            $( '#view-1').toggleClass( 'focused-position');
            $( '#view-dot-1').toggleClass('active');

            $( '#view-0').toggleClass( 'left-transition');
            $( '#view-0').toggleClass( 'focused-position');
            $( '#view-dot-0').toggleClass('active');

            $('#bottom').toggleClass('focused-position');
        }

        else if (grid_2_in_view) {
            $( '#view-2').toggleClass( 'focused-position');
            $( '#view-dot-2').toggleClass('active');

            $( '#view-1').toggleClass( 'left-transition');
            $( '#view-1').toggleClass( 'focused-position');
            $( '#view-dot-1').toggleClass('active');
        }

        if (grid_3_in_view) {
            $( '#view-3').toggleClass( 'focused-position');
            $( '#view-dot-3').toggleClass('active');

            $( '#view-2').toggleClass( 'left-transition');
            $( '#view-2').toggleClass( 'focused-position');
            $( '#view-dot-2').toggleClass('active');
        }
    }
}