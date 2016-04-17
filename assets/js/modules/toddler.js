(function () {

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

    var s = step();

    moveAt(e);

    function moveAt (e) {
      var newPlace = defSegment(tod);

      if(e.clientX >= segment.start && e.clientX <= segment.end){
        tod.style.left = e.clientX - todPlace.start - tod.offsetWidth / 2 + 'px';
      }

      amount.replaceText(s.toString());

      if (newPlace.start === segment.coords[1]) {
      }
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