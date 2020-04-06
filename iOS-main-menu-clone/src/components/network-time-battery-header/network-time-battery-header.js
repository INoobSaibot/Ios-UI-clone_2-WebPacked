import './signal-bars.css';
import './battery.css';

const header = `<div class='header'><div class="left signal-bars"><div class="bar first-bar"></div><div class="bar second-bar"></div><div class="bar third-bar"></div><div class="bar fourth-bar bar-not-receiving"></div>
                    <!-- Network name-->
                    &nbsp; <span class='network'><span class='carrier'>Verizon</span> &nbsp; <span class='network-type'>LTE</span></span>
                </div>
                <span class='center time'>4:26 PM</span><span class='right battery-power'><i class="battery-icon fa fa-battery-0"></i></span>
            </div>`

export default header;