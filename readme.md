## Clipboardy

[Clipboardy][chrome-store-url] is a Chrome extension for copying posted code to clipboard from stackoverflow.com, github.com & npmjs.com.

<img src="docs/images/clipboardy_screen_recording.gif" width="600px"/>

The extension allows to:

*  Copy the source code to clipboard with just one click
*  Select the source text
*  Collapse the source text
*  Show the history of clipboard usage
*  Configurable toolbar

Install the app from [chrome store][chrome-store-url] or see the full description on the [product page][product-page-url].

## Changelog

* v0.9.4 - Fix the content script patterns to match https for stackoverflow
* v0.9.3 - Fix context menu creation when disabled extension is updated
* v0.9.2 - Use event page
* v0.9.1 - By default all buttons are enabled
* v0.9.0 - First product release version

## Development

You should have installed at least node version 0.12.  

Clone the repository into your projects directory:
```
git clone git@github.com:panzerdp/clipboardy.git clipboardy-chrome-extension
```

Install gulp globally:
```
npm install --global gulp
```

Install the dependencies within the project directory:
```
npm install
```

Run the builder and watcher:
```
gulp
```

Install the extension in Chrome browser from local source folder. More details [here](https://developer.chrome.com/extensions/getstarted#unpacked).

## Author

[Dmitri Pavlutin](http://dmitripavlutin.com/about-me/)

## License
The MIT License (MIT)

Copyright (c) 2016 Dmitri Pavlutin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[chrome-store-url]: https://chrome.google.com/webstore/detail/clipboardy/gkafpbdjggkmmngaamlghmigadfaalhc
[product-page-url]: http://rainsoft.io/clipboardy-chrome-extension