# bubbles-name
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)

Using ES6 refactored the bubbles.js from codecademy course - "Animate Your Name".

Source: http://s3.amazonaws.com/codecademy-content/courses/hour-of-code/js/bubbles.js

## Usage

### ES6 Module
1. Put it in your project.
2. Import it using `import bubblesName from 'path/to/file'`
3. Use `bubblesName.drawName(...)`

### UMD
1. Put it in your project.
2. Import it using `<script type="text/javascript" src="path/to/file"></script>`
3. Use `ceoimon.drawName(...)`

## API

### `drawString(opts)`

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

MIT.
