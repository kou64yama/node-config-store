# ConfigStore

## Installation

```
npm install kou64yama/node-config-store
```

## Usage

```js
var ConfigStore = require('config-store');

var config = new ConfigStore();
config.set({
  server: {
    host: 'localhost',
    port: 8080
  }
});

console.log(config.get('server.host')); // => localhost
console.log(config.get('server.port')); // => 8080
console.log(config.get('server'));      // => { server: 'localhost', port: 8080 }
```

## Contribution

1. Fork it ( https://github.com/kou64yama/node-config-store/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## License

[MIT](https://github.com/kou64yama/node-config-store/blob/master/LICENSE)

## Author

[YAMADA Koji](https://github.com/kou64yama)
