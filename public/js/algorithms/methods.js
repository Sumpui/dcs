/**
 * Copy all properties from one object to another
 * @param  {object} o Object to copy
 * @param  {object} p Object whitch is need to be copied
 * @return {object}   new Object with all properties
 */
function extend (o, p) {
  for (var prop in p){
    o[prop] = p[prop];
  }
  return o;
}

/**
 * Copy properties from one object to another and miss some if they already exist in the second object
 * @param  {object} o Object to copy
 * @param  {object} p Object from copy
 * @return {object}   Object o with all properties
 */
function merge (o, p) {
  for (var prop in p){
    if (o.hasOwnProperty(prop)) continue;
      o[prop] = p[prop];
  }
  return o;
}

/**
 * Delete all not existing object properties in the second object 
 * @param  {object} o Delete all properties whitch don't exist in object p
 * @param  {object} p Watch all existing properties from this object
 * @return {object}   Object o with all existing properties in object p
 */
function restrict (o, p) {
  for (var prop in o) {
    if (!(prop in p)) delete o[prop];
  }
  return o;
}

/**
 * Delete all p object properties in o object properties
 * @param  {object} o Delete all properties from this object
 * @param  {object} p Looks these properties in this object
 * @return {object}   o object
 */
function subtract(o, p) {
  for (var prop in p){
    delete o[prop];
  }
  return o;
}

/**
 * Unites properties from both objects into one object and returns that one
 * @param  {object} o First object to unite
 * @param  {object} p Second object to unite
 * @return {object}   United objects
 */
function union (o, p) {
  return extend(extend({}, o), p);
}

/**
 * Gather identical objects properties to one objects
 * @param  {object} o First object
 * @param  {object} p Second object
 * @return {object}   New object with properties, which both (p and o) objects have
 */
function intersection (o, p) {
  return restrict(extend({}, o), p);
}

/**
 * Copy all property names to an array
 * @param  {object} o Object with properties
 * @return {object}   Array with properties names
 */
function keys (o) {
  if (typeof o !== 'object') throw new TypeError('Sir, we need more objects! Please replace incoming argument to an object');
  var result = [];
  for (var prop in o){
    if (o.hasOwnProperty(prop)){
      result.push(prop);
    }
  }
  return result;
}

/**
 * Define properties of numbers 
 * @param  {objects} props Amount of properties
 * @return {objects}       New object with generated properties
 */
function generate (props) {
  var o = {};
  for (var i = props; i >= 0; i--) {
    o[i.toString()] = Math.floor(Math.random()*props - (props - 10));
  }
  return o;
}

/**
 * Define new class with methods and properties (their values)
 * @param  {function} constructor The objects constructor 
 * @param  {function} methods     New methods added to the prototype of constructor 
 * @param  {object} statics     Object with properties whitch is need to be copied
 * @return {function}             New constructor with methods and properties
 */
function defineClass (constructor, methods, statics) {
  if (methods) extend(constructor.prototype, methods);
  if (statics) extend(constructor, statics);
  console.log(constructor);

  return constructor;
}

var Testing = defineClass(function (f, t) { this.f = f; this.t = t}, {
  includes: function () {
    if (this.x >= 0 && this.x <= 10){
      return true;
    }
  },
  even: function () {
    if (!(this.x % 2)){
      return true;
    }
  }
}, {x: 10, y: 15});

var obj = new Testing(4, 5);

console.log(obj.even());
