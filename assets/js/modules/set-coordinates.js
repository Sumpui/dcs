/*==================================================================
=            Constructor MapIneraction and it's methods            =
==================================================================*/
function MapInteraction(elements){

  if (elements === undefined){
    elements = {};
  }

  if (typeof elements !== 'object') throw new TypeError('Incoming arguments is not an object');

  for (var i in elements) {
    if (typeof elements[i] !== 'string'){
      this[i] = elements[i];
    }else{
      this[i] = get(elements[i]);
    }
  }
}


/*====================================================
=            Map's methods and properties            =
====================================================*/


MapInteraction.prototype.setDotes = function() {

  var self = this
    , oldDotesAmount = parseInt(self.dotes.amount.innerText);

  var counter = count(1);

  self.dotes.button.onclick = function() {

    var snowball = get('.snow')
      , dotesAmount = self.dotes.amount.innerText
      , ending = '';

    dotesAmount > 1 ? ending = ' точечных целей!': ending = ' точечную цель!';

    if (!snowball.length){
      iHide(self.panel, 'Кликните на карту и определите ' + dotesAmount + ending);
    }

    /**
     *
     * Flag to remove event 'click' from myMap events
     *
     */
    var wasChanged = false;

    /**
     *
     * Add click event to the map
     *
     */
    myMap.events.add('click', installDotes);

    /**
     *
     * Watch for the event click on the map and add to button closeSnow new handler onclick
     *
     */
    var interval = setInterval(function() {
      if(wasChanged){
        clearInterval(interval);
        myMap.events.remove('click', installDotes);
      }
    },10);

    function installDotes(e) {

      var updatedDotesAmount = parseInt(self.dotes.amount.innerText);

      // console.log(self.dotesCoordinates.length + 1,  );
      if (dotesTargets.get(updatedDotesAmount - 1)){
        self.dotesCoordinates.length = 0;
        dotesTargets.removeAll();
        counter = count(1);
      }

      var coords = e.get('coords');

      /**
       *
       * Get all center coords (lontitude and latitude)
       *
       */
      var coords = e.get('coords')
        , lon = get('.lon-base')
        , lat = get('.lat-base')
        , closeSnow = get('.snow-close-it')[0]
        , par = get('.snow-paragraph')[0];


      if (closeSnow && par && (self.dotesCoordinates.length + 1 === parseInt(self.dotes.amount.innerText))){
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

        // oldDotesAmount = parseInt(self.dotes.amount.innerText);

      }

      /**
       *
       * Create a baloon point on the map
       *
       */
      var baloon = myMap.geoObjects;

      var placemark = new ymaps.Placemark([coords[0], coords[1]], {
          iconContent: counter() + 'D.',
          balloonContent: '<strong> Точечные цели </strong>'
      }, {
          preset: 'islands#circleIcon',
          iconColor: 'red',
      });

      dotesTargets.add(placemark);

      self.dotesCoordinates.push(placemark);

      baloon.add(dotesTargets);
    }
  }
}

MapInteraction.prototype.setBase = function() {

  var self = this;

  this.button.onclick = function() {

    var snowball = get('.snow');

    /**
     *
     * If our snowball hasn't been created, create it!
     *
     */
    if (!snowball.length){
      iHide(self.panel, 'Кликните на карту и выбирете место базирования');
    }

    /**
     *
     * Flag to remove event 'click' from myMap events
     *
     */
    var wasChanged = false;

    /**
     *
     * Add click event to the map
     *
     */
    myMap.events.add('click', getCenter);

    /**
     *
     * Watch for the event click on the map and add to button closeSnow new handler onclick
     *
     */
    var interval = setInterval(function() {
      if(wasChanged){
        clearInterval(interval);
        myMap.events.remove('click', getCenter);
      }
    },10);

    /**
     *
     * Callback on the click event
     *
     */
    function getCenter(e){

      if (self.baseBalloon.length){
        myCollection.remove(myCollection.get(0));
      }

      /**
       *
       * Get all center coords (lontitude and latitude)
       *
       */
      var coords = e.get('coords')
        , lon = get('.lon-base')
        , lat = get('.lat-base')
        , closeSnow = get('.snow-close-it')[0]
        , par = get('.snow-paragraph')[0];

      if (closeSnow && par){

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

      }

      /**
       *
       * Create a baloon point on the map
       *
       */
      var baloon = myMap.geoObjects;

      var placemark = new ymaps.Placemark([coords[0], coords[1]], {
          iconContent: 'B',
          balloonContent: '<strong> Место базирования </strong>'
      }, {
          preset: 'islands#circleIcon',
          iconColor: '#336f94',
      });

      myCollection.add(placemark);

      self.baseBalloon.push(placemark);

      baloon.add(myCollection);

      /**
       *
       * Round values to the 3d value
       *
       */
      lon[0].replaceText(coords[0].toPrecision(6));
      lat[0].replaceText(coords[1].toPrecision(6));

      /**
       *
       * Set up new class if it wasn't set up earlier
       *
       */
      if ((lat[0].className.indexOf('not-choosen')) && lon[0].className.indexOf('not-choosen')) {
        lon[0].className = lon[0].cutClassTo('not-choosen') + 'choosen-base';
        lat[0].className = lat[0].cutClassTo('not-choosen') + 'choosen-base';
      }

      for (var i = 0; i <= coords.length - 1; i++){
        self.baseCoordinates.push(coords[i]);
      }

    }
  }
}

  /*======================================
  =            Canvas methods            =
  ======================================*/

