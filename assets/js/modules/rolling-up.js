(function(){

  var hardButtons = get('.hard-drone-hide')
    , hardContent = get('.chars')
    , each = Array.prototype.forEach;

  /**
   *
   * Setting up event handler for hard-drones
   *
   */
  
  each.call(hardButtons, function(x, i, a){
    x.onclick = function(){

      console.log(hardContent[i].id);
      if (hardContent[i].id === 'active') {
        hardContent[i].id = '';
      }else {
        hardContent[i].id = 'active';
      }
      // else {
      //   each.call(hardContent, function(y, j, b){
      //     if (y.id){
      //       y.id = '';
      //     }
      //   });
      //   hardContent[i].id = 'active';
      // }
    }
  });

  var middleButtons = get('.middle-drone-hide')
    , middleContent = get('.chars')
    , slicy = Array.prototype.slice;

    middleContent = slicy.call(middleContent, hardButtons.length);

  /**
   *
   * Setting up event handler for middle-drones
   *
   */
  
  each.call(middleButtons, function(x, i, a){
    x.onclick = function(){

      if (middleContent[i].id === 'active') {
        middleContent[i].id = '';
      }else {
        // each.call(middleContent, function(y, j, b){
        //   if (y.id){
        //     y.id = '';
        //   }
        // });
        middleContent[i].id = 'active';
      }

    }
  });

  var lightButtons = get('.light-drone-hide')
    , lightContent = get('.chars');

    lightContent = slicy.call(lightContent, hardButtons.length + middleButtons.length);

  /**
   *
   * Setting up event handler for light-drones
   *
   */
  
  each.call(lightButtons, function(x, i, a){
    x.onclick = function(){

      if (lightContent[i].id === 'active') {
        lightContent[i].id = '';
      }else {
        // each.call(lightContent, function(y, j, b){
        //   if (y.id){
        //     y.id = '';
        //   }
        // });
        lightContent[i].id = 'active';
      }

    }
  });


}());