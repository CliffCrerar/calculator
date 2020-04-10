const $ = document;
const make = (el) => $.createElement(el);
const byId = (id) => $.getElementById(id);
const byTag = (tag) => $.getElementsByTagName(tag);
const byClass = (name) => $.getElementsByClassName(name);

const selectButtons = byClass('calc-frame')[0];

window.onload = function () {
    init();
    console.log('loadend')
}



const G = (selector) => {

    function getElement(selectorType) {
        switch (selectorType) {
            case '#': return byId(selectorId);
            case '.': return byClass(selectorId);
            case '@': return make(selectorId);
            default: return byTag(selector);
        }
    }

    var self;

    const
        isElement = selector instanceof HTMLElement,
        selectorType = isElement || selector.split('').shift(),
        selectorId = isElement || selector.substring(1, selector.length);
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
        selectButtons.addEventListener('click',buttonClickEventHandler)
    })

}

function startupSequence(callback) {

    const button_container = G('#calc-buttons');

    const buttonsDef = [7, 8, 9, '&#247', 4, 5, 6, '&#215;', 1, 2, 3, '&#8722;', 0, '.', '&#43;'];

    for (let i = 0; i < buttonsDef.length; i++) {

        const btnText = buttonsDef[i];

        const btn = G('@button').addClass('calc-btn').addText(btnText);

        button_container.append(btn);


        (btnText === 0) && btn.addClass('itm-0') ;

    }

    return callback('event');

}

function buttonClickEventHandler(event) {

    console.log(event);

}

function turnOnTurnOff(onOff) {

}