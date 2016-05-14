/**
 * Get DOM-elements by className or by ID
 * @param  {string} o Class or ID. For example: '.someclass' or '#someid'
 * @return {object}   Returns DOM object
 */
function get(o){
  if (!o) throw new TypeError();

  // Identifier
  var attr;
  typeof o === 'object' ? attr = o: attr = o.slice(0, 1);

  // Check if it was given a class name
  if (attr === '.'){
    return document.getElementsByClassName(o.slice(1, o.length));
  // Check if it was given an id
  }else if (attr === '#'){
    return document.getElementById(o.slice(1, o.length));
  // Check if it was given an object
  }else if (typeof attr === 'object'){
    return o;
  }
}

/**
 * Shortest console.log
 * @param  {any} el Could be any type
 * @return {undefined}    Doesn't return anything
 */
function log(){
  console.log(arguments);
}

/**
 * Set css to DOM objects
 * @param  {object} o DOM element
 * @param  {ojbect} p Object with css properties
 * @return {object}   Returns DOM element
 */
function css(o, p){
  if (!o && !p) throw new TypeError();
  for (var i in p){
    o.style[i] = p[i];
  }
  return o;
}

/**
 * Check element type
 * @param  {Object}  a Element to check
 * @return {Boolean}   Return true or false
 */
function isArray (a) {
  if ( a &&
       a.length &&
       a.length >= 0 &&
       isFinite(a.length) &&
       a.length <= Math.pow(2, 32) ){
    return true;
  }else{
    return false;
  }
}

Object.defineProperties(Object.prototype, {
/**
 * Change text in the element
 * @param  {string} t new string to change the old one
 * @return {object}   returns an object
 */
  replaceText:{
    value: function (t, n) {
      /**
       *
       * Check incoming parameter on its existing
       *
       */
      var mes = 'There are no any text.'
      if (!t) throw new TypeError(mes);

      /**
       *
       * Check incoming parameter on its type
       *
       */
      mes = 'It is not an object'
      if (typeof t !== 'string') throw new TypeError(mes);

      this.removeChild(this.childNodes[0]);
      this.appendChild(document.createTextNode(t));

      return this;
    },
    writable: true,
    enumerable: false,
    configurable: true
  },
/**
 * A shortcut to get text in the element
 * @return {string} return string value of the element
 */
  getText: {
    value: function () {
      var mes = 'Apply this method to object.'
      if (typeof this !== 'object') throw new TypeError(mes);
      return this.childNodes[0].nodeValue;
    },
    writable: true,
    enumerable: false,
    configurable: true
  }
});

/**
 * Get DOM-elemnt children
 * @return {object} Returns 
 */
HTMLElement.prototype.getChildren = function () {
  var children = []
    , child;
  if (classOf(this) === 'Array'){
    this.forEach(function(x, i, a){
      if (x.children.length){
        child = x.children;
        for (var i in child){
          if (child.hasOwnProperty(i)){
            children.push(child[i]);
          }
        }
      }
    })
  }else if (classOf(this) === 'HTMLElement'){
    if (this.children.length) {
      child = this.children;
      for (var i in child){
        console.log(child.hasOwnProperty(i));
        if (child.hasOwnProperty(i)){
          children.push(child[i]);
        }
      }
    }
  }
  return children;
}

Array.prototype.getChildren = HTMLElement.prototype.getChildren;

function typeAndValue(x) {
  if (x == null) return '';
  switch (x.constructor){
    case Number: return 'Number: ' + x;
    case String: return 'String: \'' + x + '\'';
    case Date: return 'Date: ' + x;
    case Boolean: return 'Boolean: ' + x;
    case RegExp: return 'RegExp: ' + x;
    case List: return 'List: ' + x;
  }
}

/**
 * Define object class
 * @param  {object} o Object is need to check
 * @return {string}   Returns object class which object belongs
 */
function type(o){

  var c, t, n;

  if (o === null) return 'null';

  if (o !== o) return 'nan';

  if ((t = typeof o) !== 'object') return t;

  if ((c = classOf(o)) !== 'Object') return c;

  if (n = o.constructor.getName()) return n;

  return 'Object';
}

/**
 * Define objects class name
 * @param  {object} o Object is need to define it's class
 * @return {string}   Class name
 */
function classOf (o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}
/**
 * Function method defining function constructor name
 * @return {string} Function constructor name
 */
Function.prototype.getName = function() {
  if ('name' in this) return this.name;
  return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
}

function quacks (o /*, ...*/) {
  for (var i = 1; i <= arguments.length - 1; i++){
    var arg = arguments[i];
    switch (typeof arg) {
      case 'string':
        if (o[arg] !== 'function') return false;
        continue;
      case 'function':
        arg = arg.prototype;
      case 'object':
        for (var j in arg){
          if (typeof arg[j] !== 'function') continue;

          if (typeof o[j] !== 'function') return false;
        }
    }
  }
  return true;
}

