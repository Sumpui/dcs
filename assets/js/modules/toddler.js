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
   *
   * Features scrolling line
   *
   */
  var segment = defSegment(line);

  /**
   * Track mouse event
   * @param  {[type]} e event
   * @return {boolean}   returns true of false 
   */
  tod.onmousedown = function (e) {
    /**
     *
     * Segments amount on the line
     *
     */
    segment.amount = 15;
    segment.each = segment.width/segment.amount;

    segment.coords = new Array(14);
    segment.coords[14] = segment.end;

    moveAt(e);

    for (var i = segment.amount - 2; i > 0; i--) {
      segment.coords[i] = segment.coords[i + 1] - segment.each;
    }

    segment.coords = segment.coords.map(function(x){
      return Math.floor(x);
    })

    log(segment.coords);

    function toPercents (l){
      return 100/l.amount;
    }

    function moveAt (e) {
      log(tod.offsetX)
      tod.style.left = e.clientX - tod.offsetWidth/2 + 'px';
      // for (var i = segment.coords.amount; i < 0; i++){
      //   if (e.clientX === segment.coords[i]){
      //     tod.style.left = toPercents(segment)*i + '%';
      //   }
      // }
    }

    document.onmousemove = function (e) {
      moveAt(e);
      s = step();
    }

    tod.onmouseup = function () {
      document.onmousemove = null;
      tod.onmouseup = null;
    }
  }

  tod.ondragstart = function () {
    return false;
  }

}());