function get(e){if(!e)throw new TypeError;var t;return t="object"==typeof e?e:e.slice(0,1),"."===t?document.getElementsByClassName(e.slice(1,e.length)):"#"===t?document.getElementById(e.slice(1,e.length)):"object"==typeof t?e:void 0}function log(){console.log(arguments)}function css(e,t){if(!e&&!t)throw new TypeError;for(var o in t)e.style[o]=t[o];return e}function isArray(e){return!!(e&&e.length&&e.length>=0&&isFinite(e.length)&&e.length<=Math.pow(2,32))}function parentOf(){var e=Array.prototype.forEach,t=this;return e.call(arguments,function(e){t.appendChild(e)}),t}function cutClassTo(e){isCorrect(e,"String");try{isCorrect(this,"HTMLElement")}catch(t){try{isCorrect(this,"HTMLTableCellElement")}catch(o){console.log("I can't do this Boss.",o)}}return this.className.slice(0,this.className.indexOf(e))}function typeAndValue(e){if(null==e)return"";switch(e.constructor){case Number:return"Number: "+e;case String:return"String: '"+e+"'";case Date:return"Date: "+e;case Boolean:return"Boolean: "+e;case RegExp:return"RegExp: "+e;case List:return"List: "+e}}function type(e){var t,o,n;return null===e?"null":e!==e?"nan":"object"!=(o=typeof e)?o:"Object"!==(t=classOf(e))?t:(n=e.constructor.getName())?n:"Object"}function classOf(e){return Object.prototype.toString.call(e).slice(8,-1)}function quacks(e){for(var t=1;t<=arguments.length-1;t++){var o=arguments[t];switch(typeof o){case"string":if("function"!==e[o])return!1;continue;case"function":o=o.prototype;case"object":for(var n in o)if("function"==typeof o[n]&&"function"!=typeof e[n])return!1}}return!0}function xhr(){if(void 0!==window.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){throw new Error("XMLHttpRequest doesn't support")}}}function isString(e){if("string"!=typeof e)throw new TypeError("Incoming parameter is not an object. It is "+typeof e)}function parseToArr(e){isString(e);var t=[];for(i=0;i<e.length-1;i++)" "!==e[i]&&"number"==typeof parseInt(e[i])&&t.push(!!parseInt(e[i]));return t}function getArr(e){isString(e);for(var t=[],o=0,n=1;n>0;)n=e.indexOf(",",n),n+=1,0!==n?t.push(e.slice(o,n-1)):t.push(e.slice(o,e.length)),o=n;return t}function parseLogic(e){if(!e)throw new TypeError("Incoming parameter is not an object. It is "+typeof e);for(var t,o,n={},r=0;r<e.length;r++){var a=e[r];t=a.slice(0,a.indexOf("-")-1),o=a.slice(a.indexOf("-")+2),n[r]={},n[r].name=t,n[r].value=o}return n}function count(e){return void 0==e?e=0:e,function(){return e++}}function setCookies(e,t,o){var n=e+"="+encodeURIComponent(t);"number"==typeof o&&(n+="; max-age="+60*o*60*24),document.cookie=n}function getCookies(){var e={},t=document.cookie;if(""===t)return e;for(var o=t.split("; "),n=0;n<=o.length-1;n++){var r=o[n],a=r.indexOf("="),i=r.slice(0,a),s=r.slice(a+1);s=decodeURIComponent(s),e[i]=s}return e}function deleteCookies(e){document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT"}function toHTMLView(e){if("object"!=typeof e&&"Array"!==classOf(e))throw new TypeError("Incoming parameter doesn't have 'object' type");var t=get(".ready-algorithm")[0],o=(t.getChildren().getChildren(),e.map(function(e,o,n){var r=t.cloneNode(!0),a=r.getChildren().getChildren();r.removeAttribute("hidden"),r.id="",r.className=r.className.slice(0,r.className.lastIndexOf("-")+1)+counter(),a[0]&&a[0].replaceText(e);var i=["all.js","yandex"];return a[0]&&"Вы ещё не загрузили ни один алгоритм"!==a[0].innerText&&(r.onclick=function(){var e=get("#active-algorithm");e&&(e.id=""),this.id="active-algorithm";for(var t=document.getElementsByTagName("script"),o=0;o<=t.length-1;o++){var n=t[o].src.indexOf(i[0])+1||t[o].src.indexOf(i[1])+1;n||t[o].remove()}var r=document.createElement("script"),s=a[0].innerText,c="js/algorithms/";r.src=c+s,document.body.appendChild(r)}),r})),n=get(".algorithms")[0];o.forEach(function(e,t,o){n.appendChild(e)})}function sleep(e,t,o){t||o||setTimeout(function(){css(e,css({opacity:0}))},300),setTimeout(function(){css(e,t)},o)}function awake(e,t,o){t||o||setTimeout(function(){css(e,css({opacity:1}))},300),setTimeout(function(){css(e,t)},o)}function isCorrect(e,t){if(classOf(e)!==t)throw new TypeError("Incoming parameter does not belong to '"+t+"' class!");return!0}function replaceInSleep(e,t,o){return isCorrect(t,"String"),setTimeout(function(){e.value?e.value=t:e.replaceText(t)},o),!0}function addFiles(e){if("XMLHttpRequest"!==classOf(e))throw new TypeError("Incoming parameter is not an 'XMLHttpRequest' object!");try{if(e.responseText){var t=JSON.parse(e.responseText);t.length||t.push("Вы ещё не загрузили ни один алгоритм");var o=encodeURIComponent(t);o!==getCookies().answer&&(deleteCookies(),setCookies("answer",t,1));var n=getCookies(),r=getArr(n.answer);if(arguments[1]){var a=arguments[1];for(var i in a)"exists"===a[i]&&delete r[i]}toHTMLView(r)}}catch(s){console.log(s)}}function removeNotExisting(e){if("XMLHttpRequest"!==classOf(e))throw new TypeError("Incoming parameter is not an 'XMLHttpRequest' object!");try{if(e.responseText){var t=get(".ready-algorithm"),o=get("#upload-file"),n=Array.prototype.forEach,r=[],a=[],i=count(1),s=JSON.parse(e.responseText);n.call(t,function(e,t,o){r.push(get(".algorithm-"+i()));var n=r[t];for(var s in n)if(n.hasOwnProperty(s)){if("length"!==s)var c=n[s].getChildren().getChildren();for(var l in c)c.hasOwnProperty(l)&&a.push(c[l])}}),n.call(o.files,function(e,t,o){var n=e.name;for(var r in a)if(a[r].innerText===n)for(var i in s)s[i]===n&&(s[i]="exists");else"Вы ещё не загрузили ни один алгоритм"===a[r].innerText&&(a[r].parentNode.parentNode.remove(),counter=count(1))})}}catch(c){console.log(c)}return s}function check(e,t,o){e.onclick=function(){var e=(self.list.length,get("#active-algorithm"));e.id="",this.id="active-algorithm"}}function iHide(e,t){if("string"!=typeof t)throw new TypeError("Incoming arguments is not a string");if("object"!=typeof e)throw new TypeError("Incoming arguments is not an object");var o=document.createElement("div"),n=document.createElement("div"),r=document.createElement("input"),a=document.createElement("p");return o.className="snow-wrapper",n.className="snow",r.className=n.className+"-close-it",a.className="snow-paragraph span-10 offset-5",r.type="button",r.value="Отменить",r.onclick=function(){removeBody(".snow-wrapper")},css(o,{position:"absolute",height:"100%",width:"100%",top:0,left:0,borderTop:"3px solid #90ee90"}),css(n,{position:"absolute",top:0,left:0,height:"100%",width:"100%",background:"white",opacity:"0.7","-webkit-filter":"blur(10px)"}),r.appendChild(document.createTextNode("закрыть")),t=document.createTextNode(t),e.parentOf(o.parentOf(n,r,a.parentOf(t))),1}function removeBody(e){var t=get(e);t.length&&(css(t[0],{opacity:0}),setTimeout(function(){t[0].remove()},300))}function init(){myMap=new ymaps.Map("dynamic-map",{center:[55.76,37.64],zoom:5}),myCollection=new ymaps.GeoObjectCollection({},{preset:"twirl#redIcon",draggable:!1}),dotesTargets=new ymaps.GeoObjectCollection({},{preset:"twirl#redIcon",draggable:!1})}!function(){function e(){function t(){if(o){var t=get("#polygon");sleep(t),css(t,{zIndex:0,background:"transparent"}),awake(t),this.value="Переключиться на холст",o=!1}else this.onclick=e,this.onclick()}if(o)this.onclick=t,this.onclick();else{var n=get("#polygon");sleep(n),css(n,{zIndex:5,background:"rgba(255, 255, 255, .5)"}),awake(n),this.value="Переключиться на карту",o=!0}}var t=get("#to-canvas"),o=!1;t.onclick=e}(),Object.defineProperties(Object.prototype,{replaceText:{value:function(e,t){var o="There are no any text.";if(!e)throw new TypeError(o);if(o="It is not an object","string"!=typeof e)throw new TypeError(o);return this.removeChild(this.childNodes[0]),this.appendChild(document.createTextNode(e)),this},writable:!0,enumerable:!1,configurable:!0},getText:{value:function(){var e="Apply this method to object.";if("object"!=typeof this)throw new TypeError(e);return this.childNodes[0].nodeValue},writable:!0,enumerable:!1,configurable:!0}}),HTMLElement.prototype.getChildren=function(){var e,t=[];if("Array"===classOf(this))this.forEach(function(o,n,r){if(o.children&&o.children.length){e=o.children;for(var n in e)e.hasOwnProperty(n)&&t.push(e[n])}});else if("HTMLElement"===classOf(this)&&this.children.length){e=this.children;for(var o in e)e.hasOwnProperty(o)&&t.push(e[o])}return t},Array.prototype.getChildren=HTMLElement.prototype.getChildren,HTMLElement.prototype.parentOf=parentOf,HTMLElement.prototype.cutClassTo=cutClassTo,Function.prototype.getName=function(){return"name"in this?this.name:this.name=this.toString().match(/function\s*([^(]*)\(/)[1]},function(){var e=get("#container"),t=e.clientHeight;if(screen.availHeight){var o=(screen.availHeight-t)/6;css(e,{marginTop:o+"px"})}}();var counter=count(1);!function(){function e(e){if("object"!=typeof e)throw new TypeError("Incoming arguments is not an object");for(var t in e)"string"!=typeof e[t]?this[t]=e[t]:this[t]=get(e[t])}e.prototype.active=function(){if(this.list){this.list instanceof Array?this.list.forEach(check):Array.prototype.forEach.call(this.list,check)}},e.prototype.toServer=function(e){function t(e){var t=new FormData(e),o=xhr();return o.open("POST",e.action,!0),o.onload=function(e){4===this.readyState&&200===this.status&&addFiles(this,removeNotExisting(this))},o.send(t),!1}var o=get("#upload-form");t(o)},e.prototype.file=function(){var e=this;this.button.onchange=function(){e.file=this.files[0],e.toServer();var t=[];Array.prototype.forEach.call(this.files,function(e,o,n){t.push(e.name)});var o=e.fileName[0];css(o,{opacity:0}),setTimeout(function(){t=t.length>=2?" Алгоритмы были загружены":"Алгоритм "+t[0]+" был загружен",o.replaceText(t),css(o,{opacity:1,color:"#336f94"}),o.className=o.className+" chose"},e.transitions),sleep(o,{opacity:0},5*e.transitions),setTimeout(function(){css(o,{opacity:0,color:"rgba(108,104,116, 0.5)"}),o.className=o.className.slice(0,o.className.lastIndexOf(" ")),o.replaceText("Загружать только файлы с расширением '.js'!")},6*e.transitions),sleep(o,{opacity:1},6*e.transitions)}};var t=new e({section:"#loading-scripts",list:".ready-algorithm",button:"#upload-file",fileName:".file-name",transitions:300,timeOffset:100});t.active(),t.file()}(),function(){var e,t=get(document),o=Date.now();t.addEventListener("DOMContentLoaded",function(){e=Date.now(),o=(e-o)/6e4;var t=xhr(),n=new FormData;get(".ready-algorithm"),Array.prototype.forEach;return n.append("load","true"),t.open("POST","/search",!0),t.onload=function(e){4===this.readyState&&200===this.status&&addFiles(this)},t.send(n),!1})}(),function(){function e(e){if("object"!=typeof e)throw new TypeError("Incoming arguments is not an object");for(var t in e)"string"!=typeof e[t]?this[t]=e[t]:this[t]=get(e[t])}e.prototype.baseBalloon=[],e.prototype.baseCoordinates=[],e.prototype.dotesCoordinates=[],e.prototype.areaCoordinates=[],e.prototype.trajectoryCoordinates=[],e.prototype.setBase=function(){var e=this;this.button.onclick=function(){function t(t){e.baseBalloon.length&&myCollection.remove(myCollection.get(0));var o=t.get("coords"),r=get(".lon-base"),a=get(".lat-base"),i=get(".snow-close-it")[0],s=get(".snow-paragraph")[0];i&&s&&(css(i,{opacity:0}),css(s,{opacity:0}),i.className=i.className+" confirm-base",replaceInSleep(i,"Подтвердить",300),replaceInSleep(s,"Установка базы произошла успешно, командир!",300),css(i,{top:"20%"}),awake(i),awake(s),n=!0);var c=myMap.geoObjects,l=new ymaps.Placemark([o[0],o[1]],{iconContent:"B",balloonContent:"<strong> Место базирования </strong>"},{preset:"islands#circleIcon",iconColor:"#336f94"});myCollection.add(l),e.baseBalloon.push(l),c.add(myCollection),r[0].replaceText(o[0].toPrecision(6)),a[0].replaceText(o[1].toPrecision(6)),a[0].className.indexOf("not-choosen")&&r[0].className.indexOf("not-choosen")&&(r[0].className=r[0].cutClassTo("not-choosen")+"choosen-base",a[0].className=a[0].cutClassTo("not-choosen")+"choosen-base");for(var p=0;p<=o.length-1;p++)e.baseCoordinates.push(o[p])}var o=get(".snow");o.length||iHide(e.panel,"Кликните на карту и выбирете место базирования");var n=!1;myMap.events.add("click",t);var r=setInterval(function(){n&&(clearInterval(r),myMap.events.remove("click",t))},10)}},e.prototype.setDotes=function(){var e=this,t=(parseInt(e.dotes.amount.innerText),count(1));e.dotes.button.onclick=function(){function o(o){var n=parseInt(e.dotes.amount.innerText);dotesTargets.get(n-1)&&(e.dotesCoordinates.length=0,dotesTargets.removeAll(),t=count(1));var r=o.get("coords"),r=o.get("coords"),a=(get(".lon-base"),get(".lat-base"),get(".snow-close-it")[0]),s=get(".snow-paragraph")[0];a&&s&&e.dotesCoordinates.length+1===parseInt(e.dotes.amount.innerText)&&(console.log(e.dotesCoordinates.length+1,parseInt(e.dotes.amount.innerText)),css(a,{opacity:0}),css(s,{opacity:0}),a.className=a.className+" confirm-base",replaceInSleep(a,"Подтвердить",300),replaceInSleep(s,"Установка базы произошла успешно, командир!",300),css(a,{top:"20%"}),awake(a),awake(s),i=!0);var c=myMap.geoObjects,l=new ymaps.Placemark([r[0],r[1]],{iconContent:t()+"D.",balloonContent:"<strong> Точечные цели </strong>"},{preset:"islands#circleIcon",iconColor:"red"});dotesTargets.add(l),e.dotesCoordinates.push(l),c.add(dotesTargets)}var n=get(".snow"),r=e.dotes.amount.innerText,a="";a=r>1?" точечных целей!":" точечную цель!",console.log(typeof r),n.length||iHide(e.panel,"Кликните на карту и определите "+r+a);var i=!1;myMap.events.add("click",o);var s=setInterval(function(){i&&(clearInterval(s),myMap.events.remove("click",o))},10)}};var t=new e({map:".ymaps-map",panel:"#control-additional",button:"#set-base",longitude:".lon-base",latitude:".lat-base"});t.setBase();var o=new e({map:".ymaps-map",panel:"#control-additional",dotes:{longitude:get(".lon-dhla-1")[0],latitude:get(".lat-dhla-1")[0],amount:get(".dotes-amount")[0],button:get("#set-dotes-coords")},trajectory:{pointA:{lontitude:get(".lon-thla-1-1")[0],latitude:get(".lat-thla-1-1")[0]},pointB:{lontitude:get(".lon-thla-1-2")[0],latitude:get(".lat-thla-1-2")[0]},amount:get(".trajectory-amount")[0],button:get("#set-trajectory-coords")},area:{pointA:{longitude:get(".lon-ahla-1-1")[0],latitude:get(".lat-ahla-1-1")[0]},pointB:{longitude:get(".lon-ahla-1-2")[0],latitude:get(".lat-ahla-1-2")[0]},pointC:{longitude:get(".lon-ahla-1-3")[0],latitude:get(".lat-ahla-1-3")[0]},pointD:{longitude:get(".lon-ahla-1-4")[0],latitude:get(".lat-ahla-1-4")[0]},amount:get(".area-amount")[0],button:get("#set-area-coords")}});o.setDotes(),console.log(o)}(),function(){function e(e){if("object"!=typeof e)throw new TypeError("Incoming parameter is not an object");for(var t in e){var o=e[t];this[t]={};for(var n in o)"string"==typeof o[n]?this[t][n]=get(o[n])[0]:this[t][n]=o[n]}}e.prototype.defineSegments=function(e){var t=e.getBoundingClientRect();return e.segments={start:t.left,end:t.right,width:t.right-t.left},this},e.prototype.breaks=function(e){var t=e.segments;t.each=t.width/this.options.divisions,t.coords=new Array(this.options.divisions),t.coords[this.options.divisions]=t.end;for(var o=this.options.divisions-1;o>=0;o--)t.coords[o]=Math.round(t.coords[o+1]-t.each);return delete t.coords[t.coords.length-1],this},e.prototype.resize=function(){window.onresize=function(){t.defineSegments(t.dom.line),t.breaks(t.dom.line);var e=parseInt(t.dom.amount.getText());t.dom.tongle.style.left=t.dom.line.segments.coords[e-1]-t.dom.line.segments.start+"px"}},e.prototype.action=function(){var e=this;this.dom.tongle.onmousedown=function(t){function o(t){var o=e.dom.line.segments;e.dom.tongle.style.cursor="pointer",t.clientX>=o.start&&t.clientX<=o.end&&(e.dom.tongle.style.left=t.clientX-o.start-e.dom.tongle.offsetWidth/2+"px")}function n(t){var o=e.dom.tongle.segments;e.defineSegments(e.dom.tongle),e.breaks(e.dom.line),e.dom.line.segments.coords.forEach(function(t,n,r){o.start<=t&&o.start>=t-10&&e.dom.amount.replaceText((n+1).toString())})}o(t),document.onmousemove=function(e){o(e),n(e)},document.onmouseup=function(){document.onmousemove=null,e.dom.tongle.onmouseup=null},e.dom.tongle.ondragstart=function(){return!1}}},e.prototype.create=function(){this.defineSegments(this.dom.line),this.defineSegments(this.dom.tongle),this.breaks(this.dom.line),this.resize(),this.action()};var t=new e({dom:{slider:".planes-slider",line:".planes-toddler-line",tongle:".planes-toddle",amount:".planes-amount"},options:{divisions:20}});t.create();var o=new e({dom:{slider:".dotes-slider",line:".dotes-toddler-line",tongle:".dotes-toddle",amount:".dotes-amount"},options:{divisions:10}});o.create();var n=new e({dom:{slider:".area-slider",line:".area-toddler-line",tongle:".area-toddle",amount:".area-amount"},options:{divisions:10}});n.create();var r=new e({dom:{slider:".trajectory-slider",line:".trajectory-toddler-line",tongle:".trajectory-toddle",amount:".trajectory-amount"},options:{divisions:10}});r.create()}();var myMap,myCollection,dotesTargets,areaTargets,trajectoryTargets;ymaps.ready(init);