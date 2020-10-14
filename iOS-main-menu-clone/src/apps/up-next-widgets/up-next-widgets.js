import $ from "jquery";

class Widget {
    constructor(el) {
        this.elRef = el;

        this.init()
    }

    init() {
        console.log(this.elRef)
        this.registerEvents()
    }

    registerEvents() {
        this.elRef.on('touchstart', (e) => {
            console.log(e)
        })

        this.alternateMethod();
    }

    alternateMethod(){
        // const el = {
        //     slider:'',
        //     holder: $('.scrollable'),
        //     imgSlide: ''
        // }
        //
        // let slideWidth = $('#slider').width(),
        //     touchstartx,
        //     touchmovex,
        //     movex,
        //     index: 0,
        //     longTouch
    }

    enableTapToMaximize(cancel) {
        this.appsModalRef
            .on('touchstart', (e) => {
                $(this).data('moved', '0');
                this.start = new Date().getTime() / 1000;
            })
            .on('touchmove', (e) => {
                $(this).data('moved', '1');
            })
            .on('touchend', (e) => {
                if ($(this).data('moved') == 0) {
                    // HERE YOUR CODE TO EXECUTE ON TAP-EVENT
                    this.end = new Date().getTime() / 1000;
                    const elapsed = this.end - this.start
                    if (elapsed <= tapHoldLimit) {
                        this.handleAppModalTap(e);
                    }
                }
            });

    }

}

export default Widget;
