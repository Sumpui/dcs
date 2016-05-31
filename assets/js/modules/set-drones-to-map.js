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
    drawText(polygon, 'white', '9px serif', allDrones);
    drawCircle(polygon, drone.base.x, drone.base.y, r + 6, startAngle, endAngle, color, 0, 2);
  }

  Planes.prototype.computeDistance = function(kind) {
    var self = this;

    var int = setInterval(function(){
      if (self.all){
        var result = [];

        if(kind === 'dotes') result.push({distanceToDotes: computeDistanceToDotes()});
        if(kind === 'trajectory') result.push({distanceToTrajectories: computeDistanceToTrajectories()});
        if(kind === 'area') result.push({distanceToAreas: computeDistanceToAreas()});

        clearInterval(int);
      }
    });
  }


  function computeDistanceToDotes(){
    var mapCanvas = new MapInteraction()
      , dotes = mapCanvas.dotesCoordinates
      , base = mapCanvas.baseCoordinates
      , result = [];

    if (isCorrect(dotes, 'Array')) dotes.forEach(function(element, ind, arr){
      var dotX = element.x
        , dotY = element.y
        , baseX = base.x
        , baseY = base.y
        , distance = {};

        distance.x = dotX - baseX;
        distance.y = dotY - baseY;

        distance.result = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

        result.push(distance.result);
    });

    return result;

  }

  function computeDistanceToTrajectories(){
    var mapCanvas = new MapInteraction()
      , trajectory = mapCanvas.trajectoryCoordinates
      , base = mapCanvas.baseCoordinates
      , result = [];

    if (isCorrect(trajectory, 'Array')) trajectory.forEach(function(element, ind, arr){

      result.push([]);

      element.forEach(function(oneDot, j, b){
        var dotX = oneDot.x
          , dotY = oneDot.y
          , baseX = base.x
          , baseY = base.y
          , distance = {}
          , previous = result[ind][j - 1];

        distance.x = dotX - baseX;
        distance.y = dotY - baseY;

        distance.result = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

        if (previous){
          if (distance.result <= previous){
            MapInteraction.prototype.trajectoryCoordinates[ind][j].entry = true;
          }else {
            MapInteraction.prototype.trajectoryCoordinates[ind][j - 1].entry = true;
          }
        }
        result[ind].push(distance.result);
      });

    });

    return result;

  }


  var drones = new Planes();

  var int = setInterval(function(){
    if (drones.all){

      drones.atBase();
      drones.toCanvas();

      clearInterval(int)
    }
  }, 10);

}());