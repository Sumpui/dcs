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
function log(el){
  console.log(el);
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

(function () {

  var tod = get('.toddler')[0],
     line = get('.toddler-line')[0],
   slider = get('.amount-slider')[0];

  /**
   * Define begin and end coordinates of the scroll line
   * @param  {object} obj scroll line
   * @return {object}     object with start, end coordinates and width of the line
   */
  function defSegment (obj) {
    if (typeof obj !== 'object') throw TypeError();
    var coords = obj.getBoundingClientRect();
    return {start: coords.left, end: coords.right, width: coords.right - coords.left};
  }

  function replaceTxt (t) {
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
    if (typeof t !== 'object') throw new TypeError(mes);

    this.removeChild();
    this.appendChild(document.createTextNode(t));

    return this;
  }

  /**
   * Set new method to the property of Object.prototype
   */
  Object.prototype.replaceText = replaceTxt;

  /**
   * Toddler counter
   * @param  {number} i number start counting with
   * @return {function}   returns function with increment or dicrement
   */
  var step = (function (i) {
    i ? i: i = 1;
    return function (t) {
      if (t) {
        return i--;
      }else{
        return i++;
      }
    }
  }(0));



  /**
   *
   * Features scrolling line
   *
   */
  var segment = defSegment(line), todPlace = defSegment(tod);

  /**
   * Track mouse event
   * @param  {[type]} e event
   * @return {boolean}   returns true of false 
   */
  tod.onmousedown = function (e) {

    /**
     *
     * Features scrolling line
     *
     */
    var segment = defSegment(line);

    /**
     *
     * Segments amount on the line
     *
     */
    segment.amount = 15;
    segment.each = segment.width/segment.amount;

    segment.coords = new Array(14);
    segment.coords[14] = segment.end;

    for (var i = segment.amount - 2; i > 0; i--) {
      segment.coords[i] = segment.coords[i + 1] - segment.each;
    }

    segment.coords = segment.coords.map(function(x){
      return Math.floor(x) + 0.8125;
    });

    moveAt(e);

    function moveAt (e) {
      if(e.clientX >= segment.start && e.clientX <= segment.end){
        tod.style.left = e.clientX - todPlace.start - tod.offsetWidth / 2 + 'px';
      }

      if ()
    }

    document.onmousemove = function (e) {
      moveAt(e);
    }

    document.onmouseup = function () {
      document.onmousemove = null;
      tod.onmouseup = null;
    }
  }

  tod.ondragstart = function () {
    return false;
  }

}());
(function (){
  var myMap;

  // Дождёмся загрузки API и готовности DOM.
  ymaps.ready(init);

  function init () {
      // Создание экземпляра карты и его привязка к контейнеру с
      // заданным id ("map").
      myMap = new ymaps.Map('dynamic-map', {
          // При инициализации карты обязательно нужно указать
          // её центр и коэффициент масштабирования.
          center: [55.76, 37.64], // Москва
          zoom: 10,
          controls: []
      });
  }
}());