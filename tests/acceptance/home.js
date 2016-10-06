'use strict';

process.env.NODE_ENV = 'test';
process.env.PORT = 5000;

const http = require('http');
const path = require('path');

const app = require(path.join('..', '..', 'source', 'server'));
const Browser = require('zombie');

Browser.localhost('darrenhall.co', process.env.PORT);

describe('When a user visits the home page', function () {

    before(function() {
        this.server = http.createServer(app).listen(process.env.PORT);
        this.browser = new Browser();
    });

    beforeEach(function(done) {
        this.browser.visit('/', done);
    });

    it('should display a h1 tag', function () {
        this.browser.assert.elements('h1', { atLeast: 1 });
    });

    after(function(done) {
        this.server.close(done);
    });
});
