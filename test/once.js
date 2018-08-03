const { describe, it } = require('mocha');
const { expect } = require('chai');
const store = require('../src/index.js');

describe('yocto-flux', function() {
	describe('#once', function() {
		it('emits once and stops', function() {
			store.reset();

			const a = [];

			store.emit('event', 1);

			store.once('event', v => a.push(v));

			store.emit('event', 2);
			store.emit('event', 3);
			store.emit('event', 4);

			expect(a).to.eql([2]);
		});
	});
});
