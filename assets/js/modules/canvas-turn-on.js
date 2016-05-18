(function(){
  var button = get('#to-canvas')
    , flag = false;


  button.onclick = showCanvas;

  function showCanvas(){
    if (!flag) {
      var canvas = get('#polygon');

      sleep(canvas);
      css(canvas, {zIndex: 5, background: 'rgba(255, 255, 255, .5)'});
      awake(canvas);

      this.value = 'Переключиться на карту';

      flag = true;
    }else {
      this.onclick = showMap;
      this.onclick();
    }

  function showMap() {
    if (flag){
      var canvas = get('#polygon');

      sleep(canvas);
      css(canvas, {zIndex: 0, background: 'transparent'});
      awake(canvas);

      this.value = 'Переключиться на холст';

      flag = false;
    }else {
      this.onclick = showCanvas;
      this.onclick();
    }
  }

  }
}())