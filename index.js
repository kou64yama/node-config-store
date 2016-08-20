'use strict';

const FlatJSON = require('flat-json');

class ConfigStore {
  constructor() {
    this._config = {};
    this._keys = [];
  }

  has(name) {
    return this._config.hasOwnProperty(name) ||
      Boolean(this._keys.find(
        x => x.startsWith(`${name}.`) || x.startsWith(`${name}[`)
      ));
  }

  get(name) {
    if (!this.has(name)) {
      return undefined;
    }

    if (this._config.hasOwnProperty(name)) {
      return this._config[name];
    }

    const config = {};
    this._keys.filter(x => x.startsWith(`${name}.`)).forEach(x => {
      config[x.slice(name.length + 1)] = this._config[x];
    });
    this._keys.filter(x => x.startsWith(`${name}[`)).forEach(x => {
      config[x.slice(name.length)] = this._config[x];
    });

    return FlatJSON.unflatten(config);
  }

  is(name) {
    return Boolean(this.get(name));
  }

  set(name, value) {
    let obj;
    if (typeof name === 'object') {
      obj = name;
    } else {
      obj = {};
      obj[name] = value;
    }

    Object.assign(this._config, FlatJSON.flatten(obj));
    this._keys = Object.keys(this._config);
  }

  remove(name) {
    this._keys.filter(
        x => x.startsWith(`${name}.`) || x.startsWith(`${name}[`)
    ).concat(name).forEach(x => {
      delete this._config[x];
    });

    this._keys = Object.keys(this._config);
  }

  keys() {
    return this._keys;
  }
}

module.exports = ConfigStore;
