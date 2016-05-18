(function (){

  function MapInteraction(elements){

    if (typeof elements !== 'object') throw new TypeError('Incoming arguments is not an object');

    for (var i in elements) {
      if (typeof elements[i] !== 'string'){
        this[i] = elements[i];
      }else{
        this[i] = get(elements[i]);
      }
    }

  }

  MapInteraction.prototype.baseBalloon = [];
  MapInteraction.prototype.baseCoordinates = [];
  MapInteraction.prototype.dotesCoordinates = [];
  MapInteraction.prototype.areaCoordinates = [];
  MapInteraction.prototype.trajectoryCoordinates = [];

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

  MapInteraction.prototype.setDotes = function() {

    var self = this
      , oldDotesAmount = parseInt(self.dotes.amount.innerText);

    var counter = count(1);


    self.dotes.button.onclick = function() {

      var snowball = get('.snow')
        , dotesAmount = self.dotes.amount.innerText
        , ending = '';

      dotesAmount > 1 ? ending = ' точечных целей!': ending = ' точечную цель!';

      console.log(typeof dotesAmount);

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
          console.log(self.dotesCoordinates.length + 1, parseInt(self.dotes.amount.innerText));
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



        /**
         *
         * Round values to the 3d value
         *
         */
        // lon[0].replaceText(coords[0].toPrecision(6));
        // lat[0].replaceText(coords[1].toPrecision(6));

        /**
         *
         * Set up new class if it wasn't set up earlier
         *
         */
        // if ((lat[0].className.indexOf('not-choosen')) && lon[0].className.indexOf('not-choosen')) {
        //   lon[0].className = lon[0].cutClassTo('not-choosen') + 'choosen-base';
        //   lat[0].className = lat[0].cutClassTo('not-choosen') + 'choosen-base';
        // }

        // if (self.dotes.balloons.length === parseInt(dotesAmount))


      }

    }

  }

  /*=============================
  =            §Base            =
  =============================*/

  var base = new MapInteraction({
    map: '.ymaps-map',
    panel: '#control-additional',
    button: '#set-base',
    longitude: '.lon-base',
    latitude: '.lat-base',
  });

  base.setBase();

  /*=====  End of §Base  ======*/


  /*===============================
  =            §Targets            =
  ===============================*/

  var targets = new MapInteraction({
    map: '.ymaps-map',
    panel: '#control-additional',
    dotes: {
      longitude: get('.lon-dhla-1')[0],
      latitude: get('.lat-dhla-1')[0],
      amount: get('.dotes-amount')[0],
      button: get('#set-dotes-coords')
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
      button: get('#set-trajectory-coords')
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
      button: get('#set-area-coords')
    },
  });

  targets.setDotes();

  console.log(targets);

  /*=====  End of §Targets  ======*/


}());