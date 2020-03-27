# Drupack

A **brand new version 3** of our favorite Wieni\_ theme.

## Define an entry point

An entry point, always has a name (the name of the output file) and a corresponding (js) file in `/resources`.

```js
module.exports = {
  entry: {
    global: "index.js",
    search: "search.js",
  },
};
```

The following entry will results in two javascript files: `global.js` (`resources/index.js`) and `search.js` (`resources/search.js`). When any of the files contains `css` (or `sass`), the output will be written to a `.css` file with the same name. In this case `global.css` and `search.css`.
