(function () {

  var tod = get('.toddler')[0];
  var line = get('.toddler-line')[0];

  /**
   * Define begin and end coordinates of the scroll line
   * @param  {object} obj scroll line
   * @return {object}     object with start, end coordinates and width of the line
   */
  function defSegment (obj) {
    if (!obj) throw TypeError();
    var coords = obj.getBoundingClientRect();
    return {start: coords.left, end: coords.right, width: coords.right - coords.left};
  }

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
   * Track mouse event
   * @param  {[type]} e event
   * @return {boolean}   returns true of false 
   */
  tod.onmousedown = function (e) {

    moveAt(e);

    /**
     *
     * Features scrolling line
     *
     */
    line = defSegment(line);

    // var startX = tod.;

    log(coords);

    function moveAt (e) {
    }

    document.onmousemove = function (e) {
      s = step();
    }

    tod.onmouseup = function () {
      document.onmousemove = null;
      tod.onmouseup = null;
    }

    // function moveAt (e) {
    //   tod.style.left = e
    // }


  }

}());