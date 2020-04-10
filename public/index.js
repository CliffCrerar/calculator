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
let calculation = [];
let clearDisplayOnNext = false;
let timeOut;
let offState = true;
function clearOnNext() { clearDisplayOnNext = true };
function clearOnNextOff() { clearDisplayOnNext = false };
function setDisplay(value, clear = false) {
    const valueDisplay = byId('value');
    clear
        ? valueDisplay.innerHTML = value
        : valueDisplay.innerHTML = parseInt(valueDisplay.innerHTML + value)
};
function getDisplay() { return byId('value').innerHTML; }
window.onload = () => init();
const G = (selector) => {
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
    byId('enter').data = { type: 'resolve' };
    byId('reset').data = { type: 'reset' }
    startupSequence(function (ev) {
        turnOff();
        selectButtons.addEventListener('click', buttonClickEventHandler)
    })
}
function turnOn() {
    offState = false;
    swithTextOn.style.display = 'block';
    swithTextOff.style.display = 'none';
    !swithEffectElement.classList.contains('on') && (() => {
        swithEffectElement.classList.remove('off');
        swithEffectElement.classList.add('on');
    })();
    byId('value').innerHTML = 0;
    byId('operator').innerHTML = '';
}
function turnOff() {
    offState = true;
    swithTextOn.style.display = 'none';
    swithTextOff.style.display = 'block';
    !swithEffectElement.classList.contains('off') && (() => {
        swithEffectElement.classList.add('off');
        swithEffectElement.classList.remove('on');
    })();
    byId('value').innerHTML = '';
    byId('operator').innerHTML = '';
}
function startupSequence(callback) {
    const button_container = G('#calc-buttons');
    const buttonsDef = [
        7, 8, 9, '&#247', 4, 5, 6, '&#215;', 1, 2, 3, '&#8722;', 0, '.', '&#43;'
    ];
    for (let i = 0; i < buttonsDef.length; i++) {
        const btnText = buttonsDef[i];
        const btn = G('@button').addClass('calc-btn').addText(btnText);
        typeof btnText === 'number'
            ? btn.data = { type: 'number' }
            : btn.innerHTML === '.' 
                ? btn.data = { type: 'number' }
                : btn.data = { type: 'operator' };
        button_container.append(btn);
        (btnText === 0) && btn.addClass('itm-0');
    }
    return callback('event');
}
function timeOutOffSwitch() { return setTimeout(() => { turnOff() }, 30000); }
function pushValue(value) {
    latestValue = calculation[calculation.length - 1];
    if (latestValue === value) return
    return calculation.push(value);
}
function buttonClickEventHandler(event) {
    if (!(event.target.nodeName ?? 'BUTTON')) return;
    if (offState) turnOn();
    if (clearDisplayOnNext) {
        byId('value').innerHTML = '';
        byId('operator').innerHTML = '';
        clearOnNextOff();
    }
    event.target.data.type === 'number' && setDisplay(event.target.innerHTML);
    event.target.data.type === 'operator' && ((cb) => {
        pushValue(getDisplay());
        pushValue(event.target.innerHTML);
        byId('operator').innerHTML = event.target.innerHTML
        return cb();
    })(function () {
        clearOnNext();
    })
    event.target.data.type === 'resolve' && (() => {
        pushValue(getDisplay());
        let answer = parseInt(calculation[0]);
        function applyOperation(accumulator, operator, value) {
            switch (operator) {
                case '÷': return accumulator /= parseInt(value);
                case '×': return accumulator *= parseInt(value);
                case '+': return accumulator += parseInt(value);
                case '−': return accumulator -= parseInt(value);
            }
        }
        for (let i = 0; i <= calculation.length; i++) {
            const oper = calculation[i + 1];
            const sub = calculation[i + 2];
            if (i % 2 === 0) {
                let applyOperator = applyOperation(answer, oper, sub);
                answer = applyOperator === undefined ? answer : applyOperator;
                console.log('answer: ', answer);
            };
        }
        event.target.data.type === 'reset' && (() => {
            byId('value').innerHTML = '';
            byId('operator').innerHTML = '';
            calculation = [];
        })
        byId('operator').innerHTML = '=';
        byId('value').innerHTML = answer;
        calculation = [];
    })()
    clearTimeout(timeOut);
    timeOut = timeOutOffSwitch();
}
