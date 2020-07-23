# MMM-BinaryClock

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Re-written the module to remove the DOM rebuild every second. DOM is now built once and the images are blocked/unblocked.
Removed the H-M-S as I just could not get them to align correctly when size changes.

![GitHub Logo](/img/Binary_Clock_screenshot.jpg)

## Using the module - moment.js

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-BinaryClock',
            position:"top_left",
            config: {
                size: 30
                }
        }
    ]
}
```
If you want to change the graphics you can download any icon and save in img folder, then change ledOn and off names in start function
 
work may need to be done on the image size and also the CSS for padding and DIV container size to align it.

Will look at cleaning up the code and making it more user friendly at some time

