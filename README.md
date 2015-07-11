# Cipolla

Module with pluggable themes to generate html from the API Blueprint JSON.

## Usage

```javascript
var cipolla = require('cipolla');

var generator = new cipolla(require('cipolla-test-theme'));

generator.render(blueprintJSON, function (err, html) {

});

generator.renderToFile(blueprintJSON, 'path/to/file.html', function (err) {

});
```
### Constructor Parameters

* `theme` - theme plugin, needs the following interface
    * `theme(options)` - theme constructor
    * `render(blueprint, callback)` generates the html, the callback has the signature `function(err, html)`
        * `err` any error during render
        * `html` compiled html
    * `renderToFile(blueprint, pathToFile, callback)` generates the html and saves it to a path, the callback has the signature `function(err)`
        * `err` any error during render to file
* `themeOptions` - optional options object to pass to the theme constructor

## Theme interface

When plugin a theme into `cipolla` you should implement this interface:

* `Constructor(options)` constructor for the theme
* `setOptions(options)` function that set the options passed to the theme from cipolla
* `render(blueprint, callback)` function that renders templates and returns an html on callback, callback parameters
    * `err` if there's any error present
    * `html` render html from the template
* `renderToFile(blueprint,pathToFile, callback)` function that renders template directly to a file, callback parameters
    * `err` if there's any error
