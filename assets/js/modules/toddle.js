(function(){

  function Toddle(elements){

    if ( typeof elements !== 'object') throw new TypeError('Incoming parameter is not an object');

    for (var i in elements){
      var arr = elements[i];
      this[i] = {};
      for (var j in arr){
        if (typeof arr[j] === 'string')
          this[i][j] = get(arr[j])[0];
        else
          this[i][j] = arr[j];
      }
    }

  }

  Toddle.prototype.defineSegments = function(el) {

    var coords = el.getBoundingClientRect();

    el.segments = {
      start: coords.left,
      end: coords.right,
      width: coords.right - coords.left
    }

    return this;
  };

  Toddle.prototype.breaks = function(el){

    var segment = el.segments;

    segment.each = segment.width/this.options.divisions;
    segment.coords = new Array(this.options.divisions);
    segment.coords[this.options.divisions] = segment.end;

    for (var i = this.options.divisions - 1; i >= 0; i--) {
      segment.coords[i] = Math.round(segment.coords[i + 1] - segment.each);
    }

    delete segment.coords[segment.coords.length - 1];

    return this;
  }

  Toddle.prototype.resize = function () {

    window.onresize = function () {

      tod.defineSegments(tod.dom.line);
      tod.breaks(tod.dom.line);

      var index = parseInt(tod.dom.amount.getText());

      tod.dom.tongle.style.left = tod.dom.line.segments.coords[index - 1] - tod.dom.line.segments.start + 'px';

    }

  }

  Toddle.prototype.action = function () {

    var self = this;

    this.dom.tongle.onmousedown = function (e) {

      moveAt(e);

      function moveAt (e) {

        var line = self.dom.line.segments;

        if (e.clientX >= line.start && e.clientX <= line.end){
          self.dom.tongle.style.left = e.clientX - line.start - self.dom.tongle.offsetWidth / 2 + 'px';
        }

      }

      function atCheckPoint (e) {

        var tonglePos = self.dom.tongle.segments;

        self.defineSegments(self.dom.tongle);
        self.breaks(self.dom.line);

        self.dom.line.segments.coords.forEach(function(x, i, a){

          if (tonglePos.start <= x && tonglePos.start >= x - 10){
            self.dom.amount.replaceText((i + 1).toString());
          }
        })

      }

      document.onmousemove = function (e) {
        moveAt(e);
        atCheckPoint(e);
      }

      document.onmouseup = function () {
        document.onmousemove = null;
        self.dom.tongle.onmouseup = null;
      }

      self.dom.tongle.ondragstart = function () {
        return false;
      }

    }

  }

  Toddle.prototype.create = function () {

    // Define line coordinates
    this.defineSegments(this.dom.line);

    // Define tongle coordinates
    this.defineSegments(this.dom.tongle);

    // Define line break points
    this.breaks(this.dom.line);

    // Resize toddler
    this.resize();

    // Start toddler emulation
    this.action();

  }

  // Create new Object
  var tod = new Toddle({
    dom: {
      slider: '.planes-slider',
      line: '.planes-toddler-line',
      tongle: '.planes-toddle',
      amount: '.planes-amount',
    },
    options: {
      divisions: 40
    }
  });

  tod.create();

  // Create new Object
  var dotes = new Toddle({
    dom: {
      slider: '.dotes-slider',
      line: '.dotes-toddler-line',
      tongle: '.dotes-toddle',
      amount: '.dotes-amount',
    },
    options: {
      divisions: 10
    }
  });

  dotes.create();

  // Create new Object
  var area = new Toddle({
    dom: {
      slider: '.area-slider',
      line: '.area-toddler-line',
      tongle: '.area-toddle',
      amount: '.area-amount',
    },
    options: {
      divisions: 10
    }
  });

  area.create();

    // Create new Object
  var trajectory = new Toddle({
    dom: {
      slider: '.trajectory-slider',
      line: '.trajectory-toddler-line',
      tongle: '.trajectory-toddle',
      amount: '.trajectory-amount',
    },
    options: {
      divisions: 10
    }
  });

  trajectory.create();

}());