MapInteraction.prototype.canvas = {};

MapInteraction.prototype.canvas.setBase = function(sample) {
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
      , y = sample.base.coordinates.y
      , r = sample.base.radius
      , d = r*2*2;

    /**
     *
     * Get snowball if it is existed
     *
     */
    
    var snowball = get('.snow')
      , dotesAmount = sample.dotes.amount.innerText
      , ending = '';

    dotesAmount > 1 ? ending = ' точечных целей!': ending = ' точечную цель!';

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
          // polygon.beginPath();
          // polygon.strokeStyle = 'red';
          // // polygon.rect(x - 15, y - 15, 30, 30);
          // polygon.lineWidth = 5
          // polygon.stroke();
          polygon.clearRect(x - d, y - d, d*2, d*2);
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
        , endAngle = 2*Math.PI
        , color = 'rgba(93, 138, 168, 1)';

        /**
         *
         * Draw filled circle
         *
         */
        
        drawCircle(polygon, x0, y0, r, startAngle, endAngle, 0, color, 2);
        drawCircle(polygon, x0, y0, r + 6, startAngle, endAngle, color, 0, 2);

        MapInteraction.prototype.baseCoordinates = {x: x0, y: y0 };
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
        replaceInSleep(par, 'Установка базы произошла успешно!', 300);

        css(closeSnow, {top: '20%'});

        /**
         *
         * Show again this button
         *
         */
        awake(closeSnow);
        awake(par);

        sample.canvasMap.onclick = null;

        /**
         *
         * Add coordinates to common array
         *
         */
        
        MapInteraction.prototype.baseCoordinates.x = x0;
        MapInteraction.prototype.baseCoordinates.y = y0;
        MapInteraction.prototype.baseRadius = r;

        var values = sample.base.values;

        values.xV.replaceText(x0.toString());
        values.yV.replaceText(y0.toString());

        /**
         *
         * Show drones block, if it is hidden
         *
         */
        
        var drones = get('.drones')[0]
          , styles = window.getComputedStyle(drones);

        if (styles.display === 'none'){
          css(drones, {display: 'block'});
        }

        for (var i in values){
          values[i].className = values[i].cutClassTo('not-choosen') + 'choosen';
        }

      }
    }
  }
};

MapInteraction.prototype.canvas.setDotes = function(sample) {

  /**
   *
   * Create canvas
   *
   */
  
  var polygon = sample.canvasMap.getContext('2d')
    , counter = count(1);

  sample.dotes.button.onclick = function() {

    var amount = parseInt(sample.dotes.amount.innerText)
      , dotesLen = sample.dotesCoordinates.length
      , r = sample.dotes.radius
      , d = r*2*2;

    if (amount <= dotesLen - 1){
      var coords = sample.dotesCoordinates;
      for (var i = 0; i <= coords.length - 1; i++){
        polygon.clearRect(coords[i].x - d*2*2, coords[i].y - d*2*2.65, d*2*2*5, d*2*2*2);
      }
      counter = count(1);
      coords.length = 0;
    }

    /**
     *
     * Get snowball if it is existed, get amount value;
     *
     */
    var snowball = get('.snow')
      , dotesAmount = sample.dotes.amount.innerText
      , color = 'rgba(255,64,64, 1)'
      , ending = '';

    dotesAmount > 1 ? ending = ' точечных целей!': ending = ' точечную цель!';

    /**
     *
     * If it hasn't been created
     *
     */
    
    if (!snowball.length){
      iHide(sample.panel, 'Кликните на карту и определите ' + amount + ending);
    }

    sample.canvasMap.onmousemove = function(e) {

      this.onclick = function() {

        var len = sample.dotesCoordinates.length;

        /**
         *
         * Canvas offset, circle radiuses and center
         *
         */
        
        var offset = sample.canvasMap.getBoundingClientRect()
        , x0 = e.clientX - offset.left
        , y0 = e.clientY - offset.top
        , startAngle = 0
        , endAngle = 2*Math.PI
        , val = counter();

        /**
         *
         * Draw filled circle
         *
         */
        
        drawCircle(polygon, x0, y0, r, startAngle, endAngle, 0, color, 2, '  ' + val + 'D');
        drawCircle(polygon, x0, y0, r + 6, startAngle, endAngle, color, 0, 2, 0);

        MapInteraction.prototype.dotesCoordinates.push({
          name: val + 'D',
          x: x0,
          y: y0
        });

        /**
         *
         * If we set up those amount of dotes we need, 
         *
         */
        
        if (len + 1 === amount){

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
          replaceInSleep(par, 'Задание целей произошло успешно!', 300);

          css(closeSnow, {top: '20%'});

          /**
           *
           * Show again this button
           *
           */
          awake(closeSnow);
          awake(par);


          sample.canvasMap.onmousemove = null;
          sample.canvasMap.onclick = null;

          addToTable(sample);

          humane.log('Вы установили все точечные цели.');

         /**
          *
          * Start computing distance from drones to points
          *
          */
          sample.computeDistance('dotes');
        }
      }
    }
  }
  function addToTable(s) {
    var existedDotes = s.dotesCoordinates
      , clones = [];

    for (var j = 0; j <= existedDotes.length - 1; j++){

      var dotesRow = get('.dotes-coords-row')[0]
        , dotesClone = dotesRow.cloneNode(true);

      dotesClone.className = dotesClone.cutClassTo('-', true) + '-' + (j + 1);

      var children = dotesClone.getChildren();

      for (var i = 1; i <= children.length - 1; i++){
        children[i].className = children[i].cutClassTo('not-choosen', true);
        children[i].className = children[i].cutClassTo('-', true);
        children[i].className += '-' + (j + 1) + ' choosen';
        children[0].replaceText((j + 1) + 'D.');
      }

      children[1].replaceText((s.dotesCoordinates[j].x).toString());
      children[2].replaceText((s.dotesCoordinates[j].y).toString());

      clones.push(dotesClone);

    }

    var tbody = get('.dotes-body')[0]
      , tbodyChildren = tbody.getChildren();

      for (var b = 0; b <= tbodyChildren.length - 1; b++){
        tbodyChildren[b].remove();
      }

    for (var k = 0; k <= clones.length - 1; k++){
      tbody.parentOf(clones[k]);
    }
    return true;
  }
};

