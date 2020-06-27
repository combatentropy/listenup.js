'use strict';

// Element.matches polyfill for Internet Explorer
if (! Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}

// Event.composedPath polyfill for Internet Explorer
if (! Event.prototype.composedPath) {
    Event.prototype.composedPath = function () {
        let el = ev.target, path = [ el ];

        while (el.parentNode) {
            el = el.parentNode;
            path.push(el);
            if (el === ev.currentTarget) { break; }
        }

        return path;
    }
}

function listenup(areas, selectors) {

    let defaultMatches = {
        // Change and submit are the default if the element is the event.target
        change: function (step, el) { return (0 === step); },
        submit: function (step, el) { return (0 === step); },
        // Click is the default for anything else
        click: function (step, el) {
            if ('INPUT' === el.tagName) {
                return -1 !== [ 'button', 'reset', 'submit' ].indexOf(el.type);
            }
            return -1 === [ 'FORM', 'SELECT', 'TEXTAREA' ].indexOf(el.tagName);
        }
    };

    function addListeners(areas, events) {
        for (let i = 0; i < areas.length; i++) {
            let area = areas[i];
            for (let type in events) {
                let listeners = events[type];
                area.addEventListener(type, function (ev) {
                    let path = ev.composedPath();
                    for (let j = 0; j < path.length; j++) {
                        let step = j, el = path[j];
                        for (let k = 0; k < listeners.length; k++) {
                            let listener = listeners[k];
                            if (el.matches(listener.selector)) {
                                if (
                                    listener.default &&
                                    ! defaultMatches[type](step, el)
                                ) { continue; }
                                listener.callback.call(el, ev);
                            }
                        }
                        if (el === ev.currentTarget) { break; }
                    }
                });
            }
        }
    }

    // discern arguments
    if ('undefined' === typeof selectors) {  // no 2nd arg
        selectors = areas;
        areas = [ document.body ];  // default to body tag
    } else if ('string' === typeof areas) {  // selector
        areas = document.querySelectorAll(areas);
    } else if (areas instanceof HTMLElement) {  // a single node
        areas = [ areas ];
    }  // else areas is already an array or nodelist

    // reindex by type of event
    let events = {};
    for (let type in defaultMatches) { events[type] = []; }
    for (let selector in selectors) {
        let types = selectors[selector];
        if ('function' === typeof types) {
            let callback = types;
            for (let type in defaultMatches) {
                events[type].push({
                    selector: selector,
                    callback: callback,
                    default: true
                });
            }
        } else {
            for (let type in types) {
                let callback = types[type];
                if (! (type in events)) { events[type] = []; }
                events[type].push({
                    selector: selector,
                    callback: callback,
                    default: false
                });
            }
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
