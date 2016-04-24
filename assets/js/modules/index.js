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
    value: function (t) {
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
