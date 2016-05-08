function get(e){if(!e)throw new TypeError;var t;return t="object"==typeof e?e:e.slice(0,1),"."===t?document.getElementsByClassName(e.slice(1,e.length)):"#"===t?document.getElementById(e.slice(1,e.length)):"object"==typeof t?e:void 0}function log(){console.log(arguments)}function css(e,t){if(!e&&!t)throw new TypeError;for(var o in t)e.style[o]=t[o];return e}function isArray(e){return!!(e&&e.length&&e.length>=0&&isFinite(e.length)&&e.length<=Math.pow(2,32))}Object.defineProperties(Object.prototype,{replaceText:{value:function(e){var t="There are no any text.";if(!e)throw new TypeError(t);if(t="It is not an object","string"!=typeof e)throw new TypeError(t);return this.removeChild(this.childNodes[0]),this.appendChild(document.createTextNode(e)),this},writable:!0,enumerable:!1,configurable:!0},getText:{value:function(){var e="Apply this method to object.";if("object"!=typeof this)throw new TypeError(e);return this.childNodes[0].nodeValue},writable:!0,enumerable:!1,configurable:!0}}),function(){var e=get("#container"),t=e.clientHeight;if(screen.availHeight){var o=(screen.availHeight-t)/6;css(e,{marginTop:o+"px"})}}(),function(){function e(e){if("object"!=typeof e)throw new TypeError("Incoming arguments is not an object");for(var t in e)"string"!=typeof e[t]?this[t]=e[t]:this[t]=get(e[t])}e.prototype.active=function(){function e(e,o,n){e.onclick=function(){for(var e=t.list.length,o=0;e-1>=o;o++)t.list[o].id="";this.id="active-algorythm"}}if(this.list){var t=this;this.list instanceof Array?this.list.forEach(e):Array.prototype.forEach.call(this.list,e)}},e.prototype.file=function(){var e=this;this.button.onchange=function(){var t=this.value;t=t.slice(t.lastIndexOf("\\")+1,t.length);var o=e.fileName[0];css(o,{opacity:0}),setTimeout(function(){o.replaceText(t),css(o,{opacity:1,border:"1px solid transparent"}),o.className=o.className+" chose"},e.transitions)}};var t=new e({section:"#loading-scripts",list:".ready-algorythm",button:"#choose-file",fileName:".file-name",transitions:300});t.active(),t.file()}(),function(){function e(e){if("object"!=typeof e)throw new TypeError("Incoming parameter is not an object");for(var t in e){var o=e[t];this[t]={};for(var n in o)"string"==typeof o[n]?this[t][n]=get(o[n])[0]:this[t][n]=o[n]}}e.prototype.defineSegments=function(e){var t=e.getBoundingClientRect();return e.segments={start:t.left,end:t.right,width:t.right-t.left},this},e.prototype.breaks=function(e){var t=e.segments;t.each=t.width/this.options.divisions,t.coords=new Array(this.options.divisions),t.coords[this.options.divisions]=t.end;for(var o=this.options.divisions-1;o>=0;o--)t.coords[o]=Math.round(t.coords[o+1]-t.each);return delete t.coords[t.coords.length-1],this},e.prototype.resize=function(){window.onresize=function(){t.defineSegments(t.dom.line),t.breaks(t.dom.line);var e=parseInt(t.dom.amount.getText());t.dom.tongle.style.left=t.dom.line.segments.coords[e-1]-t.dom.line.segments.start+"px"}},e.prototype.action=function(){var e=this;this.dom.tongle.onmousedown=function(t){function o(t){var o=e.dom.line.segments;e.dom.tongle.style.cursor="pointer",t.clientX>=o.start&&t.clientX<=o.end&&(e.dom.tongle.style.left=t.clientX-o.start-e.dom.tongle.offsetWidth/2+"px")}function n(t){var o=e.dom.tongle.segments;e.defineSegments(e.dom.tongle),e.breaks(e.dom.line),e.dom.line.segments.coords.forEach(function(t,n,i){o.start<=t&&o.start>=t-10&&e.dom.amount.replaceText((n+1).toString())})}o(t),document.onmousemove=function(e){o(e),n(e)},document.onmouseup=function(){document.onmousemove=null,e.dom.tongle.onmouseup=null},e.dom.tongle.ondragstart=function(){return!1}}},e.prototype.create=function(){this.defineSegments(this.dom.line),this.defineSegments(this.dom.tongle),this.breaks(this.dom.line),this.resize(),this.action()};var t=new e({dom:{slider:".planes-slider",line:".planes-toddler-line",tongle:".planes-toddle",amount:".planes-amount"},options:{divisions:20}});t.create();var o=new e({dom:{slider:".dotes-slider",line:".dotes-toddler-line",tongle:".dotes-toddle",amount:".dotes-amount"},options:{divisions:10}});o.create();var n=new e({dom:{slider:".area-slider",line:".area-toddler-line",tongle:".area-toddle",amount:".area-amount"},options:{divisions:10}});n.create();var i=new e({dom:{slider:".trajectory-slider",line:".trajectory-toddler-line",tongle:".trajectory-toddle",amount:".trajectory-amount"},options:{divisions:10}});i.create()}(),function(){function e(){t=new ymaps.Map("dynamic-map",{center:[55.76,37.64],zoom:10,controls:[]})}var t;ymaps.ready(e)}();