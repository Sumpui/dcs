(function () {
  

  var Range = function (f, x, y) {

    this.temp = f;
    this.x = x;
    this.y = y;

  }

  function sum () {
    return this.x = this.y;
  }

  var obj = new Range(sum, 10, 15);

  console.log(obj.temp());

  var o = function () {return 0;}
  var k = o.prototype;
  var t = k.constructor;

  console.log(o, t, o === t);


}());