MapInteraction.prototype.canvas.setTrajectory = function(sample) {

  /**
   *
   * Create canvas
   *
   */
  var polygon = sample.canvasMap.getContext('2d')
    , r = sample.trajectory.radius
    , d = r*2*2;

  /**
   *
   * Counters
   *
   */
  var counter = count(1)
    , evenCounter = count(0)
    , dotesID = count(1)
    , evDotes = dotesID();

  /**
   *
   * Gather dotes to line in one array;
   *
   */
  var lineCoords = [];


  sample.trajectory.button.onclick = function() {


    // sample.canvas.createPolygons();

    /**
     *
     * Get snowball if it is existed, get amount value;
     *
     */
    var snowball = get('.snow')
      , ending = ''
      , amount = parseInt(sample.trajectory.amount.innerText)
      , trajectoryLen = sample.trajectoryCoordinates.length;

    amount > 1 ? ending = ' траекторных целей!': ending = ' тректорную цель!';
    /**
     *
     * If it hasn't been created
     *
     */
    
    if (!snowball.length){
      iHide(sample.panel, 'Кликните на карту и определите ' + amount + ending);
    }

    if (amount <= trajectoryLen){
      var coords = sample.trajectoryCoordinates;

      for (var i = 0; i <= coords.length - 1; i++){
        coordinate = coords[i];
        var xc1 = coordinate[0].x
          , yc1 = coordinate[0].y
          , xc2 = coordinate[1].x
          , yc2 = coordinate[1].y;

        /**
         *
         * Clear dotes and text near there
         *
         */
        
        polygon.clearRect(xc1 - d*2*2, yc1 - d*2*2.65, d*2*2*5, d*2*2*2)
        polygon.clearRect(xc2 - d*2*2, yc2 - d*2*2.65, d*2*2*5, d*2*2*2)
        /**
         *
         * Clear line
         *
         */
        
        polygon.clearRect(xc1, yc1, (xc2 - xc1), (yc2 - yc1));
      }
      counter = count(1);
      evenCounter = count(0);
      dotesID = count(1);
      evDotes = dotesID();
      coords.length = 0;
    }

    /**
     *
     * Handler to mouse moving
     *
     */
    
    sample.canvasMap.onmousemove = function(e) {


      /**
       *
       * Handler to events
       *
       */
      
      this.onclick = function() {

        /**
         *
         * Canvas offset, circle radiuses and center
         *
         */
        
        var offset = sample.canvasMap.getBoundingClientRect()
        , x0 = e.clientX - offset.left
        , y0 = e.clientY - offset.top
        , color = 'rgba(73, 121, 107, 1)'
        , startAngle = 0
        , endAngle = 2*Math.PI

        // console.log(x0, y0);

        /**
         *
         * Increasing it every time when user clicks
         *
         */
        
        lineCoords.push({
          x: x0,
          y: y0
        });

        var ev = evenCounter();

        /**
         *
         * To define a line we need to draw
         *
         */
          
        if (ev === 1){
          evenCounter = count(0);
          // sample.trajectory.coordinates.push(lineCoords);
          MapInteraction.prototype.trajectoryCoordinates.push(lineCoords);

          /**
           *
           * Lines peaks coordinates
           *
           */
          
          var x1 = lineCoords[0].x
            , y1 = lineCoords[0].y
            , x2 = lineCoords[1].x
            , y2 = lineCoords[1].y

          polygon.beginPath();
          polygon.moveTo(x1, y1);
          polygon.lineTo(x2, y2);
          polygon.strokeStyle = 'rgba(73, 121, 107, .5)';
          polygon.stroke();

          lineCoords = [];

          /**
           *
           * If trajectory targets amount is equal to targets, that we have created
           *
           */
          
          if (sample.trajectoryCoordinates.length === amount){

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
            replaceInSleep(par, 'Задание целей произошло успешно!', 300);

            css(closeSnow, {top: '20%'});

            /**
             *
             * Show again this button
             *
             */
            awake(closeSnow);
            awake(par);

            sample.canvasMap.onmousemove = null;
            sample.canvasMap.onclick = null;

            addToTrajectoryTable(sample);

            /**
              *
              * Start computing distance from drones to trajectories
              *
              */
            sample.computeDistance('trajectory');
          }

        }

        /**
         *
         * Draw filled circle
         *
         */
        
        drawCircle(polygon, x0, y0, r + 2, startAngle, endAngle, 0, color, 2, '  ' + evDotes + 'T.' + counter());

        if (ev === 1){
          evDotes = dotesID();
          counter = count(1);
        }
      }
    }
  }
  function addToTrajectoryTable(s) {

    var existedTrajectory = s.trajectoryCoordinates
      , clones = [];

    /**
     *
     * Run on all arrays
     *
     */
    
    for (var j = 0; j <= existedTrajectory.length - 1; j++){

      var element = existedTrajectory[j];

      /**
       *
       * Run on all elements in arrays (coordinates)
       *
       */
      
      for (var l = 0; l <= element.length - 1; l++){

        /**
         *
         * Cloning trajectory table row and its children. Setting up attributes to correct view
         *
         */
        
        var trajectoryRow = get('.trajectory-coords-row')[0]
          , trajectoryClone = trajectoryRow.cloneNode(true);

        trajectoryClone.className = trajectoryClone.cutClassTo('coordinate-1', true) + 'coordinate-' + (j + 1) + '-' + (l + 1);

        var children = trajectoryClone.getChildren();

        for (var h = 1; h <= children.length - 1; h++){
          children[h].className = children[h].cutClassTo('not-choosen', true);
          children[h].className = children[h].cutClassTo('thla-', true);
          children[h].className += 'thla-' + (l + 1) + '-' + h + ' choosen';
        }

        children[0].replaceText((j + 1) + 'T.' + (l + 1));
        children[1].replaceText((s.trajectoryCoordinates[j][l].x).toString());
        children[2].replaceText((s.trajectoryCoordinates[j][l].y).toString());

        clones.push(trajectoryClone);

      }
    }
    /**
     *
     * Get parent table body
     *
     */

    var tbody = get('.trajectory-table-body')[0]

    /**
     *
     * Search for the existed children
     *
     */
    var tbodyChildren = tbody.getChildren();

    for (var e = 0; e <= tbodyChildren.length - 1; e++){
      tbodyChildren[e].remove();
    }

    /**
     *
     * Remove existed children
     *
     */

    for (var q = 0; q <= clones.length - 1; q++){
      tbody.parentOf(clones[q]);
    }

    return true;
  }
};

