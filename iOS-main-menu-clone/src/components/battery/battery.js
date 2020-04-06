class Battery {
    constructor() {
        this.battery_0 = 'fa-battery-0';
        this.battery_1 = 'fa-battery-1';
        this.battery_2 = 'fa-battery-2';
        this.battery_3 = 'fa-battery-3';
        this.battery_4 = 'fa-battery-4';
        this.init()
    }

    init() {
        this.el = $('.battery-icon');
        setInterval(() => {
            this.toggle();
        }, 500)
    }

    toggle() {
        if (this.el.hasClass(this.battery_0)) {
            this.el.toggleClass(this.battery_1);
            this.el.toggleClass(this.battery_0);
        } else if (this.el.hasClass(this.battery_1)) {
            this.el.toggleClass(this.battery_1);
            this.el.toggleClass(this.battery_2);
        } else if (this.el.hasClass(this.battery_2)) {
            this.el.toggleClass(this.battery_2);
            this.el.toggleClass(this.battery_3);
        } else if (this.el.hasClass(this.battery_3)) {
            this.el.toggleClass(this.battery_3);
            this.el.toggleClass(this.battery_4);
        } else if (this.el.hasClass(this.battery_4)) {
            this.el.toggleClass(this.battery_4)
            this.el.toggleClass(this.battery_0)
        }
    }
}

export default Battery;