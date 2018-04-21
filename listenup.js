'use strict';

// Element.matches polyfill for Internet Explorer
if (! Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}

function listenup(node, events) {

    let events2 = {};

    for (let selector in events) {
        let types = events[selector];
        for (let type in types) {
            let callback = types[type];
            if (! (type in events2)) { events2[type] = []; }
            events2[type].push({ selector: selector, callback: callback });
        }
    }

    for (let type in events2) {
        let listeners = events2[type];
        node.addEventListener(type, function (ev) {
            let el = ev.target;
            for (let i = 0; i < listeners.length; i++) {
                let listener = listeners[i];
                if (el.matches(listener.selector)) { listener.callback(ev); }
            }
        });
    }
}