// MapInteraction.prototype.canvas.setTrajectory = function(sample) {

//   /**
//    *
//    * Create canvas
//    *
//    */
//   var polygon = sample.canvasMap.getContext('2d')
//     , r = sample.area.radius
//     , d = r*2*2;

//   /**
//    *
//    * Counters
//    *
//    */
//   var counter = count(1)
//     , evenCounter = count(0)
//     , dotesID = count(1)
//     , evDotes = dotesID();

//   /**
//    *
//    * Gather dotes to line in one array;
//    *
//    */
//   var lineCoords = [];


//   sample.area.button.onclick = function() {


//     // sample.canvas.createPolygons();

//     /**
//      *
//      * Get snowball if it is existed, get amount value;
//      *
//      */
//     var snowball = get('.snow')
//       , ending = ''
//       , amount = parseInt(sample.trajectory.amount.innerText)
//       , trajectoryLen = sample.trajectoryCoordinates.length;

//     amount > 1 ? ending = ' траекторных целей!': ending = ' тректорную цель!';
//     /**
//      *
//      * If it hasn't been created
//      *
//      */
    
//     if (!snowball.length){
//       iHide(sample.panel, 'Кликните на карту и определите ' + amount + ending);
//     }

//     if (amount <= trajectoryLen){
//       var coords = sample.trajectoryCoordinates;

//       for (var i = 0; i <= coords.length - 1; i++){
//         coordinate = coords[i];
//         for (var j = 0; j <= coordinate.length - 1; j++){
//           /**
//            *
//            * Clear dots and text
//            *
//            */
          
