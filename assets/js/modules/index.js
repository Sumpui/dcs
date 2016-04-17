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
