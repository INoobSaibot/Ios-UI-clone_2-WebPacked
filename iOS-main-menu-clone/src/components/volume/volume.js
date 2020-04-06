class Volume {

    constructor() {
        this.volume = 2;// 0 to 5 em
        this.volumeTimer = Date.now();
        this.init()
    }

    init() {
        this.initVolumeUpExternalButtons();
        this.intVolumeDownExternalButtons();
    }

    initVolumeUpExternalButtons() {
        const volumeUp = $('#volume-up');
        let hold = 0;
        volumeUp.on('touchstart mousedown', () => {
            hold = setInterval(() => {
                this.volumeUp();
            }, 50);

        }).on('mouseup mouseleave touchend touchcancel', function () {
            clearTimeout(hold)
        });

        volumeUp.on('touchend mouseup mouseout', this.endVolumeHold);
    }

    intVolumeDownExternalButtons() {
        let hold;
        const volumeDown = $('#volume-down');
        volumeDown.on('touchstart mousedown', () => {
            hold = setInterval(() => {
                this.volumeDown();
            }, 50);
        }).on('mouseup mouseleave touchend touchcancel', function () {
            clearTimeout(hold)
        });
        volumeDown.on('touchend mouseup mouseout', this.endVolumeHold);
    }

    endVolumeHold(e) {
        e.preventDefault();
        let key = e.key;
        let upButton = e.target.id === 'volume-up' || 'volume-up-icon';
        let downButton = e.target.id === 'volume-down' || 'volume-down-icon';

        const el = $('#volume-control');
        const overExtended = el.hasClass('over-extended')
        const squishedDown = el.hasClass('squished-down')

        if (key === 'ArrowUp' || upButton && overExtended) {
            el.toggleClass('over-extended');
        } else if (key === 'ArrowDown' || downButton && squishedDown) {
            el.toggleClass('squished-down');
        }
    }

    volumeUp() {
        const MAX = 17.5;
        const INCREMENT = 0.90;
        this.volume += INCREMENT;
        if (this.volume > MAX) {
            this.volume = MAX;
            if (!$('#volume-control').hasClass('over-extended')) {
                $('#volume-control').toggleClass('over-extended');
            }
        }
        this.volumeChange();
    }

    volumeDown() {
        const MIN = 0.0;
        const DECREMENT = 0.90;
        this.volume -= DECREMENT;
        if (this.volume < MIN) {
            this.volume = MIN;
            if (!$('#volume-control').hasClass('squished-down')) {
                $('#volume-control').toggleClass('squished-down');
            }
        }
        this.volumeChange();
    }

    volumeChange() {
        const time = this.volumeTimer;
        const millis = this.volumeTimer = Date.now();

        let el = $('#volume-control');
        let level = $('#volume-level');
        const icon = $('#volume-icon');
        const show = el.hasClass('show');

        let nextHeight = this.volume + 'em';
        level.css({'height': nextHeight});

        if (show && el.hasClass('skinny')) {
            // do nothing
        } else if (!show) {
            el.toggleClass('show')
        } else {
            // iono
        }
        if(this.hasBeenHeldOneSecond()){
            el.addClass('skinny')
            icon.addClass('small');
        }

        setTimeout(() => {
            if (millis === this.volumeTimer) {
                el.removeClass('show')
                el.removeClass('skinny')
                el.removeClass('over-extended')
                el.removeClass('squished')
                icon.removeClass('small')
            }
        }, 1000)
    }

    hasBeenHeldOneSecond() {
        if (!this.holdingSince) {
            this.holdingSince = this.volumeTimer;
        }
        const elapsedHold = Date.now() - this.holdingSince;
        clearTimeout(this.holdTimeout);
        this.holdTimeout = setTimeout(() => {
            this.holdingSince = undefined
        }, 1000)
        // console.log(elapsedHold)
        if(elapsedHold > 1000) {return true} return false;
    }
}

export default Volume;