/**
 * mq.js.
 *
 * @fileOverview A helper for styling responsive pages.
 * @author <a href="mailto:sean@seanmonahan.org?subject=mq.js">Sean Monahan</a>
 * @version 0.1.0
 */

// User CSS as an object.
var my = [

  { query: '', content: 'default' },
  { query: 'only screen and (min-width:320px)', content: 'min-width: 320px' },
  { query: 'only screen and (min-width:460px)', content: 'min-width: 460px' },
  { query: 'only screen and (min-width:768px)', content: 'min-width: 768px' }

];

// User CSS. Minified for ease of embedding.
var my_styles = '#mq-media:after{content:"default"}@media only screen and (min-width:320px){#mq-media:after{content:"min-width: 320px"}}@media only screen and (min-width:460px){#mq-media:after{content:"min-width: 460px"}}@media only screen and (min-width:768px){#mq-media:after{content:"min-width: 768px"}}';

(function(user_css) {

// Minified mq.js for ease of adding.
var mq_styles = '#mq{font-family:sans-serif;background:#000;background:rgba(0,0,0,.5);color:#fff;'
              + 'min-height:30px;position:fixed;right:10px;bottom:10px;left:10px;padding:4px 8px;'
              + 'border-radius:5px;text-align:left;vertical-align:middle;line-height:30px}'
              + '#mq>span{margin-right:15px;display:inline-block}#mq>span span:first-child{font-weight:700}'
              + '@media all and (min-width:1px){.mq-test{position:absolute}}@media only screen and (max-width:310px)'
              + '{#mq>span span:first-child{display:block}}@media only screen and (max-width:540px)'
              + '{#mq>span{display:block}}@media only screen and (min-width:541px){#mq>span{display:inline}}';

///////////////////////////////////////////////////////////
function browserSupportsMediaQueries() {

  var supported = false;
  var div = document.createElement('div');
  div.className = 'mq-test';
  document.body.appendChild(div);
  if (window.getComputedStyle && window.getComputedStyle(div).position === 'absolute') {
    supported = true;
  }
  document.body.removeChild(div);
  return supported;
}


///////////////////////////////////////////////////////////
function attachEvent(el, event, listener) {

  if (el.addEventListener) {
    el.addEventListener(event, listener);
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, listener);
  }
}


///////////////////////////////////////////////////////////
function injectStyles(styles) {

  var head = document.head || documents.getElementsByTagName('head')[0];
  var style = document.createElement('style');

  style.type = 'text/css';
  // if (style.styleSheet) {
  //   style.styleSheet.cssText = styles;
  // } else {
    style.appendChild(document.createTextNode(styles));
  // }

  head.appendChild(style);
}


///////////////////////////////////////////////////////////
function addUserQueries(queries) {

  if (Object.prototype.toString.apply(queries) === '[object String]') {
    injectStyles(queries);
  } else {
    var s = '';
    var tmp = null;
    var query_template =
      '@media {!query} {\n' +
      '  {!style}' +
      '}\n';

    var content_template =
      '#mq-media:after {\n' +
      '    content: "{!content}";\n' +
      '  }\n';

    // for (var q in queries) {
    for (var i = 0; i < queries.length; ++i) {

      var q = queries[i];

      if (q.hasOwnProperty('content')) {
        tmp = content_template.replace('{!content}', q.content);
      }

      if (q.hasOwnProperty('query')) {
        tmp = query_template.replace('{!query}', q.query).replace('{!style}', tmp);
      }

      s += tmp;
    }

    injectStyles(s);
  }
}


///////////////////////////////////////////////////////////
function onLoad() {

  var body = document.body;
  if (body) {
    var q = document.createElement('div');
    q.id = 'mq';
    body.appendChild(q);

    injectStyles(mq_styles);
    if (typeof user_css !== 'undefined') {
      addUserQueries(user_css);
    }

    if (browserSupportsMediaQueries()) {


      var media = document.createElement('span');
      media.id = 'mq-media';

      var media_label = document.createElement('span');
      media_label.innerHTML = '[Media Query]: ';
      media.appendChild(media_label);

      q.appendChild(media);

      var size_wrapper = document.createElement('span');

      var size_label = document.createElement('span');
      size_label.innerHTML = '[Window Size]: ';
      size_wrapper.appendChild(size_label);

      var size = document.createElement('span');
      size.id = 'mq-size';
      size_wrapper.appendChild(size);

      q.appendChild(size_wrapper);

      onResize();
      attachEvent(window, 'resize', onResize);

    } else {
      q.innerHTML = "Your browser does not appear to support media queries.";
    }
  }
}


///////////////////////////////////////////////////////////
function getWindowSize() {

  var w;
  var h;

  if (window.innerWidth) {
    w = window.innerWidth;
    h = window.innerHeight;
  }

  return { width: w, height: h };
}


///////////////////////////////////////////////////////////
function onResize() {

  var qs = document.getElementById('mq-size');
  if (qs === null) return;

  var size = getWindowSize();
  qs.innerHTML = size.width + ' x ' + size.height + 'px';
}


///////////////////////////////////////////////////////////
attachEvent(window, 'load', onLoad);

}(my_styles));