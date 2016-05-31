(function(){

  var hard = get('.hard-drone-cls')
    , middle = get('.middle-drone-cls')
    , light = get('.light-drone-cls')
    , hardCheckboxes = get('.hard-drone-checks')
    , middleCheckboxes = get('.middle-drone-checks')
    , lightCheckboxes = get('.light-drone-checks')
    , hardAmount = get('.hard-drone-amount')
    , middleAmount = get('.middle-drone-amount')
    , lightAmount = get('.light-drone-amount')
    , each = Array.prototype.forEach;

  var commonCls = [hard, middle, light]
    , commonChecks = [hardCheckboxes, middleCheckboxes, lightCheckboxes]
    , commonAmount = [hardAmount, middleAmount, lightAmount];

  var closeButtons = []
    , checkboxes = []
    , am = [];

  /**
   *
   * Combine all buttons with one array
   *
   */
  
  for (var n = 0; n <= commonCls.length - 1; n++){
    var inputs = commonCls[n];
    each.call(inputs, function(x, i, a){
      closeButtons.push(x);
    });
  }

  /**
   *
   * Combine all checkboxes with one array
   *
   */
  
  for (var k = 0; k <= commonChecks.length - 1; k++){
    var checkbox = commonChecks[k];
    each.call(checkbox, function(x, i, a){
      checkboxes.push(x);
    });
  }

  /**
   *
   * Combine all comment
   *
   */
  
  for (var r = 0; r <= commonAmount.length - 1; r++){
    var input = commonAmount[r];
    each.call(input, function(x, i, a){
      am.push(x);
    });
  }

  /**
   *
   *  Hang a hander on each button
   *
   */
  
  each.call(closeButtons, function(x, i, a){
    x.onclick = function(){
      if (checkboxes[i].checked){
        checkboxes[i].checked = false;
        am[i].value = '';
        css(am[i], {border: '1px solid transparent'});
      }
    }
  });

}());