# MMM-BinaryClock

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Todo: Create a simple Binary clock

## Using the module - moment.js

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-BinaryClock',
            position:"top_left",

        }
    ]
}
```
If you want to change the graphics you can download any icon and save in img folder, then change ledOn and off names in start function
 
work may need to be done on the image size and also the CSS for padding and DIV container size to align it.

Will look at cleaning up the code and making it more user friendly at some time

