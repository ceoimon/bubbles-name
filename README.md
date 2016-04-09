# bubbles-name
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Using ES6 refactored the bubbles.js from codecademy course - "Animate Your Name".

Source: http://s3.amazonaws.com/codecademy-content/courses/hour-of-code/js/bubbles.js

Usage
-------
Using [UMD](https://github.com/umdjs/umd) to made it works in Node, AMD and browser globals.

**Note:** you must create a canvas element in your HTML.
### Configuration

First, you must configured a ES6 environment.
Or using compiler like [babel](http://babeljs.io/) to compile it.
Or use `bubbles.cp.js` which is a compiled version.

#### Node
1. Put it in your project.
2. Import it using `import bubblesName from 'path/to/file'`
3. Use `bubblesName.drawName(...)`

#### AMD
1. Put it in your project.
2. Import it using `require([..., 'path/to/file'], ...)`
3. Use `drawName(...)`

#### Global
1. Put it in your project.
2. Import it using `<script type="text/javascript" src="path/to/file"></script>`
3. Use `ceoimon.drawName(...)`

### API
#### `drawString(opts)`
`opts` is a Object:
```js
const opts = {
  element, // Target canvas element
  width, // number
  height, // number
  shape = 'circle', // string 'square' or 'circle'
  string, // string you want to draw
  colors = Colors // a 2D array
}
```
Except the `colors` property, you must pass a Object contain those property with exactly same name.

`colors` is a 2D array make of like:
```js
const Colors = [ // hsl([hue, saturation, lightness]) format
  [0, 100, 63], // red
  [40, 100, 60], // orange
  [75, 100, 40], // green
  [196, 77, 55], // blue
  [280, 50, 60] // purple
]
```
## License
-------
MIT. Copyright (c) [ceoimon](http://ceoimon.com).
