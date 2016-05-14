
;(function(){


  var form = get('#upload-form');

  form.addEventListener('submit', function(e){

    e.preventDefault();

    var xhr = new XMLHttpRequest();

    var fd = new FormData(this);

    xhr.open('POST', '/upload');

    xhr.onreadystatechange = function(){
      if (this.readyState === 4 && this.status === 200){
        alert(1);
      }
    }

    xhr.send(fd);

  });

  var input = get('#upload-file');

  input.onchange = function() {
    form.submit();
  }
}());