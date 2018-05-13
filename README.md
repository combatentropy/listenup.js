# listenup.js
Light and clear events

```js
listenup(document.body, {
    '.hi': {
        click: function (ev) {
            ev.preventDefault();
            alert('Hi');
        },
        mouseover: function (ev) {
            ev.target.textContent = "I'll say hi";
        }
    },
    '.stuff > li': {
        click: function (ev) {
            console.log('This is item #' + ev.target.value);
        }
    }
});
```
Only one of each kind of click handler is added,
to the element in the first argument.

