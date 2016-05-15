;(function(){
  var express = require('express')
    , multer = require('multer')
    , fs = require('fs')
    , multiparty = require('multiparty')
    , crypto = require('crypto')
    , bodyParser = require('body-parser')
    , storage = multer.diskStorage(
      {
       destination: function (req, file, cb) {
        cb(null, __dirname + '/public/js/algorithms')
      },
      filename: function (req, file, cb) {
        // console.log(file);
        crypto.pseudoRandomBytes(16, function (err, raw) {
          // console.log(mime.extension(file.mimetype));
          // raw.toString('hex') + Date.now() + '.' + file.originalname.slice(file.originalname.lastIndexOf('.') + 1)
          // .slice(0, file.originalname.indexOf('.')) + '-' + Date.now() + file.originalname.slice(file.originalname.lastIndexOf('.'))
          cb(null, file.originalname);
        })
      }
  })
  , upload = multer({storage: storage}).array('file', 5)
  , app = express()
  , server
  , port = 8080;

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.post("/upload", function(req, res, next){

    var files = [];

    upload(req, res, function(err) {
      if (req.files){
        for (var i = 0; i <= req.files.length - 1; i++){
          var file = req.files[i];
          for (var j in file){
            if (j === 'originalname'){
              files.push(file[j]);
            }
          }
        }
      }

      if (err) {
        return res.end('<p class="answer">0</p>');
      }

      res.status(200).json(files);
    });

    // var interval = setInterval(function(){
    //   if (files){
    //     console.log(files);
    //     clearInterval(interval);
    //   }
    // }, 10);

    // res.status(200).json(files);
  });

  app.post('/search', function(req, res, next){

    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files){

      if (fields.load){

        var path = __dirname + '/public/js/algorithms'
          , files;

        fs.readdir(path, function(err, items){
          items.forEach(function(x, i, a){
            if (!(x.slice(x.indexOf('.') + 1) === 'js')){
              if (i === 0){
                items.shift();
              }else if (i === a.length - 1){
                items.pop();
              }
            }
          });
          files = items;
        });

        var interval = setInterval(function(){
          if (files){
            clearInterval(interval);
            res.status(200).json(files);
          }
        }, 10);
        // res.json(items);

      }

      // for (var i in fields){
      //   var file = __dirname + '/public/js/algorythms/' + fields[i];

      //   try {
      //       fs.accessSync(file, fs.F_OK);
      //       paths += 1 + ' ';
      //   } catch (e) {
      //     paths += 0 + ' ';
      //   }
      // }
    });
  });


  app.use(express.static(__dirname + '/public'));

  server = app.listen(port, function(){
    console.log('Listening ' + port + ' port');
  })

}())