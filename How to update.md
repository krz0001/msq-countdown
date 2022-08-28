# How to update

On the [Lodestone](https://fr.finalfantasyxiv.com/lodestone/playguide/db/quest/?category2=0&page=1), run the following command:

```js
var elements = document.querySelectorAll('.db-table .db-table__txt--detail_link');
console.log(Array.from(elements).map(function(element) {
    return element.textContent;
    }
));
```

Right click and select "Copy object" to copy the array.
