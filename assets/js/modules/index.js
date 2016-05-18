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
      if (x.children && x.children.length){
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
        if (child.hasOwnProperty(i)){
          children.push(child[i]);
          // console.log(children);
        }
      }
    }
  }

  return children;
}

Array.prototype.getChildren = HTMLElement.prototype.getChildren;

function parentOf(){
  var each = Array.prototype.forEach;
  var self = this;
  each.call(arguments, function (x) {
    self.appendChild(x);
  })
  return self;
}

HTMLElement.prototype.parentOf = parentOf;

function cutClassTo(str){
  isCorrect(str, 'String');
  try{
    isCorrect(this, 'HTMLElement');
  }catch(e1){
    try{
      isCorrect(this, 'HTMLTableCellElement');
    }catch(e2){
      console.log('I can\'t do this Boss.', e2)
    }
  }
  return this.className.slice(0, this.className.indexOf(str));
}

HTMLElement.prototype.cutClassTo = cutClassTo;

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

function isString(str){
  if (typeof str !== 'string') throw new TypeError('Incoming parameter is not an object. It is ' + typeof str);
}

/**
 * Making an array from the string
 * Example: string '1 0 0 0' parsing to array [1, 0, 0, 0]
 * @param  {string} str Incoming string
 * @return {object}     Returning object
 */
function parseToArr(str){
  isString(str);
  var arr = [];
  for (i = 0; i < str.length - 1; i++){
    if (str[i] !== ' ' && typeof parseInt(str[i]) === 'number'){
      arr.push(!!parseInt(str[i]));
    }
  }
  return arr;
}

/**
 * Get an array from the string value
 * @param  {string} str Incoming string
 * @return {array}     Return array
 */
