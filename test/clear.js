const { expect } = require('chai');
const store = require('../src/index.js');

describe('femtostore', function() {
	describe('#clear', function() {
		it('does not receive after clear', function() {
      store.reset();

      const a = [];

      const id = store.on('event', v => a.push(v));

      store.emit('event', 1);
      store.emit('event', 2);
      store.clear(id);
      store.emit('event', 3);
      store.emit('event', 4);

      expect(a).to.eql([1, 2]);
		});

		it('clears multiple', function() {
      store.reset();

      const a = [];
      const ids = [];

      ids.push(store.on('e1', v => a.push(v)));
      ids.push(store.on('e2', v => a.push(v)));

      store.emit('e1', 1);
      store.emit('e2', 2);
      store.clear(...ids);
      store.emit('e1', 3);
      store.emit('e2', 4);

      expect(a).to.eql([1, 2]);
		});
  });
});
