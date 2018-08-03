const store = require('../src/index.js');

store.on('ha', console.log);
store.emit('ha', 'hello, world');
