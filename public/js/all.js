function get(e){if(!e)throw new TypeError;var t;return t="object"==typeof e?e:e.slice(0,1),"."===t?document.getElementsByClassName(e.slice(1,e.length)):"#"===t?document.getElementById(e.slice(1,e.length)):"object"==typeof t?e:void 0}function log(){console.log(arguments)}function css(e,t){if(!e&&!t)throw new TypeError;for(var n in t)e.style[n]=t[n];return e}function isArray(e){return!!(e&&e.length&&e.length>=0&&isFinite(e.length)&&e.length<=Math.pow(2,32))}function parentOf(){var e=Array.prototype.forEach,t=this;return e.call(arguments,function(e){t.appendChild(e)}),t}function cutClassTo(e){isCorrect(e,"String");try{isCorrect(this,"HTMLElement")}catch(t){try{isCorrect(this,"HTMLTableCellElement")}catch(n){try{isCorrect(this,"HTMLTableRowElement")}catch(o){try{isCorrect(this,"HTMLInputElement")}catch(a){console.log("Incoming parameter doesn't belong to HTMLElement, HTMLInputElement, HTMLTableRowElement, HTMLTableCellElement")}}}}return arguments[1]?this.className.slice(0,this.className.lastIndexOf(e)):this.className.slice(0,this.className.indexOf(e))}function typeAndValue(e){if(null==e)return"";switch(e.constructor){case Number:return"Number: "+e;case String:return"String: '"+e+"'";case Date:return"Date: "+e;case Boolean:return"Boolean: "+e;case RegExp:return"RegExp: "+e;case List:return"List: "+e}}function type(e){var t,n,o;return null===e?"null":e!==e?"nan":"object"!=(n=typeof e)?n:"Object"!==(t=classOf(e))?t:(o=e.constructor.getName())?o:"Object"}function classOf(e){return Object.prototype.toString.call(e).slice(8,-1)}function quacks(e){for(var t=1;t<=arguments.length-1;t++){var n=arguments[t];switch(typeof n){case"string":if("function"!==e[n])return!1;continue;case"function":n=n.prototype;case"object":for(var o in n)if("function"==typeof n[o]&&"function"!=typeof e[o])return!1}}return!0}function xhr(){if(void 0!==window.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){throw new Error("XMLHttpRequest doesn't support")}}}function isString(e){if("string"!=typeof e)throw new TypeError("Incoming parameter is not an object. It is "+typeof e)}function parseToArr(e){isString(e);var t=[];for(i=0;i<e.length-1;i++)" "!==e[i]&&"number"==typeof parseInt(e[i])&&t.push(!!parseInt(e[i]));return t}function getArr(e){isString(e);for(var t=[],n=0,o=1;o>0;)o=e.indexOf(",",o),o+=1,0!==o?t.push(e.slice(n,o-1)):t.push(e.slice(n,e.length)),n=o;return t}function parseLogic(e){if(!e)throw new TypeError("Incoming parameter is not an object. It is "+typeof e);for(var t,n,o={},a=0;a<e.length;a++){var r=e[a];t=r.slice(0,r.indexOf("-")-1),n=r.slice(r.indexOf("-")+2),o[a]={},o[a].name=t,o[a].value=n}return o}function count(e){return void 0==e?e=0:e,function(){return e++}}function setCookies(e,t,n){var o=e+"="+encodeURIComponent(t);"number"==typeof n&&(o+="; max-age="+60*n*60*24),document.cookie=o}function getCookies(){var e={},t=document.cookie;if(""===t)return e;for(var n=t.split("; "),o=0;o<=n.length-1;o++){var a=n[o],r=a.indexOf("="),s=a.slice(0,r),i=a.slice(r+1);i=decodeURIComponent(i),e[s]=i}return e}function deleteCookies(e){document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT"}function toHTMLView(e){if("object"!=typeof e&&"Array"!==classOf(e))throw new TypeError("Incoming parameter doesn't have 'object' type");var t=get(".ready-algorithm")[0],n=(t.getChildren().getChildren(),e.map(function(e,n,o){var a=t.cloneNode(!0),r=a.getChildren().getChildren();a.removeAttribute("hidden"),a.id="",a.className=a.className.slice(0,a.className.lastIndexOf("-")+1)+counter(),r[0]&&r[0].replaceText(e);var s=["all.js","yandex"];return r[0]&&"Вы ещё не загрузили ни один алгоритм"!==r[0].innerText&&(a.onclick=function(){var e=get("#active-algorithm");e&&(e.id=""),this.id="active-algorithm";for(var t=document.getElementsByTagName("script"),n=0;n<=t.length-1;n++){var o=t[n].src.indexOf(s[0])+1||t[n].src.indexOf(s[1])+1;o||t[n].remove()}var a=document.createElement("script"),i=r[0].innerText,c="js/algorithms/";a.src=c+i,document.body.appendChild(a)}),a})),o=get(".algorithms")[0];n.forEach(function(e,t,n){o.appendChild(e)})}function sleep(e,t,n){t||n||setTimeout(function(){css(e,css({opacity:0}))},300),setTimeout(function(){css(e,t)},n)}function awake(e,t,n){t||n||setTimeout(function(){css(e,css({opacity:1}))},300),setTimeout(function(){css(e,t)},n)}function isCorrect(e,t){if(classOf(e)!==t)throw new TypeError("Incoming parameter does not belong to '"+t+"' class!");return!0}function replaceInSleep(e,t,n){return isCorrect(t,"String"),setTimeout(function(){e.value?e.value=t:e.replaceText(t)},n),!0}function addFiles(e){if("XMLHttpRequest"!==classOf(e))throw new TypeError("Incoming parameter is not an 'XMLHttpRequest' object!");try{if(e.responseText){var t=JSON.parse(e.responseText);t.length||t.push("Вы ещё не загрузили ни один алгоритм");var n=encodeURIComponent(t);n!==getCookies().answer&&(deleteCookies(),setCookies("answer",t,1));var o=getCookies(),a=getArr(o.answer);if(arguments[1]){var r=arguments[1];for(var s in r)"exists"===r[s]&&delete a[s]}toHTMLView(a)}}catch(i){console.log(i)}}function removeNotExisting(e){if("XMLHttpRequest"!==classOf(e))throw new TypeError("Incoming parameter is not an 'XMLHttpRequest' object!");try{if(e.responseText){var t=get(".ready-algorithm"),n=get("#upload-file"),o=Array.prototype.forEach,a=[],r=[],s=count(1),i=JSON.parse(e.responseText);o.call(t,function(e,t,n){a.push(get(".algorithm-"+s()));var o=a[t];for(var i in o)if(o.hasOwnProperty(i)){if("length"!==i)var c=o[i].getChildren().getChildren();for(var l in c)c.hasOwnProperty(l)&&r.push(c[l])}}),o.call(n.files,function(e,t,n){var o=e.name;for(var a in r)if(r[a].innerText===o)for(var s in i)i[s]===o&&(i[s]="exists");else"Вы ещё не загрузили ни один алгоритм"===r[a].innerText&&(r[a].parentNode.parentNode.remove(),counter=count(1))})}}catch(c){console.log(c)}return i}function check(e,t,n){e.onclick=function(){var e=(self.list.length,get("#active-algorithm"));e.id="",this.id="active-algorithm"}}function iHide(e,t){if("string"!=typeof t)throw new TypeError("Incoming arguments is not a string");if("object"!=typeof e)throw new TypeError("Incoming arguments is not an object");var n=document.createElement("div"),o=document.createElement("div"),a=document.createElement("input"),r=document.createElement("p");return n.className="snow-wrapper",o.className="snow",a.className=o.className+"-close-it",r.className="snow-paragraph span-10 offset-5",a.type="button",a.value="Отменить",a.onclick=function(){removeBody(".snow-wrapper")},css(n,{position:"absolute",height:"100%",width:"100%",top:0,left:0,borderTop:"3px solid #90ee90"}),css(o,{position:"absolute",top:0,left:0,height:"100%",width:"100%",background:"white",opacity:"0.7","-webkit-filter":"blur(10px)"}),a.appendChild(document.createTextNode("закрыть")),t=document.createTextNode(t),e.parentOf(n.parentOf(o,a,r.parentOf(t))),1}function removeBody(e){var t=get(e);t.length&&(css(t[0],{opacity:0}),setTimeout(function(){t[0].remove()},300))}function drawCircle(e,t,n,o,a,r,s,i,c,l){e.beginPath(),e.arc(t,n,o,a,r),e.lineWidth=c,s&&i?(e.fillStyle=i,e.strokeStyle=s,e.stroke(),e.fill()):s?(e.strokeStyle=s,e.stroke()):i&&(e.fillStyle=i,e.fill()),l&&(e.font="18px Tahoma",e.fillStyle=i||s,e.textAlign="left",e.fillText(l,t,n))}function drawText(e,t,n,o){e.beginPath(),e.fillStyle=t,e.font=n;var a=e.measureText(o.length).width,r=e.measureText("w").width;e.fillText(o.length,o[0].base.x-a/2,o[0].base.y+r/2)}function random(e,t){return Math.abs(Math.floor(Math.random()*t-e))}function even(e){return e%2===0}function getDronesData(){var e=[get(".hard-drone-amount"),get(".middle-drone-amount"),get(".light-drone-amount")],t=[],n=Array.prototype.forEach;return n.call(e,function(e,o,a){n.call(e,function(e,n,o){if(e.value){var a=e.parentNode,r="";a=a.getChildren();for(var s in a)if("function"!=typeof a[s]&&a.hasOwnProperty(s)){var i=a[s];i.className.indexOf("drone-name")+1&&(r=i.innerText)}var c=e.cutClassTo("-",!0);c=c.slice(c.indexOf("2")+2);var l=e.parentNode.parentNode,d={},p=l.getChildren().getChildren().getChildren(),u=[];for(var h in p)"function"!=typeof p[h]&&p.hasOwnProperty(h)&&"article"===p[h].localName&&u.push(p[h]);var f=u.getChildren().findByClass("chars-values");u.forEach(function(e,t,n){var o=e.className;o=o.slice(o.lastIndexOf(" ")+1,o.lastIndexOf("-")),d[o]=parseInt(f[t].innerText)});for(var g=parseInt(e.value),m=[],v=0;g-1>=v;v++)m.push(colorIs(30,200));t.push({name:r,type:c,amount:g,specification:d,colors:m})}})}),t}function numberMask(e){e.value=e.value.replace(/[^\d]/g,"")}function colorIs(e,t){var n=Math.abs(Math.floor(Math.random()*t-e)),o=Math.abs(Math.floor(Math.random()*t-e)),a=Math.abs(Math.floor(Math.random()*t-e)),r=.6;return"rgba("+n+", "+o+", "+a+", "+r+")"}function toPage(e){isCorrect(e,"Array");var t=count(1),n=t(),o={"hard-drone":"Тяжелый БПЛА","middle-drone":"Средний БПЛА","light-drone":"Лёгкий БПЛА"},a=(Array.prototype.forEach,document.createElement("section")),r=document.createElement("input"),s=document.createElement("section"),i=document.createElement("header"),c=document.createElement("h1"),l=document.createTextNode("Беспилотники на месте базирования!"),d=get("#planes-section");d.parentNode;a.id="drones-colors",a.className="span-18 offset-1",s.id="drones-subsection-colors",s.className="span-20",r.type="button",r.id="close-"+a.id,r.className="span-10 offset-5",i.className="span-20 color-header",a.parentOf(i.parentOf(c.parentOf(l)));for(var p=0;p<=e.length-1;p++)for(var u=e[p],h=0;h<=u.amount-1;h++){var f=document.createElement("article"),g=document.createElement("header"),m=document.createElement("h2"),v=document.createElement("h5"),y=document.createElement("div"),b=document.createTextNode(u.name),w=get("#control-additional");for(var x in o)if(x===u.type)var T=document.createTextNode(o[x]);f.className="drones-information drone-info-"+n,g.className="drone-info-headers",y.className="drone-trace trace-"+n,css(f,{width:"13.5%","float":"left",marginTop:"2%"}),css(y,{backgroundColor:u.colors[h],height:"6px",width:"18px",margin:"0 auto"}),s.parentOf(f.parentOf(y,g.parentOf(v.parentOf(T),m.parentOf(b)))),n=t(),w.insertBefore(a.parentOf(s),d)}}function parseDrones(e){isCorrect(e,"Array");for(var t=[],n=0;n<=e.length-1;n++)for(var o=e[n],a=0;a<=o.amount-1;a++){var r={};for(var s in o)"amount"!==s&&("colors"===s?r[s]=o[s][a]:r[s]=o[s]);t.push(r)}return t}function MapInteraction(e){if(void 0===e&&(e={}),"object"!=typeof e)throw new TypeError("Incoming arguments is not an object");for(var t in e)"string"!=typeof e[t]?this[t]=e[t]:this[t]=get(e[t])}function Planes(){return this}function init(){myMap=new ymaps.Map("dynamic-map",{center:[55.76,37.64],zoom:5,controls:["rulerControl","zoomControl"]}),myCollection=new ymaps.GeoObjectCollection({},{preset:"twirl#redIcon",draggable:!1}),dotesTargets=new ymaps.GeoObjectCollection({},{preset:"twirl#redIcon",draggable:!1})}Planes.prototype.computeDistance=function(){var e=new MapInteraction;console.log(e())},Object.defineProperties(Object.prototype,{replaceText:{value:function(e,t){var n="There are no any text.";if(!e)throw new TypeError(n);if(n="It is not a string","string"!=typeof e)throw new TypeError(n);return this.removeChild(this.childNodes[0]),this.appendChild(document.createTextNode(e)),this},writable:!0,enumerable:!1,configurable:!0},getText:{value:function(){var e="Apply this method to object.";if("object"!=typeof this)throw new TypeError(e);return this.childNodes[0].nodeValue},writable:!0,enumerable:!1,configurable:!0}}),HTMLElement.prototype.getChildren=function(){var e,t=[];if("Array"===classOf(this))this.forEach(function(n,o,a){if(n.children&&n.children.length){e=n.children;for(var o in e)e.hasOwnProperty(o)&&t.push(e[o])}});else if("HTMLElement"===classOf(this)){if(this.children.length){e=this.children;for(var n in e)e.hasOwnProperty(n)&&t.push(e[n])}}else if("HTMLTableRowElement"===classOf(this)){if(this.children.length){e=this.children;for(var n in e)e.hasOwnProperty(n)&&t.push(e[n])}}else if("HTMLTableSectionElement"===classOf(this)&&this.children.length){e=this.children;for(var n in e)e.hasOwnProperty(n)&&t.push(e[n])}return t},Array.prototype.getChildren=HTMLElement.prototype.getChildren,HTMLElement.prototype.parentOf=parentOf,HTMLElement.prototype.cutClassTo=cutClassTo,Function.prototype.getName=function(){return"name"in this?this.name:this.name=this.toString().match(/function\s*([^(]*)\(/)[1]},function(){var e=get("#container"),t=e.clientHeight;if(screen.availHeight){var n=(screen.availHeight-t)/6;css(e,{marginTop:n+"px"})}}();var counter=count(1);Array.prototype.findByClass=function(e){isCorrect(this,"Array")&&isCorrect(e,"String");var t=[];for(var n in this)"function"!=typeof this[n]&&this.hasOwnProperty(n)&&this[n].className.indexOf(e)+1&&t.push(this[n]);return t},function(){function e(e){if("object"!=typeof e)throw new TypeError("Incoming arguments is not an object");for(var t in e)"string"!=typeof e[t]?this[t]=e[t]:this[t]=get(e[t])}e.prototype.active=function(){if(this.list){this.list instanceof Array?this.list.forEach(check):Array.prototype.forEach.call(this.list,check)}},e.prototype.toServer=function(e){function t(e){var t=new FormData(e),n=xhr();return n.open("POST",e.action,!0),n.onload=function(e){4===this.readyState&&200===this.status&&addFiles(this,removeNotExisting(this))},n.send(t),!1}var n=get("#upload-form");t(n)},e.prototype.file=function(){var e=this;this.button.onchange=function(){e.file=this.files[0],e.toServer();var t=[];Array.prototype.forEach.call(this.files,function(e,n,o){t.push(e.name)});var n=e.fileName[0];css(n,{opacity:0}),setTimeout(function(){t=t.length>=2?" Алгоритмы были загружены":"Алгоритм "+t[0]+" был загружен",n.replaceText(t),css(n,{opacity:1,color:"#336f94"}),n.className=n.className+" chose"},e.transitions),sleep(n,{opacity:0},5*e.transitions),setTimeout(function(){css(n,{opacity:0,color:"rgba(108,104,116, 0.5)"}),n.className=n.className.slice(0,n.className.lastIndexOf(" ")),n.replaceText("Загружать только файлы с расширением '.js'!")},6*e.transitions),sleep(n,{opacity:1},6*e.transitions)}};var t=new e({section:"#loading-scripts",list:".ready-algorithm",button:"#upload-file",fileName:".file-name",transitions:300,timeOffset:100});t.active(),t.file()}(),function(){var e,t=get(document),n=Date.now();t.addEventListener("DOMContentLoaded",function(){e=Date.now(),n=(e-n)/6e4;var t=xhr(),o=new FormData;get(".ready-algorithm"),Array.prototype.forEach;return o.append("load","true"),t.open("POST","/search",!0),t.onload=function(e){4===this.readyState&&200===this.status&&addFiles(this)},t.send(o),!1})}(),function(){for(var e=get(".hard-drone-amount"),t=get(".middle-drone-amount"),n=get(".light-drone-amount"),o=Array.prototype.forEach,a=count(0),r=[e,t,n],s=[],i=0,c=0;c<=r.length-1;c++)for(var l=0;l<=r[c].length-1;l++)s[i++]=r[c][l];for(var l=0;l<=r.length-1;l++)o.call(r[l],function(e,t,n){e.onchange=function(){numberMask(this)},e.onkeyup=function(){var e=get(".planes-amount")[0],t=parseInt(e.innerText),n=parseInt(this.value),r=0,i=0,c=this,l=0;if(o.call(s,function(e,t,n){e!==c&&e.value&&(r+=parseInt(e.value))}),i=n,n+=r,n>t){this.value="",this.placeholder="БПЛА осталось: "+(t-r),css(this,{border:"1px solid red"});var d=setInterval(function(){l>=900&&clearInterval(d),css(c,{border:"1px solid transparent"}),setTimeout(function(){css(c,{border:"1px solid red"})},300),l+=300},300)}else this.placeholder="Количество БПЛА.";if(n===t){var p=a();if(1>p){var u=getDronesData();toPage(u),Planes.prototype.all=parseDrones(u)}}return numberMask(this)},e.onfocus=function(){css(this,{border:"1px solid #778899"})}})}(),function(){var e=get(".hard-drone-hide"),t=get(".chars"),n=Array.prototype.forEach;n.call(e,function(e,n,o){e.onclick=function(){console.log(t[n].id),"active"===t[n].id?t[n].id="":t[n].id="active"}});var o=get(".middle-drone-hide"),a=get(".chars"),r=Array.prototype.slice;a=r.call(a,e.length),n.call(o,function(e,t,n){e.onclick=function(){"active"===a[t].id?a[t].id="":a[t].id="active"}});var s=get(".light-drone-hide"),i=get(".chars");i=r.call(i,e.length+o.length),n.call(s,function(e,t,n){e.onclick=function(){"active"===i[t].id?i[t].id="":i[t].id="active"}})}(),MapInteraction.prototype.setDotes=function(){var e=this,t=(parseInt(e.dotes.amount.innerText),count(1));e.dotes.button.onclick=function(){function n(n){var o=parseInt(e.dotes.amount.innerText);dotesTargets.get(o-1)&&(e.dotesCoordinates.length=0,dotesTargets.removeAll(),t=count(1));var a=n.get("coords"),a=n.get("coords"),r=(get(".lon-base"),get(".lat-base"),get(".snow-close-it")[0]),i=get(".snow-paragraph")[0];r&&i&&e.dotesCoordinates.length+1===parseInt(e.dotes.amount.innerText)&&(css(r,{opacity:0}),css(i,{opacity:0}),r.className=r.className+" confirm-base",replaceInSleep(r,"Подтвердить",300),replaceInSleep(i,"Установка базы произошла успешно, командир!",300),css(r,{top:"20%"}),awake(r),awake(i),s=!0);var c=myMap.geoObjects,l=new ymaps.Placemark([a[0],a[1]],{iconContent:t()+"D.",balloonContent:"<strong> Точечные цели </strong>"},{preset:"islands#circleIcon",iconColor:"red"});dotesTargets.add(l),e.dotesCoordinates.push(l),c.add(dotesTargets)}var o=get(".snow"),a=e.dotes.amount.innerText,r="";r=a>1?" точечных целей!":" точечную цель!",o.length||iHide(e.panel,"Кликните на карту и определите "+a+r);var s=!1;myMap.events.add("click",n);var i=setInterval(function(){s&&(clearInterval(i),myMap.events.remove("click",n))},10)}},MapInteraction.prototype.setBase=function(){var e=this;this.button.onclick=function(){function t(t){e.baseBalloon.length&&myCollection.remove(myCollection.get(0));var n=t.get("coords"),a=get(".lon-base"),r=get(".lat-base"),s=get(".snow-close-it")[0],i=get(".snow-paragraph")[0];s&&i&&(css(s,{opacity:0}),css(i,{opacity:0}),s.className=s.className+" confirm-base",replaceInSleep(s,"Подтвердить",300),replaceInSleep(i,"Установка базы произошла успешно, командир!",300),css(s,{top:"20%"}),awake(s),awake(i),o=!0);var c=myMap.geoObjects,l=new ymaps.Placemark([n[0],n[1]],{iconContent:"B",balloonContent:"<strong> Место базирования </strong>"},{preset:"islands#circleIcon",iconColor:"#336f94"});myCollection.add(l),e.baseBalloon.push(l),c.add(myCollection),a[0].replaceText(n[0].toPrecision(6)),r[0].replaceText(n[1].toPrecision(6)),r[0].className.indexOf("not-choosen")&&a[0].className.indexOf("not-choosen")&&(a[0].className=a[0].cutClassTo("not-choosen")+"choosen-base",r[0].className=r[0].cutClassTo("not-choosen")+"choosen-base");for(var d=0;d<=n.length-1;d++)e.baseCoordinates.push(n[d])}var n=get(".snow");n.length||iHide(e.panel,"Кликните на карту и выбирете место базирования");var o=!1;myMap.events.add("click",t);var a=setInterval(function(){o&&(clearInterval(a),myMap.events.remove("click",t))},10)}},MapInteraction.prototype.canvas={},MapInteraction.prototype.canvas.setBase=function(e){var t=e.canvasMap.getContext("2d");e.base.button.onclick=function(){var n=e.base.coordinates.x,o=e.base.coordinates.y,a=e.base.radius,r=2*a*2,s=get(".snow"),i=e.dotes.amount.innerText,c="";c=i>1?" точечных целей!":" точечную цель!";var l=!1,d=setInterval(function(){l&&(clearInterval(d),e.canvasMap.onclick=null)},10);s.length||iHide(e.panel,"Кликните на карту и определите место базирования беспилотников"),e.canvasMap.onmousemove=function(a){this.onclick=function(){n&&o&&t.clearRect(n-r,o-r,2*r,2*r);var s=e.canvasMap.getBoundingClientRect(),i=a.clientX-s.left,c=a.clientY-s.top,d=6,p=0,u=2*Math.PI,h="rgba(93, 138, 168, 1)";drawCircle(t,i,c,d,p,u,0,h,2),drawCircle(t,i,c,d+6,p,u,h,0,2),MapInteraction.prototype.baseCoordinates={x:i,y:c},e.canvasMap.onmousemove=null;var f=get(".snow-close-it")[0],g=get(".snow-paragraph")[0];css(f,{opacity:0}),css(g,{opacity:0}),f.className=f.className+" confirm-base",replaceInSleep(f,"Подтвердить",300),replaceInSleep(g,"Установка базы произошла успешно!",300),css(f,{top:"20%"}),awake(f),awake(g),l=!0,MapInteraction.prototype.baseCoordinates.x=i,MapInteraction.prototype.baseCoordinates.y=c,MapInteraction.prototype.baseRadius=d;var m=e.base.values;m.xV.replaceText(i.toString()),m.yV.replaceText(c.toString());var v=get(".drones")[0],y=window.getComputedStyle(v);"none"===y.display&&css(v,{display:"block"});for(var b in m)m[b].className=m[b].cutClassTo("not-choosen")+"choosen"}}}},MapInteraction.prototype.canvas.setDotes=function(e){var t=e.canvasMap.getContext("2d"),n=count(1);e.dotes.button.onclick=function(){var o=parseInt(e.dotes.amount.innerText),a=e.dotes.coordinates.length,r=e.dotes.radius,s=2*r*2;if(a>=o){for(var i=e.dotes.coordinates,c=0;c<=i.length-1;c++)t.clearRect(i[c].x-2*s*2,i[c].y-2*s*2.65,2*s*2*5,2*s*2*2);n=count(1),i.length=0}var l=get(".snow"),d=e.dotes.amount.innerText,p="rgba(255,64,64, 1)",u="",h=!1;u=d>1?" точечных целей!":" точечную цель!";var f=setInterval(function(){function t(){for(var t=e.dotesCoordinates,n=[],o=0;o<=t.length-1;o++){var a=get(".dotes-coords-row")[0],r=a.cloneNode(!0);r.className=r.cutClassTo("-",!0)+"-"+(o+1);for(var s=r.getChildren(),i=1;i<=s.length-1;i++)s[i].className=s[i].cutClassTo("not-choosen",!0),s[i].className=s[i].cutClassTo("-",!0),s[i].className+="-"+(o+1)+" choosen",s[0].replaceText(o+1+"D.");s[1].replaceText(e.dotesCoordinates[o].x.toString()),s[2].replaceText(e.dotesCoordinates[o].y.toString()),n.push(r)}for(var c=get(".dotes-body")[0],l=c.getChildren(),d=0;d<=l.length-1;d++)l[d].remove();for(var p=0;p<=n.length-1;p++)c.parentOf(n[p]);return!0}h&&(clearInterval(f),e.canvasMap.onmousemove=null,e.canvasMap.onclick=null,t())},10);l.length||iHide(e.panel,"Кликните на карту и определите "+o+u),e.canvasMap.onmousemove=function(a){this.onclick=function(){var s=e.dotesCoordinates.length;if(s+1===o){var i=get(".snow-close-it")[0],c=get(".snow-paragraph")[0];css(i,{opacity:0}),css(c,{opacity:0}),i.className=i.className+" confirm-base",replaceInSleep(i,"Подтвердить",300),replaceInSleep(c,"Задание целей произошло успешно!",300),css(i,{top:"20%"}),awake(i),awake(c),h=!0;var l=new Planes;l.computeDistance("dotes")}var d=e.canvasMap.getBoundingClientRect(),u=a.clientX-d.left,f=a.clientY-d.top,g=0,m=2*Math.PI;drawCircle(t,u,f,r,g,m,0,p,2,"  "+n()+"D"),drawCircle(t,u,f,r+6,g,m,p,0,2,0),MapInteraction.prototype.dotesCoordinates.push({x:u,y:f})}}}},MapInteraction.prototype.canvas.setTrajectory=function(e){var t=e.canvasMap.getContext("2d"),n=e.trajectory.radius,o=2*n*2,a=count(1),r=count(0),s=count(1),i=s(),c=[];e.trajectory.button.onclick=function(){var l=get(".snow"),d="",p=!1,u=parseInt(e.trajectory.amount.innerText),h=e.trajectoryCoordinates.length;if(d=u>1?" траекторных целей!":" тректорную цель!",l.length||iHide(e.panel,"Кликните на карту и определите "+u+d),h>=u){for(var f=e.trajectoryCoordinates,g=0;g<=f.length-1;g++){coordinate=f[g];var m=coordinate[0].x,v=coordinate[0].y,y=coordinate[1].x,b=coordinate[1].y;t.clearRect(m-2*o*2,v-2*o*2.65,2*o*2*5,2*o*2*2),t.clearRect(y-2*o*2,b-2*o*2.65,2*o*2*5,2*o*2*2),t.clearRect(m,v,y-m,b-v)}a=count(1),r=count(0),s=count(1),i=s(),f.length=0}var w=setInterval(function(){function t(){for(var t=e.trajectoryCoordinates,n=[],o=0;o<=t.length-1;o++)for(var a=t[o],r=0;r<=a.length-1;r++){var s=get(".trajectory-coords-row")[0],i=s.cloneNode(!0);i.className=i.cutClassTo("coordinate-1",!0)+"coordinate-"+(o+1)+"-"+(r+1);for(var c=i.getChildren(),l=1;l<=c.length-1;l++)c[l].className=c[l].cutClassTo("not-choosen",!0),c[l].className=c[l].cutClassTo("thla-",!0),c[l].className+="thla-"+(r+1)+"-"+l+" choosen";c[0].replaceText(o+1+"T."+(r+1)),c[1].replaceText(e.trajectoryCoordinates[o][r].x.toString()),c[2].replaceText(e.trajectoryCoordinates[o][r].y.toString()),n.push(i)}for(var d=get(".trajectory-table-body")[0],p=d.getChildren(),u=0;u<=p.length-1;u++)p[u].remove();for(var h=0;h<=n.length-1;h++)d.parentOf(n[h]);return!0}p&&(clearInterval(w),e.canvasMap.onmousemove=null,e.canvasMap.onclick=null,t())},10);e.canvasMap.onmousemove=function(o){this.onclick=function(){var l=e.canvasMap.getBoundingClientRect(),d=o.clientX-l.left,h=o.clientY-l.top,f="rgba(73, 121, 107, 1)",g=0,m=2*Math.PI;c.push({x:d,y:h});var v=r();if(1===v){r=count(0),MapInteraction.prototype.trajectoryCoordinates.push(c);var y=c[0].x,b=c[0].y,w=c[1].x,x=c[1].y;if(t.beginPath(),t.moveTo(y,b),t.lineTo(w,x),t.strokeStyle="rgba(73, 121, 107, .5)",t.stroke(),c=[],e.trajectoryCoordinates.length===u){var T=get(".snow-close-it")[0],C=get(".snow-paragraph")[0];css(T,{opacity:0}),css(C,{opacity:0}),T.className=T.className+" confirm-base",replaceInSleep(T,"Подтвердить",300),replaceInSleep(C,"Задание целей произошло успешно!",300),css(T,{top:"20%"}),awake(T),awake(C),p=!0;var M=new Planes;M.computeDistance("trajectory")}}drawCircle(t,d,h,n+2,g,m,0,f,2,"  "+i+"T."+a()),1===v&&(i=s(),a=count(1))}}}},MapInteraction.prototype.replaceHeaders=function(e,t){return this.base.headers.xH.replaceText(e),this.base.headers.yH.replaceText(t),this.dotes.headers.xH.replaceText(e),this.dotes.headers.yH.replaceText(t),this.trajectory.headers.xH.replaceText(e),this.trajectory.headers.yH.replaceText(t),this.area.headers.xH.replaceText(e),this.area.headers.yH.replaceText(t),this},MapInteraction.prototype.canvas.initialize=function(e){return e.replaceHeaders("x","y"),this.setBase(e),this.setDotes(e),this.setTrajectory(e),this},MapInteraction.prototype.baseBalloon=[],MapInteraction.prototype.baseCoordinates=[],MapInteraction.prototype.dotesCoordinates=[],MapInteraction.prototype.areaCoordinates=[],MapInteraction.prototype.trajectoryCoordinates=[],function(){function e(){function r(){if(s){var t=get("#polygon"),n=get("#static-map");sleep(t,n),css(t,{zIndex:1}),css(n,{zIndex:0,background:"rgba(255, 255, 255, .4)"}),awake(t,n),this.value="Переключиться на холст",s=!1}else this.onclick=e,this.onclick()}if(s)this.onclick=r,this.onclick();else{var i=get("#polygon"),c=get("#static-map");sleep(i,c),css(i,{zIndex:5}),css(c,{zIndex:4,background:"rgba(255, 255, 255, .4)"}),awake(i,c),this.value="Переключиться на карту",s=!0}s?a.initialize(o):(o.replaceHeaders("Долгота","Широта"),t.setBase(),n.setDotes())}var t=new MapInteraction({map:"#dynamic-map",panel:"#control-additional",button:"#set-base",longitude:".lon-base",latitude:".lat-base"});t.setBase();var n=new MapInteraction({map:"#dynamic-map",panel:"#control-additional",dotes:{longitude:get(".lon-dhla-1")[0],latitude:get(".lat-dhla-1")[0],amount:get(".dotes-amount")[0],button:get("#set-dotes")},trajectory:{pointA:{lontitude:get(".lon-thla-1-1")[0],latitude:get(".lat-thla-1-1")[0]},pointB:{lontitude:get(".lon-thla-1-2")[0],latitude:get(".lat-thla-1-2")[0]},amount:get(".trajectory-amount")[0],button:get("#set-trajectory")},area:{pointA:{longitude:get(".lon-ahla-1-1")[0],latitude:get(".lat-ahla-1-1")[0]},pointB:{longitude:get(".lon-ahla-1-2")[0],latitude:get(".lat-ahla-1-2")[0]},pointC:{longitude:get(".lon-ahla-1-3")[0],latitude:get(".lat-ahla-1-3")[0]},pointD:{longitude:get(".lon-ahla-1-4")[0],latitude:get(".lat-ahla-1-4")[0]},amount:get(".area-amount")[0],button:get("#set-area")}});n.setDotes();var o=new MapInteraction({canvasMap:"#polygon",panel:"#control-additional",base:{coordinates:{x:0,y:0},radius:3,button:get("#set-base"),values:{xV:get(".lon-base")[0],yV:get(".lat-base")[0]},headers:{xH:get(".lon-base-headers")[0],yH:get(".lat-base-headers")[0]}},dotes:{coordinates:[],values:{xV:get(".lon-dotes-hla")[0],yV:get(".lat-dotes-hla")[0]},headers:{xH:get(".lon-dotes-headers")[0],yH:get(".lat-dotes-headers")[0]},amount:get(".dotes-amount")[0],button:get("#set-dotes"),radius:2},trajectory:{coordinates:[],values:{xV:get(".lon-trajectory-hla")[0],yV:get(".lat-trajectory-hla")[0]},headers:{xH:get(".lon-trajectory-headers")[0],yH:get(".lat-trajectory-headers")[0]},amount:get(".trajectory-amount")[0],button:get("#set-trajectory"),radius:1.5},area:{coordinates:[[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]],values:{xV:get(".lon-area-hla")[0],yV:get(".lat-area-hla")[0]},headers:{xH:get(".lon-area-headers")[0],yH:get(".lat-area-headers")[0]},amount:get(".area-amount")[0],button:get("#set-area")}}),a=o.canvas,r=get("#switch"),s=!1;r.onclick=e}(),function(){function e(){var e=new MapInteraction,t=e.dotesCoordinates,n=e.baseCoordinates,o=[];return isCorrect(t,"Array")&&t.forEach(function(e,t,a){var r=e.x,s=e.y,i=n.x,c=n.y,l={};l.x=r-i,l.y=s-c,l.result=Math.sqrt(Math.pow(l.x,2)+Math.pow(l.y,2)),o.push(l.result)}),o}function t(){var e=new MapInteraction,t=e.trajectoryCoordinates,n=e.baseCoordinates,o=[];return isCorrect(t,"Array")&&t.forEach(function(e,t,a){o.push([]),e.forEach(function(e,a,r){var s=e.x,i=e.y,c=n.x,l=n.y,d={},p=o[t][a-1];d.x=s-c,d.y=i-l,d.result=Math.sqrt(Math.pow(d.x,2)+Math.pow(d.y,2)),p&&(d.result<=p?MapInteraction.prototype.trajectoryCoordinates[t][a].entry=!0:MapInteraction.prototype.trajectoryCoordinates[t][a-1].entry=!0),o[t].push(d.result)})}),o}Planes.prototype.atBase=function(){isCorrect(this,"Object");for(var e=new MapInteraction,t=0;t<=this.all.length-1;t++)this.all[t].base=e.baseCoordinates},Planes.prototype.toCanvas=function(){isCorrect(this,"Object");var e=new MapInteraction,t=get("#polygon").getContext("2d"),n=e.baseRadius,o=2*n*2,a=0,r=2*Math.PI,s="rgba(30,199,115, 1)",i=this.all[0],c=this.all;i.base.x&&t.clearRect(i.base.x-(o+n),i.base.y-(o+n),2.5*o,2.5*o),drawCircle(t,i.base.x,i.base.y,n,a,r,0,s,2),drawText(t,"white","9px serif",c),drawCircle(t,i.base.x,i.base.y,n+6,a,r,s,0,2)},Planes.prototype.computeDistance=function(n){var o=this,a=setInterval(function(){if(o.all){var r=[];"dotes"===n&&r.push({distanceToDotes:e()}),"trajectory"===n&&r.push({distanceToTrajectories:t()}),"area"===n&&r.push({distanceToAreas:computeDistanceToAreas()}),clearInterval(a)}})};var n=new Planes,o=setInterval(function(){n.all&&(n.atBase(),n.toCanvas(),clearInterval(o))},10)}(),function(){function e(e){if("object"!=typeof e)throw new TypeError("Incoming parameter is not an object");for(var t in e){var n=e[t];this[t]={};for(var o in n)"string"==typeof n[o]?this[t][o]=get(n[o])[0]:this[t][o]=n[o]}}e.prototype.defineSegments=function(e){var t=e.getBoundingClientRect();return e.segments={start:t.left,end:t.right,width:t.right-t.left},this},e.prototype.breaks=function(e){var t=e.segments;t.each=t.width/this.options.divisions,t.coords=new Array(this.options.divisions),t.coords[this.options.divisions]=t.end;for(var n=this.options.divisions-1;n>=0;n--)t.coords[n]=Math.round(t.coords[n+1]-t.each);return delete t.coords[t.coords.length-1],this},e.prototype.resize=function(){window.onresize=function(){t.defineSegments(t.dom.line),t.breaks(t.dom.line);var e=parseInt(t.dom.amount.getText());t.dom.tongle.style.left=t.dom.line.segments.coords[e-1]-t.dom.line.segments.start+"px"}},e.prototype.action=function(){var e=this;this.dom.tongle.onmousedown=function(t){function n(t){var n=e.dom.line.segments;e.dom.tongle.style.cursor="pointer",t.clientX>=n.start&&t.clientX<=n.end&&(e.dom.tongle.style.left=t.clientX-n.start-e.dom.tongle.offsetWidth/2+"px")}function o(t){var n=e.dom.tongle.segments;e.defineSegments(e.dom.tongle),e.breaks(e.dom.line),e.dom.line.segments.coords.forEach(function(t,o,a){n.start<=t&&n.start>=t-10&&e.dom.amount.replaceText((o+1).toString())})}n(t),document.onmousemove=function(e){n(e),o(e)},document.onmouseup=function(){document.onmousemove=null,e.dom.tongle.onmouseup=null},e.dom.tongle.ondragstart=function(){return!1}}},e.prototype.create=function(){this.defineSegments(this.dom.line),this.defineSegments(this.dom.tongle),this.breaks(this.dom.line),this.resize(),this.action()};var t=new e({dom:{slider:".planes-slider",line:".planes-toddler-line",tongle:".planes-toddle",amount:".planes-amount"},options:{divisions:20}});t.create();var n=new e({dom:{slider:".defence-slider",line:".defence-toddler-line",tongle:".defence-toddle",amount:".defence-amount"},options:{divisions:10}});n.create();var o=new e({dom:{slider:".dotes-slider",line:".dotes-toddler-line",tongle:".dotes-toddle",amount:".dotes-amount"},options:{divisions:10}});o.create();var a=new e({dom:{slider:".area-slider",line:".area-toddler-line",tongle:".area-toddle",amount:".area-amount"
},options:{divisions:10}});a.create();var r=new e({dom:{slider:".trajectory-slider",line:".trajectory-toddler-line",tongle:".trajectory-toddle",amount:".trajectory-amount"},options:{divisions:10}});r.create()}(),function(){for(var e=get(".hard-drone-cls"),t=get(".middle-drone-cls"),n=get(".light-drone-cls"),o=get(".hard-drone-checks"),a=get(".middle-drone-checks"),r=get(".light-drone-checks"),s=get(".hard-drone-amount"),i=get(".middle-drone-amount"),c=get(".light-drone-amount"),l=Array.prototype.forEach,d=[e,t,n],p=[o,a,r],u=[s,i,c],h=[],f=[],g=[],m=0;m<=d.length-1;m++){var v=d[m];l.call(v,function(e,t,n){h.push(e)})}for(var y=0;y<=p.length-1;y++){var b=p[y];l.call(b,function(e,t,n){f.push(e)})}for(var w=0;w<=u.length-1;w++){var x=u[w];l.call(x,function(e,t,n){g.push(e)})}l.call(h,function(e,t,n){e.onclick=function(){f[t].checked&&(f[t].checked=!1,g[t].value="",css(g[t],{border:"1px solid transparent"}))}})}();var myMap,myCollection,dotesTargets,areaTargets,trajectoryTargets;ymaps.ready(init);