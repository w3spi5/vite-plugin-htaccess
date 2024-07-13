# vite-plugin-htaccess

A Vite plugin to generate .htaccess files.

## Installation

```bash
npm install vite-plugin-htaccess --save-dev
```

## Why ?

To protect files like manifest.json could be a good entry point

## Usage

In your `vite.config.js`

```js
import { defineConfig } from 'vite';
import createHtaccessPlugin from 'vite-plugin-htaccess';

export default defineConfig({
  plugins: [
    createHtaccessPlugin()
  ],
  build: {
  	manifest: true, // simple purpose
    outDir: 'public/build' // or 'dist' or whatever you want
  }
});
```

This will create a `.htaccess` file in the `public/build/.vite/` directory with the following content :

```python
# BEGIN Vite
<Files "manifest.json">
    Require all denied
</Files>
# END Vite
```

## Testing

```bash
$ npm test

> vite-plugin-htaccess@1.0.2 test
> jest

PASS tests/vite-plugin-htaccess.test.js
  Vite Plugin Htaccess
    √ should create .htaccess file if it does not exist (12 ms)
    √ should append to .htaccess file if content does not exist (8 ms)
    √ should not duplicate content if already present (6 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.776 s, estimated 2 s
Ran all test suites.
```

## Licence

The MIT License (MIT)

Copyright (c) 2024 wespify.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.