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

The first argument is optional and defaults to document.body.
Use it only if you think it would be too busy just to listen to the body.
It can be a node or string, to restrict the area listened to.
If a string, it is a selector that can match one or more nodes.