function getArr(str){
  /* Check if incoming argument is string */
  isString(str);
  var arr = []
    , p = 0
    , n = 1
  while(n > 0){
    /* Looking for separator */
    n = str.indexOf(',', n);
    /* Increasing it to not include this to the string */
    n += 1;
    /* Check if we are at the end of the string */
    if (n !== 0){
      arr.push(str.slice(p, n - 1));
    }else{
      arr.push(str.slice(p, str.length));
    }
    /* Varuable p is the start of the letters segments */
    p = n;
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

var counter = count(1);

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

function toHTMLView(obj) {

  if (typeof obj !== 'object' && classOf(obj) !== 'Array') throw new TypeError('Incoming parameter doesn\'t have \'object\' type');

  /**
   *
   * Get layout
   *
   */
  var layout = get('.ready-algorithm')[0]
    , title = (layout.getChildren()).getChildren();

  /**
   *
   * Bypass all the elements of the array
   *
   */
  var arr = obj.map(function(x, i, a){


    var clone = layout.cloneNode(true)
      , cloneTitle = (clone.getChildren()).getChildren();

      // console.log(cloneTitle);

    // console.log(clone, cloneTitle);

    /* Remove or rename attributes of the each article */
    clone.removeAttribute('hidden');
    clone.id = '';
    clone.className = clone.className.slice(0, clone.className.lastIndexOf('-') + 1) + counter();

    // console.log(cloneTitle);

    if (cloneTitle[0]){
      /* Replace text node on the necessary */
      cloneTitle[0].replaceText(x);
    }

    /* Existing scripts, that we can't delete */
    var existingScripts = ['all.js', 'yandex'];

    if (cloneTitle[0]){
      /* Set up elements onclick behavior */
      if (cloneTitle[0].innerText !== 'Вы ещё не загрузили ни один алгоритм'){

        /**
         *
         * Setting up even handler for each article
         *
         */
        clone.onclick =  function(){

          /**
           *
           * Get active article
           *
           */
          var isActive = get('#active-algorithm');

          /**
           *
           * If it exists, we remove it's id
           *
           */
          if (isActive){
            isActive.id = '';
          }

          /**
           *
           * Assign to current element necessary id (to make it active)
           *
           */
          this.id = 'active-algorithm';

          /**
           *
           * Get all 'script' elements
           *
           */
          var scripts = document.getElementsByTagName('script');


          /**
           *
           * Look for other scripts and removing them (except the scripts have already existed)
           *
           */

          for (var h = 0; h <= scripts.length - 1; h++){

            /**
             *
             * Scripts, that are existed before
             *
             */
            var condition = (scripts[h].src.indexOf(existingScripts[0]) + 1)  || (scripts[h].src.indexOf(existingScripts[1]) + 1);

            if (!(condition)){
              scripts[h].remove();
            }
          }

          /**
           *
           * Create new script element, main path to the script and get current script name
           *
           */
          var script = document.createElement('script')
            , link = cloneTitle[0].innerText
            , path = 'js/algorithms/';

          /**
           *
           * Set up src to the current script
           *
           */
          script.src = path + link;
          /**
           *
           * Append this script to the 'body'
           *
           */
          document.body.appendChild(script);
        }
      }
    }

    return clone;

  });

  var parent = get('.algorithms')[0];

  arr.forEach(function(x, i, a){

    parent.appendChild(x);

  });

}

function sleep(element, styles, time){
  if (!styles && !time){
    setTimeout(function(){
      css(element, css({opacity: 0}));
    }, 300);
  }
  setTimeout(function(){
    css(element, styles);
  }, time);
}

function awake(element, styles, time){
  if (!styles && !time){
    setTimeout(function(){
      css(element, css({opacity: 1}));
    }, 300);
  }
  setTimeout(function(){
    css(element, styles);
  }, time);
}

function isCorrect(el, type){
  if (!(classOf(el) === type)) throw new TypeError('Incoming parameter does not belong to \'' + type + '\' class!');
  else return true;
}

function replaceInSleep(element, str, time){
  isCorrect(str, 'String');

  setTimeout(function(){
    if (element.value){
      element.value = str;
    }else{
      element.replaceText(str);
    }
  }, time);

  return true;
}

function addFiles(s){
  if (!(classOf(s) === 'XMLHttpRequest')) throw new TypeError('Incoming parameter is not an \'XMLHttpRequest\' object!');
  try{
    if (s.responseText){
      /**
       *
       * Save server response and transform it to the object
       *
       */
      var answer = JSON.parse(s.responseText);
      if (!answer.length) {
        answer.push('Вы ещё не загрузили ни один алгоритм');
      }

      /**
       *
       * Save incoming response in URI view
       *
       */
      var toURIView = encodeURIComponent(answer);

      if (toURIView !== getCookies().answer){

        deleteCookies();
        setCookies('answer', answer, 1);

      }

      var resultCookies = getCookies();

      var cookiesArr = getArr(resultCookies.answer);

      if (arguments[1]){
        var exist = arguments[1];

        for(var k in exist){
          if (exist[k] === 'exists'){
            delete cookiesArr[k];
          }
        }
      }

      toHTMLView(cookiesArr);
    }
  }catch(e){
    console.log(e);
  }
}

function removeNotExisting(s){

  if (!(classOf(s) === 'XMLHttpRequest')) throw new TypeError('Incoming parameter is not an \'XMLHttpRequest\' object!');
  try{
    if (s.responseText){

      var exist = get('.ready-algorithm')
      , choosenFiles = get('#upload-file')
      , each = Array.prototype.forEach
      , parts = []
      , titles = []
      , c = count(1)
      , answer = JSON.parse(s.responseText);

      each.call(exist, function(x, i, a){
        parts.push(get('.algorithm-' + c()));
        /**
         *
         * Each existing element
         *
         */
        var part = parts[i];
        for (var p in part){
          /**
           *
           * Get titles of existing elements
           *
           */
           if (part.hasOwnProperty(p)){


            if (p !== 'length'){
              var title = (part[p].getChildren()).getChildren();
            }


            for (var j in title){
              if (title.hasOwnProperty(j)){
                titles.push(title[j]);
              }
            }
           }
        }
      });

      each.call(choosenFiles.files, function(x, i, a){
        var name = x.name;
        for (var n in titles){
          if (titles[n].innerText === name){
            for (var t in answer){
              if (answer[t] === name){
                answer[t] = 'exists';
              }
            }
          }else if(titles[n].innerText === 'Вы ещё не загрузили ни один алгоритм'){
            ((titles[n].parentNode).parentNode).remove();
            counter = count(1);
          }
        }
      });

    }
  }catch(e){
    console.log(e);
  }
  return answer;
}

function check(x, i, a) {

  x.onclick = function () {

    var len = self.list.length;

    /**
     *
     * Reseting active state on element earlier
     *
     */
    var isActive = get('#active-algorithm');

    isActive.id = '';

    /**
     *
     * Setting up active state to clicked element
     *
     */
    this.id = 'active-algorithm';

  }

}

/*===========================================
=            Place-based section            =
===========================================*/
function iHide(place, txt) {

  if (typeof txt !== 'string') throw new TypeError('Incoming arguments is not a string');
  if (typeof place !== 'object') throw new TypeError('Incoming arguments is not an object');

  /**
   *
   * Create block which will hide our developers panel
   *
   */
  var wraps = document.createElement('div')
    , snow = document.createElement('div')
    , close = document.createElement('input')
    , par = document.createElement('p');

  wraps.className = 'snow-wrapper';

  snow.className = 'snow';
  close.className = snow.className + '-close-it';
  par.className = 'snow-paragraph span-10 offset-5';

  close.type = 'button'
  close.value = 'Отменить'

  close.onclick = function(){
    removeBody('.snow-wrapper');
  }

  /**
   *
   * Setting up some styles for our snowball
   *
   */
  css(wraps, {position: 'absolute', height: '100%', width: '100%', top: 0, left: 0, borderTop: '3px solid #90ee90'});
  css(snow, {position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', background: 'white', opacity: '0.7', '-webkit-filter': 'blur(10px)'});
  close.appendChild(document.createTextNode('закрыть'));

  txt = document.createTextNode(txt);

  place.parentOf(wraps.parentOf(snow, close, par.parentOf(txt)));

  return 1;
}

function removeBody(element) {
  var snowball = get(element);
  if (snowball.length){
    css(snowball[0], {opacity: 0});
    setTimeout(function(){
      snowball[0].remove();
    }, 300)
  }
}


/*=====  End of Place-based section  ======*/

