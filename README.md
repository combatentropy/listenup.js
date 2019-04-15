# listenup.js
Light and clear events

```js
listenup({
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

Normally just one of each kind of event is added, to the document.body.

In the rare case it might be too busy just to listen to the body,
you can use two arguments.
The first is a node or a selector, restricting the area listened to.

```js
listenup(document.getElementById('area'), {...});  // node
listenup('.hears', {...});  // selector, matching one or more nodes
```
