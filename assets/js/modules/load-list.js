(function (){

  function List (elements) {

    if (typeof elements !== 'object') throw new TypeError('Incoming arguments is not an object');

    for (var i in elements) {
      if (typeof elements[i] !== 'string'){
        this[i] = elements[i];
      }else{
        this[i] = get(elements[i]);
      }
    }

    // this.prototype.constructor = List;

  }

  List.prototype.active = function () {

    if (this.list) {

      /**
       *
       * Save object context
       *
       */
      var self = this;

      function check(x, i, a) {

        x.onclick = function () {

          var len = self.list.length;

          /**
           *
           * Reseting all active states in the list
           *
           */
          for (var j = 0; j <= len - 1; j++){

            self.list[j].id = '';

          }

          /**
           *
           * Setting up active state to clicked element
           *
           */
          this.id = 'active-algorythm';

        }

      }

      /**
       *
       * Detect if the list is an array or an object
       *
       */
      
      if (this.list instanceof Array){

        this.list.forEach(check);

      }else{

        Array.prototype.forEach.call(this.list, check);

      }

    }

  }

  List.prototype.file = function () {

    var self = this;

    this.button.onchange = function () {

      /**
       *
       * Gets files local way
       *
       */
      var fn = this.value;

      /**
       *
       * Gets file name from the local way
       *
       */
      fn = fn.slice(fn.lastIndexOf('\\') + 1, fn.length);

      var fileBlock = self.fileName[0]

      css(fileBlock, {opacity: 0});

      setTimeout(function(){

        /**
         *
         * Replace old child node on new child node
         *
         */
        fileBlock.replaceText(fn);

        css(fileBlock, {opacity: 1, border: '1px solid transparent'});

        fileBlock.className = fileBlock.className + ' chose';

      }, self.transitions);

    }

  }

  var loadingList = new List({
    section: '#loading-scripts',
    list: '.ready-algorythm',
    button: '#choose-file',
    fileName: '.file-name',
    transitions: 300
  });

  loadingList.active();

  loadingList.file();

}());