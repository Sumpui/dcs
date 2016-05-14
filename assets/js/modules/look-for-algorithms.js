(function(){

  var doc = get(document)
  , moment = Date.now()
  , momentLater;

  doc.addEventListener('DOMContentLoaded', function(){

    momentLater = Date.now();
    moment = ((momentLater - moment)/(1000*60));
    console.log(moment);

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

        if (this.responseText){

          /**
           *
           * Save server response and transform it to the object
           *
           */
          var answer = JSON.parse(this.responseText);

          /**
           *
           * Save incoming response in URI view
           *
           */
          var toURIView = encodeURIComponent(answer);

          if (toURIView !== getCookies().answer){

            deleteCookies();
            setCookies('answer', answer, 1);

          }

          var resultCookies = getCookies();

          log(resultCookies);

          // toHTMLView(,count(1)());

        }

      }
    }

    /**
     *
     * Send data to the server
     *
     */
    request.send(formData);

    return false;

  })

  console.log(getCookies());


}());