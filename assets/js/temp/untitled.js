
  /**
   *
   * Create polygon
   *
   */
  
  var polygon = sample.canvasMap.getContext('2d');

  /**
   *
   * If we click on button
   *
   */
  
  sample.base.button.onclick = function() {

    var x = sample.base.coordinates.x
      , y = sample.base.coordinates.y;


    /**
     *
     * Get snowball if it is existed
     *
     */
    
    var snowball = get('.snow')
      , dotesAmount = sample.dotes.amount.innerText
      , ending = '';

    dotesAmount > 1 ? ending = ' точечных целей!': ending = ' точечную цель!';

    var wasChanged = false;

    var interval = setInterval(function() {
      if(wasChanged){
        clearInterval(interval);
        sample.canvasMap.onclick = null;
      }
    },10);

    /**
     *
     * If it hasn't been created
     *
     */
    
    if (!snowball.length){
      iHide(sample.panel, 'Кликните на карту и определите место базирования беспилотников');
    }

    /**
     *
     * We start watching for cursor coordinates and close access to control
     *
     */
    
    sample.canvasMap.onmousemove =  function(e){

      /**
       *
       * When we click to the canvas element, we stop watching for cursor coordinates and return base coordinates
       *
       */
      

      this.onclick = function() {

        /**
         *
         * If it isn't empty
         *
         */
        
        if (x && y){
          console.log(polygon, polygon.width, polygon.height);
          polygon.clearRect(x - 100, y - 100, 500, 500);
          console.log(1);
        }

        /**
         *
         * Canvas offset, circle radiuses and center
         *
         */
        
        var offset = sample.canvasMap.getBoundingClientRect()
        , x0 = e.clientX - offset.left
        , y0 = e.clientY - offset.top
        , r = 6
        , startAngle = 0
        , endAngle = 2*Math.PI;

        /**
         *
         * Draw filled circle
         *
         */
        
        polygon.beginPath();
        polygon.fillStyle = 'rgba(93, 138, 168, 1)';
        polygon.arc(x0, y0, r, startAngle, endAngle);
        polygon.lineWidth = 5
        polygon.fill();

        /**
         *
         * Draw stroke
         *
         */
        
        polygon.beginPath();
        polygon.strokeStyle = 'rgba(93, 138, 168, 1)';
        polygon.arc(x0, y0, r + 6, startAngle, endAngle);
        polygon.stroke()

        sample.base.coordinates = {x: x0, y: y0 };
        sample.canvasMap.onmousemove = null;

        /**
         *
         * Get all center coords (lontitude and latitude)
         *
         */
        var closeSnow = get('.snow-close-it')[0]
          , par = get('.snow-paragraph')[0];

        /**
         *
         * Makes closeSnow button and paragraph sleep again
         *
         */
        css(closeSnow, {opacity: 0});
        css(par, {opacity: 0});

        /**
         *
         * Add new class to button
         *
         */
        closeSnow.className = closeSnow.className + ' confirm-base';

        /**
         *
         * Replace value of the button while it is in 'Sleep'
         *
         */
        replaceInSleep(closeSnow, 'Подтвердить', 300);
        replaceInSleep(par, 'Установка базы произошла успешно, командир!', 300);

        css(closeSnow, {top: '20%'});

        /**
         *
         * Show again this button
         *
         */
        awake(closeSnow);
        awake(par);

        wasChanged = true;

        /**
         *
         * Add coordinates to common array
         *
         */
        
        sample.base.coordinates.x = x0;
        sample.base.coordinates.x = y0;
      }

    }
