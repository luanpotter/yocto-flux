const { expect } = require('chai');
const store = require('../src/index.js');

describe('yocto-flux', function() {
	describe('#on, #emit', function() {
		it('emit after on', function() {
      store.reset();

      const a = [];

      store.on('event', v => a.push(v));
      store.emit('event', 'value');

      expect(a).to.eql(['value']);
		});

		it('emit before on', function() {
      store.reset();

      const a = [];

      store.emit('event', 'value');
      store.on('event', v => a.push(v));

      expect(a).to.eql(['value']);
		});

		it('multiple emit', function() {
      store.reset();

      const a = [];

      store.emit('event', 1);
      store.on('event', v => a.push(v));
      store.emit('event', 2);
      store.emit('event', 3);

      expect(a).to.eql([1, 2, 3]);
		});

		it('multiple events', function() {
      store.reset();

      const a1 = [], a2 = [];

      store.on('e1', v => a1.push(v));
      store.on('e2', v => a2.push(v));

      store.emit('e1', 1);
      store.emit('e2', 2);
      store.emit('e1', 1);
      store.emit('e2', 2);
      store.emit('e2', 2);
      store.emit('e2', 2);
      store.emit('e2', 2);

      expect(a1).to.eql([1, 1]);
      expect(a2).to.eql([2, 2, 2, 2, 2]);
		});

		it('emit only last previous', function() {
      store.reset();

      const a = [];

      store.emit('event', 1);
      store.emit('event', 2);
      store.emit('event', 3);
      store.on('event', v => a.push(v));
      store.emit('event', 4);
      store.emit('event', 5);

      expect(a).to.eql([3, 4, 5]);
		});
  });
});