//           polygon.clearRect(coordinate[j].x - d*2*2, coordinate[j].y - d*2*2.65, d*2*2*5, d*2*2*2);
//           if (j === coordinate.length - 1){
//             continue;
//           }else{
//             /**
//              *
//              * Clear lines
//              *
//              */
            
//             polygon.clearRect(coordinate[j].x, coordinate[j].y, (coordinate[j + 1].x - coordinate[j].x), (coordinate[j + 1].y - coordinate[j].y));
//           }
//         }
//         var xc1 = coordinate[0].x
//           , yc1 = coordinate[0].y
//           , xc2 = coordinate[1].x
//           , yc2 = coordinate[1].y
//           , xc3 = coordinate[2].x
//           , yc3 = coordinate[2].y
//           , xc4 = coordinate[3].x
//           , yc4 = coordinate[3].y;

//         /**
//          *
//          * Clear dotes and text near there
//          *
//          */
        
//         polygon.clearRect(xc1 - d*2*2, yc1 - d*2*2.65, d*2*2*5, d*2*2*2)
//         polygon.clearRect(xc2 - d*2*2, yc2 - d*2*2.65, d*2*2*5, d*2*2*2)
//         /**
//          *
//          * Clear line
//          *
//          */
        
//         polygon.clearRect(xc1, yc1, (xc2 - xc1), (yc2 - yc1));
//       }
//       counter = count(1);
//       evenCounter = count(0);
//       dotesID = count(1);
//       evDotes = dotesID();
//       coords.length = 0;
//     }

//     /**
//      *
//      * Handler to mouse moving
//      *
//      */
    
//     sample.canvasMap.onmousemove = function(e) {


//       /**
//        *
//        * Handler to events
//        *
//        */
      
//       this.onclick = function() {

//         /**
//          *
//          * Canvas offset, circle radiuses and center
//          *
//          */
        
//         var offset = sample.canvasMap.getBoundingClientRect()
//         , x0 = e.clientX - offset.left
//         , y0 = e.clientY - offset.top
//         , color = 'rgba(73, 121, 107, 1)'
//         , startAngle = 0
//         , endAngle = 2*Math.PI

//         // console.log(x0, y0);

//         /**
//          *
//          * Increasing it every time when user clicks
//          *
//          */
        
//         lineCoords.push({
//           x: x0,
//           y: y0
//         });

//         var ev = evenCounter();

//         /**
//          *
//          * To define a line we need to draw
//          *
//          */
          
//         if (ev === 1){
//           evenCounter = count(0);
//           // sample.trajectory.coordinates.push(lineCoords);
//           MapInteraction.prototype.trajectoryCoordinates.push(lineCoords);

//           /**
//            *
//            * Lines peaks coordinates
//            *
//            */
          
//           var x1 = lineCoords[0].x
//             , y1 = lineCoords[0].y
//             , x2 = lineCoords[1].x
//             , y2 = lineCoords[1].y

//           polygon.beginPath();
//           polygon.moveTo(x1, y1);
//           polygon.lineTo(x2, y2);
//           polygon.strokeStyle = 'rgba(73, 121, 107, .5)';
//           polygon.stroke();

//           lineCoords = [];

//           /**
//            *
//            * If trajectory targets amount is equal to targets, that we have created
//            *
//            */
          
//           if (sample.trajectoryCoordinates.length === amount){

//            /**
//              *
//              * Get all center coords (lontitude and latitude)
//              *
//              */
//             var closeSnow = get('.snow-close-it')[0]
//               , par = get('.snow-paragraph')[0];

//             /**
//              *
//              * Makes closeSnow button and paragraph sleep again
//              *
//              */
//             css(closeSnow, {opacity: 0});
//             css(par, {opacity: 0});

//             /**
//              *
//              * Add new class to button
//              *
//              */
//             closeSnow.className = closeSnow.className + ' confirm-base';

//             /**
//              *
//              * Replace value of the button while it is in 'Sleep'
//              *
//              */
//             replaceInSleep(closeSnow, 'Подтвердить', 300);
//             replaceInSleep(par, 'Задание целей произошло успешно!', 300);

//             css(closeSnow, {top: '20%'});

//             /**
//              *
//              * Show again this button
//              *
//              */
//             awake(closeSnow);
//             awake(par);

//             sample.canvasMap.onmousemove = null;
//             sample.canvasMap.onclick = null;

//             addToTrajectoryTable(sample);

//             /**
//               *
//               * Start computing distance from drones to trajectories
//               *
//               */
//             sample.computeDistance('trajectory');
//           }

//         }

//         /**
//          *
//          * Draw filled circle
//          *
//          */
        
//         drawCircle(polygon, x0, y0, r + 2, startAngle, endAngle, 0, color, 2, '  ' + evDotes + 'T.' + counter());

//         if (ev === 1){
//           evDotes = dotesID();
//           counter = count(1);
//         }
//       }
//     }
//   }
//   function addToTrajectoryTable(s) {

//     var existedTrajectory = s.trajectoryCoordinates
//       , clones = [];

//     /**
//      *
//      * Run on all arrays
//      *
//      */
    
