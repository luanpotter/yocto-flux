const { describe, it } = require('mocha');
const { expect } = require('chai');
const store = require('../src/index.js');

describe('yocto-flux', function() {
	describe('chained', function() {
		it('allows for chained', function() {
			store.reset();

			const a = [];

			store.on('event', v => {
				a.push(v);
				if (a.length < 2) {
					store.emit('event', 'value');
				}
			});
			store.emit('event', 'value');

			expect(a.length).to.eql(2);
		});
	});
});
