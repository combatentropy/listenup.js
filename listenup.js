'use strict';

// Element.matches polyfill for Internet Explorer
if (! Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}

function listenup(areas, selectors) {

    function addListeners(areas, events) {
        for (let i = 0; i < areas.length; i++) {
            let area = areas[i];
            for (let type in events) {
                let listeners = events[type];
                area.addEventListener(type, function (ev) {
                    let el = ev.target;
                    for (let j = 0; j < listeners.length; j++) {
                        let listener = listeners[j];
                        if (el.matches(listener.selector)) {
                            listener.callback(ev);
                        }
                    }
                });
            }
        }
    }

    // discern arguments
    if ('undefined' === typeof selectors) {
        selectors = areas;
        areas = [ document.body ];
    } else if ('string' === typeof areas) {
        areas = document.querySelectorAll(areas);
    } else if (areas instanceof HTMLElement) {
        areas = [ areas ];
    }

    // reindex by type of event
    let events = {};
    for (let selector in selectors) {
        let types = selectors[selector];
        for (let type in types) {
            let callback = types[type];
            if (! (type in events)) { events[type] = []; }
            events[type].push({ selector: selector, callback: callback });
        }
    }
    
    if ('loading' === document.readyState) {
        document.addEventListener('DOMContentLoaded', function () {
            addListeners(areas, events);
        });
    } else {
        addListeners(areas, events);
    }
}
