(function(){
  

  var hard = get('.hard-drone-cls')
    , hardCheckboxes = get('.hard-drone-checks')
    , each = Array.prototype.forEach;

    each.call(hard, function(x, i, a){
      x.onclick = function() {
        if (hardCheckboxes[i].checked){
          hardCheckboxes[i].checked = false;
        }
      }
    });

  var middle = get('.middle-drone-cls')
    , middleCheckboxes = get('.middle-drone-checks');

    each.call(middle, function(x, i, a){
      x.onclick = function() {
        if (middleCheckboxes[i].checked){
          middleCheckboxes[i].checked = false;
        }
      }
    });

  var light = get('.light-drone-cls')
    , lightCheckboxes = get('.light-drone-checks');

    each.call(light, function(x, i, a){
      x.onclick = function() {
        if (lightCheckboxes[i].checked){
          lightCheckboxes[i].checked = false;
        }
      }
    });


}());