//     for (var j = 0; j <= existedTrajectory.length - 1; j++){

//       var element = existedTrajectory[j];

//       /**
//        *
//        * Run on all elements in arrays (coordinates)
//        *
//        */
      
//       for (var l = 0; l <= element.length - 1; l++){

//         /**
//          *
//          * Cloning trajectory table row and its children. Setting up attributes to correct view
//          *
//          */
        
//         var trajectoryRow = get('.trajectory-coords-row')[0]
//           , trajectoryClone = trajectoryRow.cloneNode(true);

//         trajectoryClone.className = trajectoryClone.cutClassTo('coordinate-1', true) + 'coordinate-' + (j + 1) + '-' + (l + 1);

//         var children = trajectoryClone.getChildren();

//         for (var h = 1; h <= children.length - 1; h++){
//           children[h].className = children[h].cutClassTo('not-choosen', true);
//           children[h].className = children[h].cutClassTo('thla-', true);
//           children[h].className += 'thla-' + (l + 1) + '-' + h + ' choosen';
//         }

//         children[0].replaceText((j + 1) + 'T.' + (l + 1));
//         children[1].replaceText((s.trajectoryCoordinates[j][l].x).toString());
//         children[2].replaceText((s.trajectoryCoordinates[j][l].y).toString());

//         clones.push(trajectoryClone);

//       }
//     }
//     /**
//      *
//      * Get parent table body
//      *
//      */

//     var tbody = get('.trajectory-table-body')[0]

//     /**
//      *
//      * Search for the existed children
//      *
//      */
//     var tbodyChildren = tbody.getChildren();

//     for (var e = 0; e <= tbodyChildren.length - 1; e++){
//       tbodyChildren[e].remove();
//     }

//     /**
//      *
//      * Remove existed children
//      *
//      */

//     for (var q = 0; q <= clones.length - 1; q++){
//       tbody.parentOf(clones[q]);
//     }

//     return true;
//   }
// };

MapInteraction.prototype.canvas.setAirDefence = function(sample){


  /**
   *
   * Create canvas
   *
   */
  
  var polygon = sample.canvasMap.getContext('2d')
    , counter = count(1);


  sample.airDefence.button.onclick = function() {

    var amount = parseInt(sample.airDefence.amount.innerText)
      , defencesLen = sample.defenceCoordinates.length
      , r = sample.airDefence.radius
      , d = r*2*2;

    if (amount <= defencesLen){
      var coords = sample.defenceCoordinates;
      for (var i = 0; i <= coords.length - 1; i++){
        polygon.clearRect(coords[i].x - d*2*2, coords[i].y - d*2*2.65, d*2*2*5, d*2*2*2);
      }
      counter = count(1);
      coords.length = 0;
      sample.airDefence.coordinates.length = 0;
    }

    /**
     *
     * Get snowball if it is existed, get amount value;
     *
     */
    var snowball = get('.snow')
      , defenceAmount = sample.airDefence.amount.innerText
      , cenColor = 'rgba(68, 110, 199, .3)'
      , rColor = 'rgba(68, 110, 199, 1)'
      , ending = '';

    defenceAmount > 1 ? ending = ' установок ПВО!': ending = ' установку ПВО!';

    /**
     *
     * If it hasn't been created
     *
     */
    
    if (!snowball.length){
      iHide(sample.panel, 'Кликните на карту и определите ' + amount + ending);
    }

    sample.canvasMap.onmousemove = function(e) {

      this.onclick = function() {

        var len = sample.defenceCoordinates.length;

        /**
         *
         * Canvas offset, circle radiuses and center
         *
         */
        
        var offset = sample.canvasMap.getBoundingClientRect()
        , x0 = e.clientX - offset.left
        , y0 = e.clientY - offset.top
        , startAngle = 0
        , endAngle = 2*Math.PI
        , val = counter();

        /**
         *
         * Draw filled circle
         *
         */
        
        drawCircle(polygon, x0, y0, r + 20, startAngle, endAngle, 0, cenColor, 2, 0);
        drawCircle(polygon, x0, y0, r - 6, startAngle, endAngle, 0, rColor, 2, 0);
        drawText(polygon, rColor, '9px Tahoma', val.toString() + 'Def', [x0 + 5, y0 + 9]);
        // drawCircle(polygon, x0, y0, r + 12, startAngle, endAngle, color, 0, 2, 0);

        MapInteraction.prototype.defenceCoordinates.push({
          name: val + 'Def',
          x: x0,
          y: y0
        });

        sample.airDefence.coordinates.push({
          name: val + 'Def',
          x: x0,
          y: y0,
          radius: {
            pixels: r + 15,
            kilometers: (r + 15)/sample.kInP
          }
        });

        /**
         *
         * If we set up those amount of dotes we need, 
         *
         */
        
        if (len + 1 === amount){

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
          replaceInSleep(par, 'Задание целей произошло успешно!', 300);

          css(closeSnow, {top: '20%'});

          /**
           *
           * Show again this button
           *
           */
          awake(closeSnow);
          awake(par);


          sample.canvasMap.onmousemove = null;
          sample.canvasMap.onclick = null;

          // addToTable(sample);

          humane.log('Вы установили все ПВО.');

          console.log(sample.airDefence.coordinates)

         // *
         //  *
         //  * Start computing distance from drones to points
         //  *
          
         //  sample.computeDistance('dotes');
        }
      }
    }
  }
}