/**
 * Vertical container aligning
 * @return {undefined} Doesn't return anything
 */
(function() {
  var container = get('#container'), cHeight = container.clientHeight;
  if (screen.availHeight) {
    var m = (screen.availHeight - cHeight)/6;
    css(container, {marginTop: m + 'px'});
  }
}());

/**
 * Safety XMLHttpRequest constructor calling
 * @return {object} XMLHttpRequest object
 */
function xhr() {
  if (window.XMLHttpRequest === undefined) {
    try {
      return new ActiveXObject('Msxml2.XMLHTTP.6.0')
    }
    catch(e1) {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.3.0')
      }
      catch(e2) {
        throw new Error('XMLHttpRequest doesn\'t support');
      }
    }
  }else {
    return new XMLHttpRequest();
  }
}

/**
 * Making an array from the string
 * @param  {string} str Incoming string
 * @return {object}     Returning object
 */
function parseToArr(str){
  if (typeof str !== 'string') throw new TypeError('Incoming parameter is not an object. It is ' + typeof str);
  var arr = [];
  for (i = 0; i < str.length - 1; i++){
    if (str[i] !== ' ' && typeof parseInt(str[i]) === 'number'){
      arr.push(!!parseInt(str[i]));
    }
  }
  return arr;
}

/**
 * Making a string to array
 * @param  {object} arr Incoming array
 * @return {[type]}     Returning array
 */
function parseLogic(arr) {
  /**
   *
   * If not an array or an object
   *
   */
  if (!arr) throw new TypeError('Incoming parameter is not an object. It is ' + typeof arr);

  var obj = {}
  , logicName
  , logicValue;

  /**
    *
    * Iterate each algorithms point
    *
    */
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];

    logicName = str.slice(0, str.indexOf('-') - 1);
    logicValue = str.slice(str.indexOf('-') + 2);

    /**
     *
     * Create new object in obj
     *
     */
    obj[i] = {};

    /**
     *
     * Write scripts name and value
     *
     */
    obj[i].name = logicName;
    obj[i].value = logicValue;

  }
  return obj;
}

function count(i) {
  i == undefined ? i = 0: i;
  return function() {
    return i++;
  }
}

/**
 * Set coookie to the document.cookie
 * @param {string} name       Property name
 * @param {any} value      Property value
 * @param {number} daysToLive Cookies live time
 */
function setCookies(name, value, daysToLive){
  var cookie = name + '=' + encodeURIComponent(value);
  if (typeof daysToLive === 'number'){
    cookie += '; max-age=' + (daysToLive*60*60*24);
  }
  document.cookie = cookie;
}

/**
 * Get cookie from document.cookie
 * @return {object} Returns cookies
 */
function getCookies() {
  var cookies = {};
  var all = document.cookie;
  if (all === '') return cookies;
  var list = all.split('; ');
  for (var i = 0; i <= list.length - 1; i++){
    var cookie = list[i];
    var p = cookie.indexOf('=');
    var name = cookie.slice(0, p);
    var value = cookie.slice(p + 1);
    value = decodeURIComponent(value);
    cookies[name] = value;
  }
  return cookies;
}

function deleteCookies(name){
   document.cookie = name + '=' + '; expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

function toHTMLView(obj, i) {

  if (typeof obj !== 'object') throw new TypeError('Incoming parameter doesn\'t have \'object\' type');

  /**
   *
   * Get layout
   *
   */
  var layout = get('.ready-algorithm')[0]
    , title = (layout.getChildren()).getChildren();

  /**
    *
    * Create new class to layout
    *
   */
  layoutClass = layout.className.slice(0, layout.className.lastIndexOf('-') + 1) + i;
  layout.className = layoutClass;

  console.log(layout);


  // article = article[last];

  // var clone = article.cloneNode(true)
  //   , index = parseInt(clone.className.slice(clone.className.lastIndexOf('-') + 1));

  // clone.className = clone.className.slice(0, clone.className.lastIndexOf('-') + 1) + (index + 1);

  // clone.id = '';

  // clone.onclick = function (){
  //   if (!this.id){
  //     var algorithms = get('.ready-algorithm')
  //       , each = Array.prototype.forEach;

  //       each.call(algorithms, function(x, i, a){
  //         x.id = '';
  //       })
  //     this.id = 'active-algorithm';
  //   }
  // }

  // var title = ((clone.getChildren()).getChildren())[0];

  // title.replaceText(this.button.files[0].name);

  // var section = get('.algorythms')[0];

  // section.appendChild(clone);

}
