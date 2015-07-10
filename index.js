var hoek = require('hoek');

var internals = {};

module.exports = internals.cipolla = function (theme, themeOptions) {

    themeOptions = themeOptions || {};

    if (!(this instanceof internals.cipolla)) {
       return new internals.cipolla(theme, themeOptions);
    }

    this._theme = theme;
    this._theme.setOptions(themeOptions);
};

internals.cipolla.prototype.render = function (blueprint, callback) {

    hoek.assert(typeof callback === 'function', 'A callback is needed.');

    this._theme.render(blueprint, function(err, html) {

        if (err) {
            return callback(err);
        }

        return callback(null, html);
    });
};

internals.cipolla.prototype.renderToFile = function (blueprint, pathToFile, callback) {

    hoek.assert(typeof callback === 'function', 'A callback is needed.');

    this._theme.renderToFile(blueprint, pathToFile, function (err) {

        if (err) {
            return callback(err);
        }

        return callback(null);
    });
};