MapInteraction.prototype.computeDistance = function(kind) {

  var map = new MapInteraction();

  MapInteraction.prototype.kInP = 2.84210526315789;

  if(kind === 'dotes') MapInteraction.prototype.distances.toDotes = computeDistanceToDotes();
  if(kind === 'trajectory') MapInteraction.prototype.distances.toTrajectories = computeDistanceToTrajectories();
  if(kind === 'area') MapInteraction.prototype.distances.toAreas = computeDistanceToAreas();

  function computeDistanceToDotes(){
    var mapCanvas = new MapInteraction()
      , dotes = mapCanvas.dotesCoordinates
      , base = mapCanvas.baseCoordinates
      , result = [];

    if (isCorrect(dotes, 'Array')){

      dotes.forEach(function(element, ind, arr){
        var dotX = element.x
          , dotY = element.y
          , baseX = base.x
          , baseY = base.y
          , distance = {}
          , obj = {}
          , k = mapCanvas.kInP;

          distance.x = dotX - baseX;
          distance.y = dotY - baseY;

          distance.result = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

          distance.result = parseInt(distance.result.toFixed(3));

        obj = {
          name: element.name,
          pixels: distance.result,
          coords: {
            x: dotX,
            y: dotY
          },
          kilometers: distance.result*k,
          to: {}
        }

        dotes.forEach(function(dot, i, a){
          var distance = {};

          if (i !== ind){


            distance.x = dot.x - dotX;
            distance.y = dot.y - dotY;

            distance.result = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

            distance.result = parseInt(distance.result.toFixed(3));

            obj.to[dot.name] = {
              pixels: distance.result,
              kilometers: distance.result*k,
              name: dot.name
            }
          }
        });

          result.push(obj);
      });

    }

    return result;
  }

  function computeDistanceToTrajectories(){
    var mapCanvas = new MapInteraction()
      , trajectory = mapCanvas.trajectoryCoordinates
      , base = mapCanvas.baseCoordinates
      , result = []
      , k = mapCanvas.kInP;

    if (isCorrect(trajectory, 'Array')) trajectory.forEach(function(element, ind, arr){

      result.push([]);

      element.forEach(function(oneDot, j, b){
        var dotX = oneDot.x
          , dotY = oneDot.y
          , baseX = base.x
          , baseY = base.y
          , distance = {}
          , previous = result[ind][j - 1]
          , data = {};

        distance.x = dotX - baseX;
        distance.y = dotY - baseY;

        distance.result = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

        distance.result = parseInt(distance.result.toFixed(3));

        data.pixels = distance.result;
        data.kilometers = distance.result*k;

        if (previous){
          if (distance.result <= previous.pixels){
            data.entry = true;
          }else {
            result[ind][j - 1].entry = true;
          }
        }
        result[ind].push(data);
      });

    });

    return result;
  }
}

MapInteraction.prototype.replaceHeaders = function(lon, lat){

  this.base.headers.xH.replaceText(lon);
  this.base.headers.yH.replaceText(lat);

  this.dotes.headers.xH.replaceText(lon);
  this.dotes.headers.yH.replaceText(lat);

  this.trajectory.headers.xH.replaceText(lon);
  this.trajectory.headers.yH.replaceText(lat);

  this.area.headers.xH.replaceText(lon);
  this.area.headers.yH.replaceText(lat);

  return this;
}

MapInteraction.prototype.canvas.initialize = function(sp) {


  sp.replaceHeaders('x', 'y');

  this.setBase(sp);
  this.setDotes(sp);
  this.setTrajectory(sp);
  this.setAirDefence(sp);
  // this.setArea(sp);

  return this;
}

/*=====  End of Canvas methods  ======*/

/*=====  End of Constructor MapIneraction and it's methods  ======*/


MapInteraction.prototype.baseBalloon = [];
MapInteraction.prototype.baseCoordinates = [];
MapInteraction.prototype.dotesCoordinates = [];
MapInteraction.prototype.defenceCoordinates = [];
MapInteraction.prototype.areaCoordinates = [];
MapInteraction.prototype.trajectoryCoordinates = [];
MapInteraction.prototype.distances = {};


/*=====  End of Map's methods and properties  ======*/


