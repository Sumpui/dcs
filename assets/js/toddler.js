(function () {

  /**
   *
   * Define main toddle-slider elements
   *
   */
  var tod = get('.toddler')[0],
     line = get('.toddler-line')[0],
   slider = get('.amount-slider')[0],
   amount = get('.amount')[0];

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

  /**
   * Change text in the element
   * @param  {string} t new string to change the old one
   * @return {object}   returns an object
   */
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
    if (typeof t !== 'string') throw new TypeError(mes);

    this.removeChild(this.childNodes[0]);
    this.appendChild(document.createTextNode(t));

    return this;
  }

  /**
   * Set new method to the property of Object.prototype
   */
  Object.prototype.replaceText = replaceTxt;

  /**
   * A shortcut to get text in the element
   * @return {string} return string value of the element
   */
  function getTxt() {
    var mes = 'Apply this method to object.'
    if (typeof this !== 'object') throw new TypeError(mes);
    return this.childNodes[0].nodeValue;
  }

  /**
   * Set new method to the property of Object.prototype
   */
  Object.prototype.getText = getTxt;

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
 * Counting break points of scale
 * @param  {number} len amount of points on the scale
 * @return {object}     returns coordinates of each break point
 */
  function breakPoints (len) {

    /**
     *
     * Segments amount on the line
     *
     */
    segment.each = segment.width/len;
    segment.coords = new Array(len);
    segment.coords[len] = segment.end;

    /**
     *
     * Filling range of values
     *
     */
    for (var i = len - 1; i >= 0; i--) {
      segment.coords[i] = segment.coords[i + 1] - segment.each;
    }

    delete segment.coords[segment.coords.length - 1];

    return segment.coords;
  }

  /**
   *
   * Features scrolling line
   *
   */
  var segment = defSegment(line), todPlace = defSegment(tod);

  /**
   *
   * Call this function on each window resize
   *
   */
  // window.onresize = function () {

  //   /**
  //    *
  //    * Re-count slider line coordinates
  //    *
  //    */
  //   segment = defSegment(line);

  //   *
  //    *
  //    * Re-count break points coordinates, get amount value and find value of break point
  //    *
     
  //   var points = breakPoints(15), index = parseInt(amount.getText());

  //   /**
  //    *
  //    * Set correctly toddle left positioning
  //    *
  //    */
  //   tod.style.left = points[index - 1] - segment.start + 'px';
  // }

  /**
   * Track mouse event
   * @param  {[type]} e event
   * @return {boolean}   returns true of false
   */
  tod.onmousedown = function (e) {

    moveAt(e);

    /**
     * Make possible to move our toddle
     * @param  {object} e our event - moving cursor
     * @return {undefined}   Returns nothing
     */
    function moveAt (e) {
      /**
       *
       * Make range of values which we can't come above
       *
       */
      if(e.clientX >= segment.start && e.clientX <= segment.end){
        tod.style.left = e.clientX - segment.start - tod.offsetWidth / 2 + 'px';
      }
    }

    function atCheckPoint (e){
      /**
       *
       * Current toddle placement
       *
       */
      var point = defSegment(tod), bPoints = breakPoints(15);

      /**
       *
       * Search current range of values to change
       *
       */
      bPoints.forEach(function(x, i, a){
        if (point.start <= x && point.start >= x - 10){
          amount.replaceText((i + 1).toString());
        }
      })
    }

    document.onmousemove = function (e) {
      moveAt(e);
      atCheckPoint(e);
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