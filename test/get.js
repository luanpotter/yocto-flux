const { expect } = require('chai');
const store = require('../src/index.js');

describe('femtostore', function() {
	describe('#get', function() {
		it('gets last', function() {
      store.reset();

      store.emit('event', 1);
      store.emit('event', 2);

      expect(store.get('event')).to.eql(2);

      store.emit('event', 3);
      store.emit('event', 4);

      expect(store.get('event')).to.eql(4);
		});
  });
});
