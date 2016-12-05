### Simple virtual-dom implementation
[![Build Status](https://travis-ci.org/linuxenko/basic-virtual-dom.svg?branch=master)](https://travis-ci.org/linuxenko/basic-virtual-dom) [![Coverage Status](https://coveralls.io/repos/github/linuxenko/basic-virtual-dom/badge.svg?branch=master)](https://coveralls.io/github/linuxenko/basic-virtual-dom?branch=master)

[![Example](https://raw.githubusercontent.com/linuxenko/basic-virtual-dom/master/examples/misc/inspect.gif)](https://raw.githubusercontent.com/linuxenko/basic-virtual-dom/master/examples/misc/inspect.gif)

Experimental implementation of the virtual dom.

### Features
  Support of following patch types:

  * `PATCH_CREATE`
  * `PATCH_REMOVE`
  * `PATCH_REORDER`
  * `PATCH_PROPS`
  * Small amount of diffing iterations
  * Referal based patches without identifiers
  * No iterations over the virtual or dom tree when applying patches

### Example

Simple day countdown example 
```javascript
/** @jsx h */

import {h, patch, diff} from '../../';

var initialDom = (
  <div>
    <div><h3>Counter</h3></div>
  </div>
);

document.getElementById('application')
  .appendChild(initialDom.render());

setInterval(function() {
  var cd = countDown();
  var countDownDom = (
    <div>
      <div><h3>Day Countdown</h3></div>
      <div className="clock">
        <strong>{cd.h}</strong> :&nbsp;
        <strong>{cd.m}</strong> :&nbsp;
        <strong>{cd.s}</strong>
      </div>
    </div>
  );

  var diffs = diff(initialDom, countDownDom);
  patch(initialDom, diffs);

}, 1000);
```
### TODO
  * style attribute support
  * implement referals
  * event handlers
  * test very deep trees

### License
MIT (c) Svetlana Linuxenko
