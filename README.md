# listenup.js
Light and clear events

```js
listenup(document.body, {
    '.hi': {
        click: function (ev) {
            ev.preventDefault();
            alert('Hi');
        },
        onmouseover: function (ev) {
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
Only one click handler actually gets added,
even though two different selectors have a function.
The listeners are added to the element in the first argument.

