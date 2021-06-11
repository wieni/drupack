Drupack
======================

> A drupal theme made by Wieni using magic powers

## Installation
This theme should be used as a starting point for new custom themes.
Because of this, the theme has no `composer.json` file and dependencies
should be added to the project this theme is created in.

```bash
git clone https://github.com/wieni/drupack.git public/themes/custom/drupack
```

## Define an entry point
An entry point, always has a name (the name of the output file) and a corresponding (js) file in `/resources`.

```js
module.exports = {
  entry: {
    global: 'index.js',
    search: 'search.js',
  },
}
```

The following entry will results in two javascript files: `global.js` (`resources/index.js`) and `search.js` (`resources/search.js`). When any of the files contains `css` (or `sass`), the output will be written to a `.css` file with the same name. In this case `global.css` and `search.css`.

## Security
If you discover any security-related issues, please email
[security@wieni.be](mailto:security@wieni.be) instead of using the issue
tracker.

## License
Distributed under the MIT License. See the [LICENSE](LICENSE) file
for more information.
