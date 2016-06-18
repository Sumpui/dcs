;(function(){

  /**
   *
   * Declare and combine array of inputs
   *
   */
  
  var hardInput = get('.hard-drone-amount')
    , middleInput = get('.middle-drone-amount')
    , lightInput = get('.light-drone-amount')
    , each = Array.prototype.forEach
    , counting = count(0);

  var inputs = [hardInput, middleInput, lightInput]
    , allInputs = []
    , am = 0;

  for (var j = 0; j <= inputs.length - 1; j++){
    for (var k = 0; k <= inputs[j].length - 1; k++){
      allInputs[am++] = inputs[j][k];
    }
  }

  /**
   *
   * Hang handler on each 'text-input' button. Logic is
   * every element will count nessecary value of drones
   * that is available to declare at present
   *
   */
  
  for (var k = 0; k <= inputs.length - 1; k++){
    each.call(inputs[k], function(x, i, a){
      x.onchange = function(){
        numberMask(this);
      }
      x.onkeyup = function() {
        var amount = get('.planes-amount')[0]
          , maxValue = parseInt(amount.innerText)
          , currentValue = parseInt(this.value)
          , allValues = 0
          , earlier = 0
          , self = this
          , time = 0;

        /**
         *
         * Counting common available drones amount
         * at the moment
         *
         */
        
        each.call(allInputs, function(x, i, a){
          if (x !== self) {
            if (x.value) {
              allValues += parseInt(x.value);
            }
          }
        });

        earlier = currentValue;
        currentValue += allValues;

        /**
         *
         * Check if we have or not available drones
         *
         */
        
        if (currentValue > maxValue){

          this.value = '';
          this.placeholder = 'БПЛА осталось: ' + (maxValue - allValues);

          css(this, {border: '1px solid red'});

          var interval = setInterval(function(){

            if (time >= 900){
              clearInterval(interval);
            }

            css(self, {border: '1px solid transparent'});

            setTimeout(function(){
              css(self, {border: '1px solid red'})
            }, 300);

            time += 300;

          }, 300);
        } else{
          // this.placeholder = 'Количество БПЛА.';
          this.placeholder = 'БПЛА осталось: ' + (maxValue - allValues);
        }

        /**
         *
         * If it's okay, we notify our user he
         * can continue his work with the program.
         *
         */
        
        if (currentValue === maxValue){
          var c = counting();
          if (c < 1){
            var drones = getDronesData();

            toPage(drones);

            parseDrones(drones);

          }
        }

        return numberMask(this);
      }
      x.onfocus = function() {
        css(this, {border: '1px solid #778899'});
      }
    });
  }

}());

function getDronesData() {

  var toParse = [get('.hard-drone-amount'),
                 get('.middle-drone-amount'),
                 get('.light-drone-amount')]

  var dronesData = []
    , each = Array.prototype.forEach;

  each.call(toParse, function(x, i, a){

    each.call(x, function(y, j, b){

      if (y.value) {

        var iParent = y.parentNode
          , droneName = '';

        iParent = iParent.getChildren();

        /**
         *
         * Search for drone name
         *
         */
        
        for (var m in iParent){
          if (typeof iParent[m] !== 'function'){
            if (iParent.hasOwnProperty(m)){
              var child = iParent[m];
              if ((child.className.indexOf('drone-name') + 1)){
                droneName = child.innerText;
              }
            }
          }
        }

        var classes = y.cutClassTo('-', true);

        classes = classes.slice(classes.indexOf('2') + 2);

        /**
         *
         * Get grandma off the element
         *
         */
        
        var grandma = (y.parentNode).parentNode
          , specifications = {}
          , greatGrandson = grandma.getChildren().getChildren().getChildren()
          , grandchildren = [];

        for (var t in greatGrandson){
          if (typeof greatGrandson[t] !== 'function'){
            if (greatGrandson.hasOwnProperty(t)){
              if (greatGrandson[t].localName === 'article'){
                grandchildren.push(greatGrandson[t]);
              }
            }
          }
        }

        var values = grandchildren.getChildren().findByClass('chars-values');

        grandchildren.forEach(function(z, q, c){

          var tempClass = z.className;

          tempClass = tempClass.slice(tempClass.lastIndexOf(' ') + 1, tempClass.lastIndexOf('-'));

          specifications[tempClass] = parseInt(values[q].innerText);
        });

        var a = parseInt(y.value)
          , clr = [];
        for (var c = 0; c <= a - 1; c++){
          clr.push(colorIs(30, 200));
        }

        dronesData.push({
          name: droneName,
          type: classes,
          amount: a,
          specification: specifications,
          colors: clr
        });

      }

    });

  });

  return dronesData;
}