(function(){
  /*=============================
  =            §Base            =
  =============================*/

  var baseMap = new MapInteraction({
    map: '#dynamic-map',
    panel: '#control-additional',
    button: '#set-base',
    longitude: '.lon-base',
    latitude: '.lat-base',
  });

  baseMap.setBase();

  /*=====  End of §Base  ======*/


  /*================================
  =            §Targets            =
  ================================*/

  var targetsMap = new MapInteraction({
    map: '#dynamic-map',
    panel: '#control-additional',
    dotes: {
      longitude: get('.lon-dhla-1')[0],
      latitude: get('.lat-dhla-1')[0],
      amount: get('.dotes-amount')[0],
      button: get('#set-dotes')
    },
    trajectory: {
      pointA:{
        lontitude: get('.lon-thla-1-1')[0],
        latitude: get('.lat-thla-1-1')[0]
      },
      pointB:{
        lontitude: get('.lon-thla-1-2')[0],
        latitude: get('.lat-thla-1-2')[0]
      },
      amount: get('.trajectory-amount')[0],
      button: get('#set-trajectory')
    },
    area: {
      pointA: {
        longitude: get('.lon-ahla-1-1')[0],
        latitude: get('.lat-ahla-1-1')[0]
      },
      pointB: {
        longitude: get('.lon-ahla-1-2')[0],
        latitude: get('.lat-ahla-1-2')[0]
      },
      pointC: {
        longitude: get('.lon-ahla-1-3')[0],
        latitude: get('.lat-ahla-1-3')[0]
      },
      pointD: {
        longitude: get('.lon-ahla-1-4')[0],
        latitude: get('.lat-ahla-1-4')[0]
      },
      amount: get('.area-amount')[0],
      button: get('#set-area')
    },
  });

  targetsMap.setDotes();


/*======================================
=            Switcher logic            =
======================================*/

  var mapData = new MapInteraction({
      canvasMap: '#polygon',
      panel: '#control-additional',
      base: {
        coordinates: {
          x: 0,
          y: 0
        },
        radius: 3,
        button: get('#set-base'),
        values: {
          xV: get('.lon-base')[0],
          yV: get('.lat-base')[0]
        },
        headers: {
          xH: get('.lon-base-headers')[0],
          yH: get('.lat-base-headers')[0]
        }
      },
      dotes: {
        coordinates: [],
        values: {
          xV: get('.lon-dotes-hla')[0],
          yV: get('.lat-dotes-hla')[0]
        },
        headers: {
          xH: get('.lon-dotes-headers')[0],
          yH: get('.lat-dotes-headers')[0]
        },
        amount: get('.dotes-amount')[0],
        button: get('#set-dotes'),
        radius: 2
      },
      trajectory: {
        coordinates: [],
        values: {
          xV: get('.lon-trajectory-hla')[0],
          yV: get('.lat-trajectory-hla')[0]
        },
        headers: {
          xH: get('.lon-trajectory-headers')[0],
          yH: get('.lat-trajectory-headers')[0]
        },
        amount: get('.trajectory-amount')[0],
        button: get('#set-trajectory'),
        radius: 1.5
      },
      area: {
        coordinates:
        [
          [
            {
              x: 0,
              y: 0
            }, 
            {
              x: 0,
              y: 0
            },
            {
              x: 0,
              y: 0
            },
            {
              x: 0,
              y: 0
            }
          ]
        ],
        values: {
          xV: get('.lon-area-hla')[0],
          yV: get('.lat-area-hla')[0]
        },
        headers: {
          xH: get('.lon-area-headers')[0],
          yH: get('.lat-area-headers')[0]
        },
        amount: get('.area-amount')[0],
        button: get('#set-area'),
        radius: 1.2
      },
      airDefence: {
        coordinates: [],
        radius: 10,
        amount: get('.defence-amount')[0],
        button: get('#to-defence')
      }
  });

  var cv = mapData.canvas;

  /*=====  End of Switcher logic  ======*/


  var button = get('#switch')
    , flag = false;

  button.onclick = showCanvas;

  /*========================================
  =            Switch to canvas            =
  ========================================*/
  
  function showCanvas(){
    if (!flag) {
      var canvas = get('#polygon')
        , static = get('#static-map');

      sleep(canvas, static);
      css(canvas, {zIndex: 4});
      css(static, {zIndex: 3, background: 'rgba(255, 255, 255, .4)'})
      awake(canvas, static);

      this.value = 'Переключиться на карту';

      flag = true;
    }else {
      this.onclick = showMap;
      this.onclick();
    }

    /*=====================================
    =            Switch to map            =
    =====================================*/
    function showMap() {
      if (flag){
        var canvas = get('#polygon')
          , static = get('#static-map');

        sleep(canvas, static);
        css(canvas, {zIndex: 1});
        css(static, {zIndex: 0, background: 'rgba(255, 255, 255, 0)'})
        awake(canvas, static);

        this.value = 'Переключиться на холст';

        flag = false;
      }else {
        this.onclick = showCanvas;
        this.onclick();
      }
    }
    /*=====  End of Switch to map  ======*/

    /**
     *
     * Switch event handlers on buttons
     *
     */
    if (flag){

      cv.initialize(mapData);

    }else{

      mapData.replaceHeaders('Долгота', 'Широта');

      baseMap.setBase();
      targetsMap.setDotes();
    }
  }

  /*=====  End of Switch to canvas  ======*/
}());