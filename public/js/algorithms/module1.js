Planes.prototype.move = function(){

  /**
   *
   * Saving context
   *
   */
  
  var self = this;

  var container = get('.actions');

  var map = new MapInteraction()
    , each = Array.prototype.forEach
    , step = 10 // in miliseconds
    , radius = 4
    , startAngle = 0
    , endAngle = Math.PI*2;

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
      droneWay(drone, [drone.base.x, drone.base.y], [drone.watch[0].coords.x, drone.watch[0].coords.y]);
    }

  });
}