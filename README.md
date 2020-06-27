# listenup.js
Light and clear events

```js
listenup({
    '.hi': {
        mouseover: function () {
            this.textContent = "I'll say hi";
        },
        click: function () {
            alert('Hi');
        }
    },
    '.stuff > li': {
        click: function (ev) {
            console.log('This is item #' + this.value);
        }
    },

    // Default events (experimental)
    form: function (ev) {
        ev.preventDefault();
        // ajax stuff here ... 
    },

    '.clickable': function () {
        alert('I was clicked!');
    }
});
```

This makes just one listener for each kind of event (click, change, etc.),
added to the document.body.

In case that would be too busy (e.g., filtering every click on the body),
you can use two arguments.
The first is a node or selector, restricting the area listened to.

```js
listenup(document.getElementById('area'), {...});  // node
listenup('.hears', {...});  // selector, matching one or more nodes
```
