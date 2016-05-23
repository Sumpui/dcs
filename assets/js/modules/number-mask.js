;(function(){

  /**
   *
   * Declare and combine array of inputs
   *
   */
  
  var hardInput = get('.hard-drone-amount')
    , middleInput = get('.middle-drone-amount')
    , lightInput = get('.light-drone-amount')
    , each = Array.prototype.forEach;

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

          this.placeholder = 'Количество БПЛА.';

        }

        /**
         *
         * If it's okay, we notify our user he
         * can continue working with the program.
         *
         */
        
        if (currentValue === maxValue){

          alert('Ура!');
          // colorDrones();

        }

        return numberMask(this);
      }
      x.onfocus = function() {
        css(this, {border: '1px solid #778899'});
      }
    });
  }

  function numberMask(obj) {
      obj.value = obj.value.replace(/[^\d]/g, '');
  }

  // function colorDrones() {

  //   var toParse = [get('.hard-drone-amount'),
  //                  get('.middle-drone-amount'),
  //                  get('.light-drone-amount')]

  //   each.call(toParse, function(x, i, a){

  //     each.call(x, function(y, j, b){

  //       if (y.value) {

  //         var classes = y.cutClassTo('-', true);

  //         classes = classes.slice(classes.indexOf('2') + 2);

  //         console.log(classes);
  //       }

  //     })

  //   })

  // }


}());
