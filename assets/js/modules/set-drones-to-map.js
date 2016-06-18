;
function Planes(){
  return this;
}

(function(){

  Planes.prototype.atBase = function() {
    isCorrect(this, 'Object');
    /**
     *
     * Create new sample of MapInteraction class to get base coordinates
     *
     */
    
    var map = new MapInteraction();

    /**
     *
     * Set base coordinates to all objects
     *
     */
    
    for (var i = 0; i <= this.all.length - 1; i++){
      this.all[i].base = map.baseCoordinates;
    }
  }

  Planes.prototype.toCanvas = function() {
    isCorrect(this, 'Object');

    var map = new MapInteraction();

    var polygon = get('#polygon').getContext('2d')
      , x0, y0, r = map.baseRadius
      , d = r * 2 * 2
      , startAngle = 0
      , endAngle = Math.PI*2
      , color = 'rgba(30,199,115, 1)'
      , drone = this.all[0]
      , allDrones = this.all;

    /**
     *
     * Base is exist
     *
     */
    
    if (drone.base.x){
      polygon.clearRect(drone.base.x - (d + r), drone.base.y - (d + r), d*2.5, d*2.5);
    }

    /**
     *
     * Draw based drones
     *
     */
    
    drawCircle(polygon, drone.base.x, drone.base.y, r, startAngle, endAngle, 0, color, 2);
    drawCircle(polygon, drone.base.x, drone.base.y, r + 6, startAngle, endAngle, color, 0, 2);
    drawText(polygon, 'white', '9px serif', allDrones.length.toString(), [allDrones[0].base.x, allDrones[0].base.y]);


    var planesPolygon = get('.actions')
      , each = Array.prototype.forEach;

    if (planesPolygon.length){
      each.call(planesPolygon, function(action, ind, arr){
        css(action, {zIndex: (ind + 5)});
      });
    }

    var pol = get('#polygon');
    css(pol, {zIndex: 26});
  }

  Planes.prototype.time = {
    taskRun: 0,
    eachDrone: {}
  }

  Planes.prototype.dronesCanvases = function(){

    /**
     *
     * Saving context;
     *
     */
    
    var self = this;

    var controlPanel = get('#controls')
      , parent = controlPanel.parentNode;

    self.all.forEach(function(drone, ind, arr){
      var canvas = document.createElement('canvas');
      canvas.height = 600;
      canvas.width = 1300;

      canvas.className = 'actions';
      canvas.id = drone.name + '-' + drone.iAm;

      parent.insertBefore(canvas, controlPanel);

    });
  }

  /**
   *
   * Necessary to define
   *
   */
  
  Planes.prototype.flyToTarget = function() {
    /**
     *
     * Drones specifications and targets distance from base
     *
     */
    
    var self = this
      , map = new MapInteraction()
      , distances = map.distances
      , each = Array.prototype.forEach
      , sort = Array.prototype.sort
      , drones = self.all;


    each.call(drones, function(y, j, b){
      y.watch = [];
    });

    if (classOf(distances) === 'Object'){
      for (var i in distances){
        var aDistance = distances[i];
        if (classOf(aDistance) === 'Array' && typeof aDistance !== 'function'){

          /**
           *
           * Look for distances to dotes in
           *
           */
          
          if (i === 'toDotes'){
            sort.call(aDistance, function(a, b){
              if (a.kilometers < b.kilometers){
                return 1;
              }else if (a.kilometers > b.kilometers){
                return -1;
              }else{
                return 0;
              }
            });

            /**
             *
             * Cycle for dotes
             *
             */
            
            for (var j in aDistance){
              /**
               *
               * Skip all object methods and leave only dotes
               *
               */
              
              if (typeof aDistance[j] !== 'function'){

                var dot = aDistance[j];

                /**
                 *
                 * Cycle for drones
                 *
                 */

                each.call(drones, function(x, i, a){
                  targetsToDrones(x, dot);
                });
              }
            }
          }
        }
      }

      var simulate = get('#simulate');

      simulate.onclick = function(){
        if ('move' in self){
          console.log('Starting simulation!');
          self.move();
          this.onclick = null;
        }else{
          alert('Вы не загрузили или не активировали алгоритм движения!');
        }
      }
    }
  }

  function targetsToDrones(dr, tg){
    /**
     *
     * Specification of each 
     *
     */
    
    var sps = dr.specification
      , range = sps.range/2;

    /**
     *
     * If hasn't got dote to watch and the dote haven't been watched
     *
     */
    
    if (!dr.watch.length && !tg.watched) {
      /**
       *
       * Range is rather more than dot distance
       *
       */
      
      if (range >= tg.kilometers) {
        dr.leftRange = sps.range - tg.kilometers;
        dr.watch.push(tg);
        tg.watched = true;
      }else{
        dr.leftRange = sps.range;
        dr.watch = [];
        tg.watched = null;
      }
    }
  }


  Planes.prototype.initialize = function(){
    /**
     *
     * Saving context
     *
     */
    
    var self = this
      , map = new MapInteraction();

    self.atBase();
    self.dronesCanvases();
    self.toCanvas();
    self.flyToTarget();

  }


}());


