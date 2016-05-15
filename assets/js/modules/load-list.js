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

  };

  List.prototype.toServer = function (file) {

    var form = get('#upload-form')
    , self = this;

    function sendForm(form) {
      var formData = new FormData(form);

      var request = xhr();

      request.open('POST', form.action, true);

      /**
       *
       * Get answer from the server
       *
       */
      request.onload = function(e) {
        if (this.readyState === 4 && this.status === 200 ){
          addFiles(this, removeNotExisting(this));
        }
      }

      /**
       *
       * Send data to the server
       *
       */
      request.send(formData);

      return false;

    }

    sendForm(form);
  };

  List.prototype.file = function () {

    var self = this;

    this.button.onchange = function () {

      /**
       *
       * Save file to the List object
       *
       */
      self.file = this.files[0];

      self.toServer();

      /**
       *
       * Gets files local way
       *
       */
      var fn = [];

      Array.prototype.forEach.call(this.files, function(x, i, a){
        fn.push(x.name);
      });

      /**
       *
       * Gets file name from the local way
       *
       */
      var fileBlock = self.fileName[0]

      css(fileBlock, {opacity: 0});

      /**
       *
       * Blinking when loading on server and applying to the other scripts
       *
       */
      setTimeout(function(){

        /**
         *
         * Replace old child node with new child node and add br elements
         *
         */
        if (fn.length >= 2) {
          fn = ' Алгоритмы были загружены';
        }else {
          fn = 'Алгоритм ' + fn[0] + ' был загружен';
        }

        fileBlock.replaceText(fn);

        css(fileBlock, {opacity: 1, color: '#336f94'});

        fileBlock.className = fileBlock.className + ' chose';

      }, self.transitions);

      /**
       *
       * Set time out to 0.6 second and set up fileBlock opacity styles
       *
       */
      sleep(fileBlock, {opacity: 0}, self.transitions*5);

      /**
       *
       * Change fileBlock styles, inner HTML and class name with time out on 0.9 seconds 
       *
       */
      setTimeout(function(){

        css(fileBlock, {opacity: 0, color: 'rgba(108,104,116, 0.5)'});
        fileBlock.className = fileBlock.className.slice(0, fileBlock.className.lastIndexOf(' '));
        fileBlock.replaceText('Загружать только файлы с расширением \'.js\'!');

      }, self.transitions*6)

      /**
       *
       * Show fileBlock in a 1.05 seconds
       *
       */
      sleep(fileBlock, {opacity: 1}, self.transitions*6);

    }

  }

  // List.prototype.insert;

  var loadingList = new List({
    section: '#loading-scripts',
    list: '.ready-algorithm',
    button: '#upload-file',
    fileName: '.file-name',
    transitions: 300,
    timeOffset: 100
  });

  loadingList.active();

  loadingList.file();

}());