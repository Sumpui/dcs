(function(){

  var doc = get(document)
  , moment = Date.now()
  , momentLater;

  doc.addEventListener('DOMContentLoaded', function(){

    momentLater = Date.now();
    moment = ((momentLater - moment)/(1000*60));
    // console.log(moment);

    var request = xhr()
    , formData = new FormData()
    , algorithms = get('.ready-algorithm')
    , each = Array.prototype.forEach
    , names = [];

    formData.append('load', 'true');

    request.open('POST', '/search', true)

    /**
     *
     * Get answer from the server
     *
     */
    request.onload = function(e) {
      if (this.readyState === 4 && this.status === 200 ){
        addFiles(this);
      }
    }

    /**
     *
     * Send data to the server
     *
     */
    request.send(formData);

    return false;

  });

}());