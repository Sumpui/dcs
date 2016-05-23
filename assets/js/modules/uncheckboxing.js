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

  for (var l = 0; l <= commonCls.length - 1; l++){
    each.call(commonCls[l], function(x, i, a){
      x.onclick = function() {
        console.log(x);
        for (var j = 0; j <= commonChecks.length - 1; j++){
          if (commonChecks[j][i].checked){
            commonChecks[j][i].checked = false;
            commonAmount[j][i].value = '';
            css(commonAmount[j][i], {border: '1px solid transparent'});
          }
        }
      }
    });
  }

}());