function numberMask(obj) {
    obj.value = obj.value.replace(/[^\d]/g, '');
}

function colorIs(from, to){
  var r = Math.abs(Math.floor(Math.random()*to - from))
    , b = Math.abs(Math.floor(Math.random()*to - from))
    , g = Math.abs(Math.floor(Math.random()*to - from))
    , o = 0.7;

  return 'rgba(' + r + ', ' + b + ', ' + g + ', ' + o + ')';
}

/**
 * Show all drones that we have already created.
 * @param  {object} obj An array of drone-objects with all charasteristics
 * @return {undefined}     Doesn't return anything
 */
function toPage(obj){

  isCorrect(obj, 'Array');

  var c = count(1)
    , counter = c();

  var types = {
    'hard-drone': 'Тяжелый БПЛА',
    'middle-drone': 'Средний БПЛА',
    'light-drone': 'Лёгкий БПЛА'
  }
  , each = Array.prototype.forEach
  , section = document.createElement('section')
  , close = document.createElement('input')
  , subsection = document.createElement('section')
  , head = document.createElement('header')
  , headH1 = document.createElement('h1')
  , h1Text = document.createTextNode('Беспилотники на месте базирования!')
  , planesBlock = get('#planes-section')
  , planesParent = planesBlock.parentNode;

  section.id = 'drones-colors';
  section.className = 'span-18 offset-1';

  subsection.id = 'drones-subsection-colors'
  subsection.className = 'span-20'

  close.type = 'button';

  close.id = 'close-' + section.id;
  close.className = 'span-10 offset-5'

  head.className = 'span-20 color-header';

  section.parentOf(head.parentOf(headH1.parentOf(h1Text)));

  /**
   *
   * Show all drones and their traces colors that were created earlier
   *
   */
  
  for (var i = 0; i <= obj.length - 1; i++){
    var aDrone = obj[i];
    for (var j = 0; j <= aDrone.amount - 1; j++){
      var article = document.createElement('article')
        , header = document.createElement('header')
        , h2 = document.createElement('h2')
        , h5 = document.createElement('h5')
        , div = document.createElement('div')
        , droneName = document.createTextNode(aDrone.name)
        , control = get('#control-additional');

      for (var q in types) {
        if (q === aDrone.type){
          var droneType = document.createTextNode(types[q]);
        }
      }

      /**
       *
       * Setting up all article attributes
       *
       */
      
      article.className = 'drones-information drone-info-' + counter;
      header.className = 'drone-info-headers';
      div.className = 'drone-trace trace-' + counter;

      /**
       *
       * Set styles to article and color block
       *
       */
      
      css(article, {width: '13.5%', float: 'left', marginTop: '2%'});
      css(div, {backgroundColor: aDrone.colors[j], height: '6px', width: '18px', margin: '0 auto'});

      /**
       *
       * Append all blocks to one
       *
       */
      
      subsection.parentOf(article.parentOf(div, header.parentOf(h5.parentOf(droneType), h2.parentOf(droneName))));

      counter = c();

      /**
       *
       * Insert new section before planes-section
       *
       */
      
      control.insertBefore(section.parentOf(subsection), planesBlock);
    }
  }
}

function parseDrones(obj, callback) {
  isCorrect(obj, 'Array');

  var tempObj = []
    , band = new Planes();

  for (var i = 0; i <= obj.length - 1; i++){
    var current = obj[i];

    for(var j = 0; j <= current.amount - 1; j++){
      var props = {};
      for(var k in current) {

        if(k === 'amount') {
          continue;
        }else if (k === 'colors') {
          props[k] = current[k][j];
        }else {
          props[k] = current[k];
        }
      }
      props.iAm = (j + 1);
      tempObj.push(props);
    }
  }

  Planes.prototype.all = tempObj;

  band.initialize();

}
