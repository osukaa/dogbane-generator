# Cipolla

Module with pluggable themes to generate html from the API Blueprint JSON.

## Usage

```javascript
var cipolla = require('cipolla');
var theme = require('hb-theme');

var generator = new cipolla(theme,themeOptions);

generator.render(blueprintJSON, function (err, html) {

});

generator.renderToFile(blueprintJSON, 'path/to/file', function (err) {

});
```
### Constructor Parameters

* `theme` - theme plugin, needs the following interface
    * `theme(options)` - theme constructor
    * `render(blueprint, function (err, html))` generates the html
    * `renderToFile(blueprint, pathToFile, function (err))` generates the html and saves it to a path
* `themeOptions` - any options that are passed to the theme

## Theme interface

When plugin a theme into `cipolla` you should implement this interface:

* 
