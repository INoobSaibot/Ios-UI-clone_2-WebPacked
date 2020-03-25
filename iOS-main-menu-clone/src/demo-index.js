import printMe from "./print";
import Icon from "./icon.png";
import Data from "./data.xml";

import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml'
// No warning
//import data from './data.json';
// Warning shown, this is not allowed by the spec.
//import { foo } from './data.json';
import printMe from './print'

function component() {
    const element = document.createElement('div');


    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    console.log(Data);

    return element;
}

// document.body.appendChild(component());

