const $ = document;
const make = (el) => $.createElement(el);
const byId = (id) => $.getElementById(id);
const byTag = (tag) => $.getElementsByTagName(tag);
const byClass = (name) => $.getElementsByClassName(name);

const selectButtons = byClass('calc-frame')[0];

const swithEffectElement = byId('calc-on');
const swithTextOn = byId('on');
const swithTextOff = byId('off');
const resultFrame = byId('result-frame');
let currentCalcValue = 0;
let nextCalcValue = 0;


const setDisplay = (value, clear = false) => clear ? byId('value').innerHTML = value : byId('value').innerHTML += value;
const getDisplay = () => byId('value').innerHTML;

const setOperator = (operator) = byId('operator').innerHTML = operator;

let timeOut;
let offState = true;

window.onload = function () {
    init();

    console.log('loadend')
}



const G = (selector) => {

    // let self;

    function getElement(selectorType) {
        switch (selectorType) {
            case '#': return byId(selectorId);
            case '.': return byClass(selectorId);
            case '@': return make(selectorId);
            default: return byTag(selector);
        }
    }

    const
        isElement = selector instanceof HTMLElement,
        selectorType = isElement || selector.split('').shift(),
        selectorId = isElement || selector.substring(1, selector.length),
        self = isElement ? selector : getElement(selectorType);

    self.addClass = (className) => {
        self.classList.add(className);
        return self;
    };
    self.swapClass = (remove, append) => {
        self.classList.remove(remove);
        self.classList.add(appen);
    };
    self.addText = (text) => { self.innerHTML = text; return self };
    self.append = (el) => { self.appendChild(el); return self };

    return self
}


function init() {

    startupSequence(function (ev) {
        turnOff();
        selectButtons.addEventListener('click', buttonClickEventHandler)
    })

}

function startupSequence(callback) {

    const button_container = G('#calc-buttons');
    const buttonsDef = [7, 8, 9, '&#247', 4, 5, 6, '&#215;', 1, 2, 3, '&#8722;', 0, '.', '&#43;'];

    for (let i = 0; i < buttonsDef.length; i++) {
        const btnText = buttonsDef[i];
        const btn = G('@button').addClass('calc-btn').addText(btnText);
        button_container.append(btn);
        (btnText === 0) && btn.addClass('itm-0');
    }
    return callback('event');
}

function timeOutOffSwitch() {
    return setTimeout(() => { turnOff() }, 30000);
}

function buttonClickEventHandler(event) {
    if (offState) turnOn();
    clearTimeout(timeOut);
    timeOut = timeOutOffSwitch();
    console.log(event.target.innerHTML);
    processInput(event.target.innerHTML);
}

function turnOn() {
    offState = false;
    swithTextOn.style.display = 'block';
    swithTextOff.style.display = 'none';
    !swithEffectElement.classList.contains('on') && (() => {
        swithEffectElement.classList.remove('off');
        swithEffectElement.classList.add('on');
    })();
    byId('value').innerHTML = 0
    byId('operator').innerHTML = ''
}

function turnOff() {
    offState = true;
    swithTextOn.style.display = 'none';
    swithTextOff.style.display = 'block';
    !swithEffectElement.classList.contains('off') && (() => {
        swithEffectElement.classList.add('off');
        swithEffectElement.classList.remove('on');
    })();
    byId('value').innerHTML = ''
    byId('operator').innerHTML = ''
}

function processInput(input) {
    console.log('input: ', input);
    if (getDisplay().length === 1 && getDisplay() == 0) {
        setDisplay(input, true);
    } else {
        if(['+','-','*','/'].includes(input)){
            currentCalcValue = getDisplay();
            setOperator(input);
        }
        setDisplay(input)
    }


}
