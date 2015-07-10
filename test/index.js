var code = require('code');
var expect = code.expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var sinon = require('sinon');
var cipolla = require('..');

lab.experiment('cipolla', function () {

    lab.test('instance of ', function (done) {

        var setOptions = sinon.spy();
        var theme = {
            setOptions: setOptions
        }
        var generator = new cipolla(theme);
        expect(generator).to.be.an.instanceof(cipolla);
        expect(setOptions.called).to.be.true();
        done();
    });

    lab.test('with options object', function (done) {

        var setOptions = sinon.spy();
        var theme = {
            setOptions: setOptions
        }
        var generator = new cipolla(theme, { something: 'something' });
        expect(generator).to.be.an.instanceof(cipolla);
        expect(setOptions.called).to.be.true();
        done();
    });

    lab.test('using without being an instance', function (done) {

        var setOptions = sinon.spy();
        var theme = {
            setOptions: setOptions
        }
        var generator = cipolla(theme, { something: 'something' });
        expect(generator).to.be.an.instanceof(cipolla);
        expect(setOptions.called).to.be.true();
        done();
    });

    lab.test('render with no callback', function (done) {

        var setOptions = sinon.spy();
        var theme = {
            setOptions: setOptions
        }
        var generator = new cipolla(theme);
        try {
            expect(generator.render('# Wut')).to.throw(Error, 'A callback is needed.');
        } catch (e) {
            expect(e).to.exist();
            expect(e).to.match(/A callback is needed./);
            done();
        }
    });

    lab.test('render correctly', function (done) {

        var blueprint = '# Wut';
        var setOptions = sinon.spy();
        var render = sinon.stub().callsArg(1);
        var theme = {
            setOptions: setOptions,
            render: render
        }
        var callback = sinon.spy();
        var generator = new cipolla(theme);
        generator.render(blueprint, callback);
        expect(render.called).to.be.true();
        expect(render.args[0][0]).to.equals(blueprint);
        expect(callback.called).to.be.true();
        expect(callback.args[0][0]).to.not.exist();
        done();
    });

    lab.test('render error', function (done) {

        var blueprint = '# Wut';
        var setOptions = sinon.spy();
        var theme = {
            setOptions: setOptions,
            render: function(blueprint,callback) {
                callback(new Error('wut'));
            }
        }
        var callback = sinon.spy();
        var generator = new cipolla(theme);
        generator.render(blueprint, callback);
        expect(callback.called).to.be.true();
        expect(callback.args[0][0]).to.match(/wut/);
        done();
    });

    lab.test('renderToFile correctly', function (done) {

        var blueprint = '# Wut';
        var pathToFile = 'path/to/file'
        var setOptions = sinon.spy();
        var render = sinon.stub().callsArg(2);
        var theme = {
            setOptions: setOptions,
            renderToFile: render
        }
        var callback = sinon.spy();
        var generator = new cipolla(theme);
        generator.renderToFile(blueprint,pathToFile, callback);
        expect(render.called).to.be.true();
        expect(render.args[0][0]).to.equals(blueprint);
        expect(render.args[0][1]).to.equals(pathToFile);
        expect(callback.called).to.be.true();
        expect(callback.args[0][0]).to.not.exist();
        done();
    });

    lab.test('renderToFile correctly', function (done) {

        var blueprint = '# Wut';
        var pathToFile = 'path/to/file'
        var setOptions = sinon.spy();
        var theme = {
            setOptions: setOptions,
            renderToFile: function (blueprint,pathToFile,callback) {
                callback(new Error('wut'));
            }
        }
        var callback = sinon.spy();
        var generator = new cipolla(theme);
        generator.renderToFile(blueprint,pathToFile, callback);
        expect(callback.called).to.be.true();
        expect(callback.args[0][0]).to.match(/wut/);
        done();
    });
});
