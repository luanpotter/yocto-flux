const store = {
    callbacks: {},
    lasts: {},
    evt(event) {
        store.callbacks[event] = store.callbacks[event] || [];
        return store.callbacks[event];
    },
    next(event, callback) {
        const id = Symbol();
        store.evt(event).push({id, callback});
        return id;
    },
    on(event, callback) {
        const id = store.next(event, callback);
        if (store.lasts[event]) {
            callback(store.lasts[event].data);
        }
        return id;
    },
    once(event, callback) {
        return new Promise(resolve => {
            const id = store.next(event, data => {
                store.clear(id);
                callback && callback(data);
                resolve(data);
            });
        });
    },
    emit(event, data) {
        store.evt(event).forEach(i => i.callback(data));
        store.lasts[event] = { data };
    },
    get(event) {
        return store.lasts[event].data;
    },
    clear(...ids) {
        ids.forEach(id => Object.keys(store.callbacks).forEach(key => store.callbacks[key] = store.callbacks[key].filter(e => e.id !== id)));
    },
    reset() {
      store.callbacks = {};
      store.lasts = {};
    },
};

module.exports = store;
