const { expect } = require('chai');
const store = require('../src/index.js');

describe('femtostore', function() {
	describe('#on(), #emit', function() {
		it('works', function() {
      const a = [];
      store.on('event', v => a.push(v));
      store.emit('event', 'value');

      expect(a).to.eql(['value']);
		});
  });
});
