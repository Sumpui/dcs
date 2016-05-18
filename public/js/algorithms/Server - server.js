(function(){

  /**
   * Include http and url modules
   * @type {string}
   */
  var http = require('http');
  var url = require('url');
  var fs = require('fs');

  /**
   * Create new server
   * @type {null}
   */
  new http.Server(function(req, res){

    console.log(req.url);

  }).listen(8080);

  /**
   * Listen on 8080 port and ip
   */
  // server.on('request',function(req, res){

  //   // console.log(req);

  //   // var urlParsed = url.parse(req.url, true);

  //   // if ( urlParsed.pathname === '/echo' && urlParsed.query ){
  //   //   res.end(urlParsed.query.message);
  //   // }else {
  //   //   res.statusCode = 404;
  //   //   res.end('Page not found');
  //   // }
  //   // console.log(urlParsed);

  // });

}());