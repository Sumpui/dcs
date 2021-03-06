(function(){

  Planes.prototype.move = function(){

    /**
     *
     * Saving context
     *
     */
    
    var self = this;

    var container = get('.actions');

    var map = new MapInteraction()
      , now = new Date()
      , each = Array.prototype.forEach
      , step = 10 // in miliseconds
      , radius = 4
      , startAngle = 0
      , endAngle = Math.PI*2
      , assignmentTime = 0
      , done = count(1)
      , timePass = [now.valueOf()]
      , passedTime = 0;

    Planes.prototype.all.coordinates = [];

    self.all.forEach(function(drone, id, arr){

      drone.path = [];
      drone.completed = [];

      /**
       *
       * If drone will fly
       *
       */
      
      if (drone.watch.length){
        droneWay(drone, [drone.base.x, drone.base.y], [drone.watch[0].coords.x, drone.watch[0].coords.y], [assignmentTime, done, timePass, passedTime]);
      }

    });
  }

  /**
   * Define if dot has been achieved by drone
   * @param  {Object} d Drone is achieved
   * @return {undefined}   Doesn't return anything
   */
  function dotIsAchieved(d){
    var map = new MapInteraction();

    var dotes = get('#polygon').getContext('2d')
      , r = 2.5
      , c = d.colors.slice(0, d.colors.lastIndexOf(',') + 1) + '1)'
      , startAngle = 0
      , endAngle = Math.PI*2

    var dotX = d.watch[0].coords.x
      , dotY = d.watch[0].coords.y

    var nm = '  ' + d.watch[0].name;

    dotes.beginPath();
    dotes.font = '20px Tahoma';
    var nmWidth = dotes.measureText(nm).width;
    dotes.closePath();

    dotes.clearRect(dotX - r * 5, dotY - r * 6, (r * r * 2) + nmWidth, (r * r * r * r) - 5);
    // drawCircle(dotes, dotX, dotY, r + 3, startAngle, endAngle, 0, c, 2, nm);
    drawCircle(dotes, dotX, dotY, r + 6, startAngle, endAngle, c, 0, 2, nm);
  }

  /**
   * Drawing strokes
   * @param  {HTMLObject} p Canvas context
   * @param  {Array} s Canvas coordinates of start
   * @param  {Array} e Canvas coordinates of end
   * @param  {String} c Stroke color
   * @return {undefined}   Doesn't return anything
   */
  function drawStroke(p, s, e, c){
    p.beginPath();
    p.setLineDash([5, 2, 2, 2]);
    p.moveTo(s[0], s[1]);
    p.lineTo(e[0], e[1]);
    p.strokeStyle = c;
    p.stroke();
  }

  function droneWay(d, start, end, options) {

    /**
     *
     * Check incoming parameters on valid
     *
     */
    
    isCorrect(start, 'Array') && isCorrect(end, 'Array') && isCorrect(options, 'Array');

    var dWay = arguments;

    var polygon = get('#' + d.name + '-' + d.iAm).getContext('2d')
        , container = get('.actions')
        , map = new MapInteraction()
        , x1 = start[0]
        , y1 = start[1]
        , x2 = end[0] // Temporary decision
        , y2 = end[1]
        , distance = getDistance(start, end, 3) // Distance between two dotes
        , speed = ((d.specification.speed * 10)/map.kInP)/3600 // translate meters per hours into pixels per seconds
        , color = d.colors
        , circle = color.slice(0, color.lastIndexOf(',') + 1) + '1)'
        , simulate = distance/speed
        , angle = Math.atan2((y2 - y1),(x2 - x1))
        , codedX = []
        , codedY = []
        , radius = 4
        , startAngle = 0
        , endAngle = Math.PI*2
        , step = 10;


    var simulating = setInterval(function(){

      polygon.clearRect(0, 0, container[0].width, container[0].height);

      x1 += speed * Math.cos(angle);
      y1 += speed * Math.sin(angle);

      drawCircle(polygon, x1, y1, radius, startAngle, endAngle, 0, circle, 2);
      drawStroke(polygon, start, [x1, y1], color);

      if (d.completed.length){
        d.completed.forEach(function(cmp, ind, c){
          if (ind === 0){
            drawStroke(polygon, [d.base.x, d.base.y], [cmp.coords.x, cmp.coords.y], color);
          }else{
            drawStroke(polygon, [c[ind - 1].coords.x, c[ind - 1].coords.y], [c[ind].coords.x, c[ind].coords.y], color);
          }
        });
      }

      codedX.push(btoa(x1));
      codedY.push(btoa(y1));

      options[0]++;
      simulate--;

      if (simulate <= 0){

        d.path.push([codedX, codedY]);

        dotIsAchieved(d);

        /**
         *
         * Search current drone
         *
         */
        

        d.completed.push(d.watch[0]);

        /**
         *
         * Run for all arrays (dotes, trajectories, areas) and call notWatched() function
         *
         */
        
        for (var k in map.distances){
          if (map.distances.hasOwnProperty(k)) notWatched(map.distances[k], d.watch[0]);
        }

        clearInterval(simulating);

        var completed = d.completed;

        /**
         *
         * If drone doesn't come to end
         *
         */
        
        if (start[0] !== end[0]){
          dWay.callee(d, [completed[completed.length - 1].coords.x, completed[completed.length - 1].coords.y], [d.watch[0].coords.x, d.watch[0].coords.y], [options[0], options[1], options[2], options[3]]);
        }else{

          /**
           *
           * Counting executed tasks by drones
           *
           */
          
          var cmp = options[1]()
            , date = new Date()
            , pls = get('.planes-amount')[0]
            , activeDrones = new Planes()
            , currentAmount = 0
            , hours = date.getHours()
            , minutes = date.getMinutes()
            , seconds = date.getSeconds()
            , countedDate = (date.valueOf()-options[2][0])/1000;

          /**
           *
           * Searching active drones at the polygon
           *
           */
          
          activeDrones.all.forEach(function(x, i, a){
            if (x.completed.length){
              currentAmount++;
            }
          });

          /**
           *
           * Each drone executing time
           *
           */
          
          options[2].push((date.valueOf()-options[2][0])/1000);

          activeDrones.time.eachDrone[d.name + '-' + d.iAm] = (date.valueOf()-options[2][0])/1000;

          /**
           *
           * The whole executing time
           *
           */
          
          options[3] += (date.valueOf()-options[2][0])/1000;

          humane.log('[' + hours + ':' + minutes + ':' + seconds + '] \t' + d.name + '-' + d.iAm + '. Выполнил задание за ' + countedDate, { timeout: 2000, clickToClose: true, addnCls: 'humane-error'});
          console.log('' + hours + ':' + minutes + ':' + seconds, '' + d.name + '-' + d.iAm + ' has completed task for ' + countedDate);


          if (cmp === currentAmount) {
            /**
             *
             * Logging the results
             *
             */
            
            humane.log('Моделирование завершено за ' + options[3] + ' минуты');
            console.log('Simulating has been completed.');
            console.log(activeDrones.all);
            activeDrones.time.taskRun = options[3];
          }

        }

      }

    }, step);
  }

  function notWatched(dotes, drone){

    isCorrect(dotes, 'Array');

    var toWatch = [];

    for (var i in dotes){

      if (dotes.hasOwnProperty(i)){
        var dot = dotes[i];

        if (!dot.watched){
          toWatch.push(dot);
        }

      }
    }

    setDroneWay(toWatch, drone);
  }


  function setDroneWay(watch, dr){

    isCorrect(watch, 'Array');

    isCorrect(dr, 'Object');

    var map = new MapInteraction()
      , each = Array.prototype.forEach
      , droneCanWatch = dr.to
      , min = Infinity
      , rightDot = {}
      , drs = new Planes()
      , dotty = 0
      , doneIsDone = false;

    if (!watch.length){

      dotty = {
        coords: {
          x: drs.all[0].base.x,
          y: drs.all[0].base.y
        },
        distances: dr.kilometers || 0,
        name: 'Done!'
      };

      transferDot(drs.all, dr, dotty);

    }else{

      for (var j in droneCanWatch){
        if (droneCanWatch.hasOwnProperty(j)){
          var dot = droneCanWatch[j];
          watch.forEach(function(w, t, a){
            if (dot.name === w.name){
              if (dot.pixels <= min){
                min = dot.pixels;
                rightDot = dot;
              }
            }
          });
        }
      }

      for (var k in map.distances){
        if (map.distances.hasOwnProperty(k)){
          var type = map.distances[k];
          for (var t in type){
            if (type.hasOwnProperty(t)){
              var mapDot = type[t];
              if (mapDot.name === rightDot.name){
                mapDot.watched = true;
                dotty = mapDot;
              }
            }
          }
        }
      }

      transferDot(drs.all, dr, dotty, rightDot);

    }

    function transferDot(ad, curDrone, dot){

      for (var m in ad){
        if (classOf(ad[m]) === 'Object'){
          var tempDrone = ad[m];

          if (tempDrone.watch[0] && (tempDrone.watch[0].name === curDrone.name)){

            var leftDistance = 0;

            if (arguments.length === 4){
              leftDistance = dot.kilometers + arguments[arguments.length - 1].kilometers;
            }else{
              leftDistance = dot.distances;
            }
            if (tempDrone.leftRange/2 >= leftDistance){
              tempDrone.watch[0] = dot;
              if (arguments.length === 4){
                tempDrone.leftRange -= arguments[arguments.length - 1].kilometers;
              }else{
                tempDrone.leftRange -= arguments[arguments.length - 1].distances;
              }
            }else{
              tempDrone.watch[0] = {
                coords: {
                  x: tempDrone.base.x,
                  y: tempDrone.base.y
                },
                distances: dot.kilometers || 0,
                name: 'Done!'
              }
              dotty.watched = null;
            }
          }else{
            continue;
          }
        }else{
          continue;
        }
      }
    }
  }
}());