# yocto-flux

[![Build Status](https://travis-ci.org/luanpotter/yocto-flux.svg?branch=master)](https://travis-ci.org/luanpotter/yocto-flux) [![Coverage Status](https://coveralls.io/repos/github/luanpotter/yocto-flux/badge.svg?branch=master)](https://coveralls.io/github/luanpotter/yocto-flux?branch=master)

A yocto-scale lightweight substitute for Flux/Redux.

yocto-flux is a teeny-tiny event handler (emitter/receiver) that can be used as a very simple store for smaller applications.

If you just want to bootstrap a page and don't want to add all the complexities and abstractions of Flux/Redux/Mobx, use yocto-flux!

## Install

Just drop it to your `packages.json`:

```bash
    npm i --save yocto-flux
```

## Simple Example

Just import the store anywhere you desire and either send a message with `emit` or register a callback with `on`:

```javascript
    const store = require('store');

    store.on('overlay', v => $('#overlay').toggle(v));

    // elsewhere
    store.emit('overlay', true);
```

This is just a silly example, anything can be emitted and will be received by every handler.

The full API is quite simple, actually:

 * `evt(event_name)`: get the array of registered callbacks for this event (this is used internally)
 * `next(event_name, callback)`: like `on`, but doesn't call for the last event emitted. It returns the id of the callback as well.
 * `on(event_name, callback)`: register the callback to be called every time event_name is emitted, it will fire for the last sent event if any. It returns an assigned id for the registered callback to be cleared later with `clear`.
 * `once(event_name, callback)`: register the callback to run once in the future (like next, but unregister after first called). It also returns a Promise that resolves when the next value is emitted. The callback parameter is optional.
 * `emit(event_name, value)`: emits the value provided to every listener of the given event_name.
 * `get(event_name)`: gets the last emitted value for this event, or undefined if the event was never emitted.
 * `clear(...ids)`: clear the given ids, that is, unregister their callbacks.
 * `reset()`: completely clears everything (useful for testing).

The common parameters are:

 * `event_name`: a name for the event, in order to identify it. Technically it is compared with the equality operator, so any reference would work, but the intended use is for Strings. You can define your own patterns for namespacing and conventions.
 * `callback`: the callback function to be called when an event is emitted; it takes as first parameter the value emitted.
 * `id`: the id of the registered callback. Any calls to next or on will return an id to the registered callback, that is basically a new unique Symbol. It can be used to later clear that callback.
 * `value`: the value that was emitted; it can be anything.

## React Example

On React, it's very easy to use this to message stuff between your components.

Again, be warned that this is a very simplistic approach and will rot quickly in larger projects; consider using a more robust solution, like <a href="https://github.com/ohager/nanoflux">nanoflux</a> for that.

But you could use it like so:

```javascript
    class ListPeople extends Component {
        componentWillMount() {
          this.ids = [];
          this.ids.push(store.on('login', login_data => this.setState({ login_data })));
        }

        componentWillUnmount() {
          store.clear(this.ids);
        }
    }
```

Don't forget to clear any registered callbacks on `componentWillUnmount` method!

## Want more?

This is **very** simple. It's *yocto* in size. So, 10^12 times smaller than nano (maybe not literally).

If you have something bigger, this is hard to keep organized. I would suggest using a more complex and feature-full implementation of Flux/Redux/anything, starting with <a href="https://github.com/ohager/nanoflux">nanoflux</a> or the standard libs (from Facebook or others).

## Contribute!

Please, do so!

* Fork it!
* Create a feature branch.
* Make your modifications (remember to KISS)
* Submit your PR

Any help is appreciated! Thanks!

