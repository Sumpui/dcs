function get(o) {
    if (!o) throw new TypeError();
    var attr;
    typeof o === "object" ? attr = o : attr = o.slice(0, 1);
    if (attr === ".") {
        return document.getElementsByClassName(o.slice(1, o.length));
    } else if (attr === "#") {
        return document.getElementById(o.slice(1, o.length));
    } else if (typeof attr === "object") {
        return o;
    }
}

function log() {
    console.log(arguments);
}

function css(o, p) {
    if (!o && !p) throw new TypeError();
    for (var i in p) {
        o.style[i] = p[i];
    }
    return o;
}

function isArray(a) {
    if (a && a.length && a.length >= 0 && isFinite(a.length) && a.length <= Math.pow(2, 32)) {
        return true;
    } else {
        return false;
    }
}

Object.defineProperties(Object.prototype, {
    replaceText: {
        value: function(t, n) {
            var mes = "There are no any text.";
            if (!t) throw new TypeError(mes);
            mes = "It is not a string";
            if (typeof t !== "string") throw new TypeError(mes);
            this.removeChild(this.childNodes[0]);
            this.appendChild(document.createTextNode(t));
            return this;
        },
        writable: true,
        enumerable: false,
        configurable: true
    },
    getText: {
        value: function() {
            var mes = "Apply this method to object.";
            if (typeof this !== "object") throw new TypeError(mes);
            return this.childNodes[0].nodeValue;
        },
        writable: true,
        enumerable: false,
        configurable: true
    }
});

HTMLElement.prototype.getChildren = function() {
    var children = [], child;
    if (classOf(this) === "Array") {
        this.forEach(function(x, i, a) {
            if (x.children && x.children.length) {
                child = x.children;
                for (var i in child) {
                    if (child.hasOwnProperty(i)) {
                        children.push(child[i]);
                    }
                }
            }
        });
    } else if (classOf(this) === "HTMLElement") {
        if (this.children.length) {
            child = this.children;
            for (var i in child) {
                if (child.hasOwnProperty(i)) {
                    children.push(child[i]);
                }
            }
        }
    } else if (classOf(this) === "HTMLTableRowElement") {
        if (this.children.length) {
            child = this.children;
            for (var i in child) {
                if (child.hasOwnProperty(i)) {
                    children.push(child[i]);
                }
            }
        }
    } else if (classOf(this) === "HTMLTableSectionElement") {
        if (this.children.length) {
            child = this.children;
            for (var i in child) {
                if (child.hasOwnProperty(i)) {
                    children.push(child[i]);
                }
            }
        }
    }
    return children;
};

Array.prototype.getChildren = HTMLElement.prototype.getChildren;

function parentOf() {
    var each = Array.prototype.forEach;
    var self = this;
    each.call(arguments, function(x) {
        self.appendChild(x);
    });
    return self;
}

HTMLElement.prototype.parentOf = parentOf;

function cutClassTo(str) {
    isCorrect(str, "String");
    try {
        isCorrect(this, "HTMLElement");
    } catch (e1) {
        try {
            isCorrect(this, "HTMLTableCellElement");
        } catch (e2) {
            try {
                isCorrect(this, "HTMLTableRowElement");
            } catch (e3) {
                try {
                    isCorrect(this, "HTMLInputElement");
                } catch (e4) {
                    console.log("Incoming parameter doesn't belong to HTMLElement, HTMLInputElement, HTMLTableRowElement, HTMLTableCellElement");
                }
            }
        }
    }
    if (arguments[1]) {
        return this.className.slice(0, this.className.lastIndexOf(str));
    } else {
        return this.className.slice(0, this.className.indexOf(str));
    }
}

HTMLElement.prototype.cutClassTo = cutClassTo;

function typeAndValue(x) {
    if (x == null) return "";
    switch (x.constructor) {
      case Number:
        return "Number: " + x;

      case String:
        return "String: '" + x + "'";

      case Date:
        return "Date: " + x;

      case Boolean:
        return "Boolean: " + x;

      case RegExp:
        return "RegExp: " + x;

      case List:
        return "List: " + x;
    }
}

function type(o) {
    var c, t, n;
    if (o === null) return "null";
    if (o !== o) return "nan";
    if ((t = typeof o) !== "object") return t;
    if ((c = classOf(o)) !== "Object") return c;
    if (n = o.constructor.getName()) return n;
    return "Object";
}

function classOf(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}

Function.prototype.getName = function() {
    if ("name" in this) return this.name;
    return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
};

function quacks(o) {
    for (var i = 1; i <= arguments.length - 1; i++) {
        var arg = arguments[i];
        switch (typeof arg) {
          case "string":
            if (o[arg] !== "function") return false;
            continue;

          case "function":
            arg = arg.prototype;

          case "object":
            for (var j in arg) {
                if (typeof arg[j] !== "function") continue;
                if (typeof o[j] !== "function") return false;
            }
        }
    }
    return true;
}

(function() {
    var container = get("#container"), cHeight = container.clientHeight;
    if (screen.availHeight) {
        var m = (screen.availHeight - cHeight) / 6;
        css(container, {
            marginTop: m + "px"
        });
    }
})();

function xhr() {
    if (window.XMLHttpRequest === undefined) {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        } catch (e1) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (e2) {
                throw new Error("XMLHttpRequest doesn't support");
            }
        }
    } else {
        return new XMLHttpRequest();
    }
}

function isString(str) {
    if (typeof str !== "string") throw new TypeError("Incoming parameter is not an object. It is " + typeof str);
}

function parseToArr(str) {
    isString(str);
    var arr = [];
    for (i = 0; i < str.length - 1; i++) {
        if (str[i] !== " " && typeof parseInt(str[i]) === "number") {
            arr.push(!!parseInt(str[i]));
        }
    }
    return arr;
}

function getArr(str) {
    isString(str);
    var arr = [], p = 0, n = 1;
    while (n > 0) {
        n = str.indexOf(",", n);
        n += 1;
        if (n !== 0) {
            arr.push(str.slice(p, n - 1));
        } else {
            arr.push(str.slice(p, str.length));
        }
        p = n;
    }
    return arr;
}

function parseLogic(arr) {
    if (!arr) throw new TypeError("Incoming parameter is not an object. It is " + typeof arr);
    var obj = {}, logicName, logicValue;
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        logicName = str.slice(0, str.indexOf("-") - 1);
        logicValue = str.slice(str.indexOf("-") + 2);
        obj[i] = {};
        obj[i].name = logicName;
        obj[i].value = logicValue;
    }
    return obj;
}

function count(i) {
    i == undefined ? i = 0 : i;
    return function() {
        return i++;
    };
}

var counter = count(1);

function setCookies(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    if (typeof daysToLive === "number") {
        cookie += "; max-age=" + daysToLive * 60 * 60 * 24;
    }
    document.cookie = cookie;
}

function getCookies() {
    var cookies = {};
    var all = document.cookie;
    if (all === "") return cookies;
    var list = all.split("; ");
    for (var i = 0; i <= list.length - 1; i++) {
        var cookie = list[i];
        var p = cookie.indexOf("=");
        var name = cookie.slice(0, p);
        var value = cookie.slice(p + 1);
        value = decodeURIComponent(value);
        cookies[name] = value;
    }
    return cookies;
}

function deleteCookies(name) {
    document.cookie = name + "=" + "; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}

function toHTMLView(obj) {
    if (typeof obj !== "object" && classOf(obj) !== "Array") throw new TypeError("Incoming parameter doesn't have 'object' type");
    var layout = get(".ready-algorithm")[0], title = layout.getChildren().getChildren();
    var arr = obj.map(function(x, i, a) {
        var clone = layout.cloneNode(true), cloneTitle = clone.getChildren().getChildren();
        clone.removeAttribute("hidden");
        clone.id = "";
        clone.className = clone.className.slice(0, clone.className.lastIndexOf("-") + 1) + counter();
        if (cloneTitle[0]) {
            cloneTitle[0].replaceText(x);
        }
        var existingScripts = [ "all.js", "yandex" ];
        if (cloneTitle[0]) {
            if (cloneTitle[0].innerText !== "Вы ещё не загрузили ни один алгоритм") {
                clone.onclick = function() {
                    var isActive = get("#active-algorithm");
                    if (isActive) {
                        isActive.id = "";
                    }
                    this.id = "active-algorithm";
                    var scripts = document.getElementsByTagName("script");
                    for (var h = 0; h <= scripts.length - 1; h++) {
                        var condition = scripts[h].src.indexOf(existingScripts[0]) + 1 || scripts[h].src.indexOf(existingScripts[1]) + 1;
                        if (!condition) {
                            scripts[h].remove();
                        }
                    }
                    var script = document.createElement("script"), link = cloneTitle[0].innerText, path = "js/algorithms/";
                    script.src = path + link;
                    document.body.appendChild(script);
                };
            }
        }
        return clone;
    });
    var parent = get(".algorithms")[0];
    arr.forEach(function(x, i, a) {
        parent.appendChild(x);
    });
}

function sleep(element, styles, time) {
    if (!styles && !time) {
        setTimeout(function() {
            css(element, css({
                opacity: 0
            }));
        }, 300);
    }
    setTimeout(function() {
        css(element, styles);
    }, time);
}

function awake(element, styles, time) {
    if (!styles && !time) {
        setTimeout(function() {
            css(element, css({
                opacity: 1
            }));
        }, 300);
    }
    setTimeout(function() {
        css(element, styles);
    }, time);
}

function isCorrect(el, type) {
    if (!(classOf(el) === type)) throw new TypeError("Incoming parameter does not belong to '" + type + "' class!"); else return true;
}

function replaceInSleep(element, str, time) {
    isCorrect(str, "String");
    setTimeout(function() {
        if (element.value) {
            element.value = str;
        } else {
            element.replaceText(str);
        }
    }, time);
    return true;
}

function addFiles(s) {
    if (!(classOf(s) === "XMLHttpRequest")) throw new TypeError("Incoming parameter is not an 'XMLHttpRequest' object!");
    try {
        if (s.responseText) {
            var answer = JSON.parse(s.responseText);
            if (!answer.length) {
                answer.push("Вы ещё не загрузили ни один алгоритм");
            }
            var toURIView = encodeURIComponent(answer);
            if (toURIView !== getCookies().answer) {
                deleteCookies();
                setCookies("answer", answer, 1);
            }
            var resultCookies = getCookies();
            var cookiesArr = getArr(resultCookies.answer);
            if (arguments[1]) {
                var exist = arguments[1];
                for (var k in exist) {
                    if (exist[k] === "exists") {
                        delete cookiesArr[k];
                    }
                }
            }
            toHTMLView(cookiesArr);
        }
    } catch (e) {
        console.log(e);
    }
}

function removeNotExisting(s) {
    if (!(classOf(s) === "XMLHttpRequest")) throw new TypeError("Incoming parameter is not an 'XMLHttpRequest' object!");
    try {
        if (s.responseText) {
            var exist = get(".ready-algorithm"), choosenFiles = get("#upload-file"), each = Array.prototype.forEach, parts = [], titles = [], c = count(1), answer = JSON.parse(s.responseText);
            each.call(exist, function(x, i, a) {
                parts.push(get(".algorithm-" + c()));
                var part = parts[i];
                for (var p in part) {
                    if (part.hasOwnProperty(p)) {
                        if (p !== "length") {
                            var title = part[p].getChildren().getChildren();
                        }
                        for (var j in title) {
                            if (title.hasOwnProperty(j)) {
                                titles.push(title[j]);
                            }
                        }
                    }
                }
            });
            each.call(choosenFiles.files, function(x, i, a) {
                var name = x.name;
                for (var n in titles) {
                    if (titles[n].innerText === name) {
                        for (var t in answer) {
                            if (answer[t] === name) {
                                answer[t] = "exists";
                            }
                        }
                    } else if (titles[n].innerText === "Вы ещё не загрузили ни один алгоритм") {
                        titles[n].parentNode.parentNode.remove();
                        counter = count(1);
                    }
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
    return answer;
}

function check(x, i, a) {
    x.onclick = function() {
        var len = self.list.length;
        var isActive = get("#active-algorithm");
        isActive.id = "";
        this.id = "active-algorithm";
    };
}

function iHide(place, txt) {
    if (typeof txt !== "string") throw new TypeError("Incoming arguments is not a string");
    if (typeof place !== "object") throw new TypeError("Incoming arguments is not an object");
    var wraps = document.createElement("div"), snow = document.createElement("div"), close = document.createElement("input"), par = document.createElement("p");
    wraps.className = "snow-wrapper";
    snow.className = "snow";
    close.className = snow.className + "-close-it";
    par.className = "snow-paragraph span-10 offset-5";
    close.type = "button";
    close.value = "Отменить";
    close.onclick = function() {
        removeBody(".snow-wrapper");
    };
    css(wraps, {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        borderTop: "3px solid #90ee90"
    });
    css(snow, {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        background: "white",
        opacity: "0.7",
        "-webkit-filter": "blur(10px)"
    });
    close.appendChild(document.createTextNode("закрыть"));
    txt = document.createTextNode(txt);
    place.parentOf(wraps.parentOf(snow, close, par.parentOf(txt)));
    return 1;
}

function removeBody(element) {
    var snowball = get(element);
    if (snowball.length) {
        css(snowball[0], {
            opacity: 0
        });
        setTimeout(function() {
            snowball[0].remove();
        }, 300);
    }
}

Array.prototype.findByClass = function(cls) {
    isCorrect(this, "Array") && isCorrect(cls, "String");
    var tmpArr = [];
    for (var i in this) {
        if (typeof this[i] !== "function") {
            if (this.hasOwnProperty(i)) {
                if (this[i].className.indexOf(cls) + 1) {
                    tmpArr.push(this[i]);
                }
            }
        }
    }
    return tmpArr;
};

function drawCircle(can, x, y, r, s, e, sc, fc, lw, tx) {
    can.beginPath();
    can.arc(x, y, r, s, e);
    can.lineWidth = lw;
    if (sc && fc) {
        can.fillStyle = fc;
        can.strokeStyle = sc;
        can.stroke();
        can.fill();
    } else if (sc) {
        can.strokeStyle = sc;
        can.stroke();
    } else if (fc) {
        can.fillStyle = fc;
        can.fill();
    }
    if (tx) {
        can.font = "18px Tahoma";
        can.fillStyle = fc || sc;
        can.textAlign = "left";
        can.fillText(tx, x, y);
    }
}

function drawText(p, c, f, t) {
    p.beginPath();
    p.fillStyle = c;
    p.font = f;
    var width = p.measureText(t.length).width, height = p.measureText("w").width;
    p.fillText(t.length, t[0].base.x - width / 2, t[0].base.y + height / 2);
}

function random(a, b) {
    return Math.abs(Math.floor(Math.random() * b - a));
}

function even(a) {
    if (a % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

function summ(a, b) {
    return a + b;
}

function getDistance(start, end) {
    isCorrect(start, "Array");
    isCorrect(end, "Array");
    var x = end[0] - start[0], y = end[1] - start[1];
    var doubleX = Math.pow(x, 2), doubleY = Math.pow(y, 2);
    if (arguments.length === 2) {
        return parseInt(Math.sqrt(doubleX + doubleY).toFixed(arguments[arguments.length - 1]));
    } else {
        return Math.sqrt(doubleX + doubleY);
    }
}

(function() {
    function List(elements) {
        if (typeof elements !== "object") throw new TypeError("Incoming arguments is not an object");
        for (var i in elements) {
            if (typeof elements[i] !== "string") {
                this[i] = elements[i];
            } else {
                this[i] = get(elements[i]);
            }
        }
    }
    List.prototype.active = function() {
        if (this.list) {
            var self = this;
            if (this.list instanceof Array) {
                this.list.forEach(check);
            } else {
                Array.prototype.forEach.call(this.list, check);
            }
        }
    };
    List.prototype.toServer = function(file) {
        var form = get("#upload-form"), self = this;
        function sendForm(form) {
            var formData = new FormData(form);
            var request = xhr();
            request.open("POST", form.action, true);
            request.onload = function(e) {
                if (this.readyState === 4 && this.status === 200) {
                    addFiles(this, removeNotExisting(this));
                }
            };
            request.send(formData);
            return false;
        }
        sendForm(form);
    };
    List.prototype.file = function() {
        var self = this;
        this.button.onchange = function() {
            self.file = this.files[0];
            self.toServer();
            var fn = [];
            Array.prototype.forEach.call(this.files, function(x, i, a) {
                fn.push(x.name);
            });
            var fileBlock = self.fileName[0];
            css(fileBlock, {
                opacity: 0
            });
            setTimeout(function() {
                if (fn.length >= 2) {
                    fn = " Алгоритмы были загружены";
                } else {
                    fn = "Алгоритм " + fn[0] + " был загружен";
                }
                fileBlock.replaceText(fn);
                css(fileBlock, {
                    opacity: 1,
                    color: "#336f94"
                });
                fileBlock.className = fileBlock.className + " chose";
            }, self.transitions);
            sleep(fileBlock, {
                opacity: 0
            }, self.transitions * 5);
            setTimeout(function() {
                css(fileBlock, {
                    opacity: 0,
                    color: "rgba(108,104,116, 0.5)"
                });
                fileBlock.className = fileBlock.className.slice(0, fileBlock.className.lastIndexOf(" "));
                fileBlock.replaceText("Загружать только файлы с расширением '.js'!");
            }, self.transitions * 6);
            sleep(fileBlock, {
                opacity: 1
            }, self.transitions * 6);
        };
    };
    var loadingList = new List({
        section: "#loading-scripts",
        list: ".ready-algorithm",
        button: "#upload-file",
        fileName: ".file-name",
        transitions: 300,
        timeOffset: 100
    });
    loadingList.active();
    loadingList.file();
})();

(function() {
    var doc = get(document), moment = Date.now(), momentLater;
    doc.addEventListener("DOMContentLoaded", function() {
        momentLater = Date.now();
        moment = (momentLater - moment) / (1e3 * 60);
        var request = xhr(), formData = new FormData(), algorithms = get(".ready-algorithm"), each = Array.prototype.forEach, names = [];
        formData.append("load", "true");
        request.open("POST", "/search", true);
        request.onload = function(e) {
            if (this.readyState === 4 && this.status === 200) {
                addFiles(this);
            }
        };
        request.send(formData);
        return false;
    });
})();

(function() {
    var hardInput = get(".hard-drone-amount"), middleInput = get(".middle-drone-amount"), lightInput = get(".light-drone-amount"), each = Array.prototype.forEach, counting = count(0);
    var inputs = [ hardInput, middleInput, lightInput ], allInputs = [], am = 0;
    for (var j = 0; j <= inputs.length - 1; j++) {
        for (var k = 0; k <= inputs[j].length - 1; k++) {
            allInputs[am++] = inputs[j][k];
        }
    }
    for (var k = 0; k <= inputs.length - 1; k++) {
        each.call(inputs[k], function(x, i, a) {
            x.onchange = function() {
                numberMask(this);
            };
            x.onkeyup = function() {
                var amount = get(".planes-amount")[0], maxValue = parseInt(amount.innerText), currentValue = parseInt(this.value), allValues = 0, earlier = 0, self = this, time = 0;
                each.call(allInputs, function(x, i, a) {
                    if (x !== self) {
                        if (x.value) {
                            allValues += parseInt(x.value);
                        }
                    }
                });
                earlier = currentValue;
                currentValue += allValues;
                if (currentValue > maxValue) {
                    this.value = "";
                    this.placeholder = "БПЛА осталось: " + (maxValue - allValues);
                    css(this, {
                        border: "1px solid red"
                    });
                    var interval = setInterval(function() {
                        if (time >= 900) {
                            clearInterval(interval);
                        }
                        css(self, {
                            border: "1px solid transparent"
                        });
                        setTimeout(function() {
                            css(self, {
                                border: "1px solid red"
                            });
                        }, 300);
                        time += 300;
                    }, 300);
                } else {
                    this.placeholder = "Количество БПЛА.";
                }
                if (currentValue === maxValue) {
                    var c = counting();
                    if (c < 1) {
                        var drones = getDronesData();
                        toPage(drones);
                        parseDrones(drones);
                    }
                }
                return numberMask(this);
            };
            x.onfocus = function() {
                css(this, {
                    border: "1px solid #778899"
                });
            };
        });
    }
})();

function getDronesData() {
    var toParse = [ get(".hard-drone-amount"), get(".middle-drone-amount"), get(".light-drone-amount") ];
    var dronesData = [], each = Array.prototype.forEach;
    each.call(toParse, function(x, i, a) {
        each.call(x, function(y, j, b) {
            if (y.value) {
                var iParent = y.parentNode, droneName = "";
                iParent = iParent.getChildren();
                for (var m in iParent) {
                    if (typeof iParent[m] !== "function") {
                        if (iParent.hasOwnProperty(m)) {
                            var child = iParent[m];
                            if (child.className.indexOf("drone-name") + 1) {
                                droneName = child.innerText;
                            }
                        }
                    }
                }
                var classes = y.cutClassTo("-", true);
                classes = classes.slice(classes.indexOf("2") + 2);
                var grandma = y.parentNode.parentNode, specifications = {}, greatGrandson = grandma.getChildren().getChildren().getChildren(), grandchildren = [];
                for (var t in greatGrandson) {
                    if (typeof greatGrandson[t] !== "function") {
                        if (greatGrandson.hasOwnProperty(t)) {
                            if (greatGrandson[t].localName === "article") {
                                grandchildren.push(greatGrandson[t]);
                            }
                        }
                    }
                }
                var values = grandchildren.getChildren().findByClass("chars-values");
                grandchildren.forEach(function(z, q, c) {
                    var tempClass = z.className;
                    tempClass = tempClass.slice(tempClass.lastIndexOf(" ") + 1, tempClass.lastIndexOf("-"));
                    specifications[tempClass] = parseInt(values[q].innerText);
                });
                var a = parseInt(y.value), clr = [];
                for (var c = 0; c <= a - 1; c++) {
                    clr.push(colorIs(30, 200));
                }
                dronesData.push({
                    name: droneName,
                    type: classes,
                    amount: a,
                    specification: specifications,
                    colors: clr
                });
            }
        });
    });
    return dronesData;
}

function numberMask(obj) {
    obj.value = obj.value.replace(/[^\d]/g, "");
}

function colorIs(from, to) {
    var r = Math.abs(Math.floor(Math.random() * to - from)), b = Math.abs(Math.floor(Math.random() * to - from)), g = Math.abs(Math.floor(Math.random() * to - from)), o = .7;
    return "rgba(" + r + ", " + b + ", " + g + ", " + o + ")";
}

function toPage(obj) {
    isCorrect(obj, "Array");
    var c = count(1), counter = c();
    var types = {
        "hard-drone": "Тяжелый БПЛА",
        "middle-drone": "Средний БПЛА",
        "light-drone": "Лёгкий БПЛА"
    }, each = Array.prototype.forEach, section = document.createElement("section"), close = document.createElement("input"), subsection = document.createElement("section"), head = document.createElement("header"), headH1 = document.createElement("h1"), h1Text = document.createTextNode("Беспилотники на месте базирования!"), planesBlock = get("#planes-section"), planesParent = planesBlock.parentNode;
    section.id = "drones-colors";
    section.className = "span-18 offset-1";
    subsection.id = "drones-subsection-colors";
    subsection.className = "span-20";
    close.type = "button";
    close.id = "close-" + section.id;
    close.className = "span-10 offset-5";
    head.className = "span-20 color-header";
    section.parentOf(head.parentOf(headH1.parentOf(h1Text)));
    for (var i = 0; i <= obj.length - 1; i++) {
        var aDrone = obj[i];
        for (var j = 0; j <= aDrone.amount - 1; j++) {
            var article = document.createElement("article"), header = document.createElement("header"), h2 = document.createElement("h2"), h5 = document.createElement("h5"), div = document.createElement("div"), droneName = document.createTextNode(aDrone.name), control = get("#control-additional");
            for (var q in types) {
                if (q === aDrone.type) {
                    var droneType = document.createTextNode(types[q]);
                }
            }
            article.className = "drones-information drone-info-" + counter;
            header.className = "drone-info-headers";
            div.className = "drone-trace trace-" + counter;
            css(article, {
                width: "13.5%",
                "float": "left",
                marginTop: "2%"
            });
            css(div, {
                backgroundColor: aDrone.colors[j],
                height: "6px",
                width: "18px",
                margin: "0 auto"
            });
            subsection.parentOf(article.parentOf(div, header.parentOf(h5.parentOf(droneType), h2.parentOf(droneName))));
            counter = c();
            control.insertBefore(section.parentOf(subsection), planesBlock);
        }
    }
}

function parseDrones(obj, callback) {
    isCorrect(obj, "Array");
    var tempObj = [], band = new Planes();
    for (var i = 0; i <= obj.length - 1; i++) {
        var current = obj[i];
        for (var j = 0; j <= current.amount - 1; j++) {
            var props = {};
            for (var k in current) {
                if (k === "amount") {
                    continue;
                } else if (k === "colors") {
                    props[k] = current[k][j];
                } else {
                    props[k] = current[k];
                }
            }
            props.iAm = j + 1;
            tempObj.push(props);
        }
    }
    Planes.prototype.all = tempObj;
    band.initialize();
}

(function() {
    var hardButtons = get(".hard-drone-hide"), hardContent = get(".chars"), each = Array.prototype.forEach;
    each.call(hardButtons, function(x, i, a) {
        x.onclick = function() {
            console.log(hardContent[i].id);
            if (hardContent[i].id === "active") {
                hardContent[i].id = "";
            } else {
                hardContent[i].id = "active";
            }
        };
    });
    var middleButtons = get(".middle-drone-hide"), middleContent = get(".chars"), slicy = Array.prototype.slice;
    middleContent = slicy.call(middleContent, hardButtons.length);
    each.call(middleButtons, function(x, i, a) {
        x.onclick = function() {
            if (middleContent[i].id === "active") {
                middleContent[i].id = "";
            } else {
                middleContent[i].id = "active";
            }
        };
    });
    var lightButtons = get(".light-drone-hide"), lightContent = get(".chars");
    lightContent = slicy.call(lightContent, hardButtons.length + middleButtons.length);
    each.call(lightButtons, function(x, i, a) {
        x.onclick = function() {
            if (lightContent[i].id === "active") {
                lightContent[i].id = "";
            } else {
                lightContent[i].id = "active";
            }
        };
    });
})();

function MapInteraction(elements) {
    if (elements === undefined) {
        elements = {};
    }
    if (typeof elements !== "object") throw new TypeError("Incoming arguments is not an object");
    for (var i in elements) {
        if (typeof elements[i] !== "string") {
            this[i] = elements[i];
        } else {
            this[i] = get(elements[i]);
        }
    }
}

MapInteraction.prototype.setDotes = function() {
    var self = this, oldDotesAmount = parseInt(self.dotes.amount.innerText);
    var counter = count(1);
    self.dotes.button.onclick = function() {
        var snowball = get(".snow"), dotesAmount = self.dotes.amount.innerText, ending = "";
        dotesAmount > 1 ? ending = " точечных целей!" : ending = " точечную цель!";
        if (!snowball.length) {
            iHide(self.panel, "Кликните на карту и определите " + dotesAmount + ending);
        }
        var wasChanged = false;
        myMap.events.add("click", installDotes);
        var interval = setInterval(function() {
            if (wasChanged) {
                clearInterval(interval);
                myMap.events.remove("click", installDotes);
            }
        }, 10);
        function installDotes(e) {
            var updatedDotesAmount = parseInt(self.dotes.amount.innerText);
            if (dotesTargets.get(updatedDotesAmount - 1)) {
                self.dotesCoordinates.length = 0;
                dotesTargets.removeAll();
                counter = count(1);
            }
            var coords = e.get("coords");
            var coords = e.get("coords"), lon = get(".lon-base"), lat = get(".lat-base"), closeSnow = get(".snow-close-it")[0], par = get(".snow-paragraph")[0];
            if (closeSnow && par && self.dotesCoordinates.length + 1 === parseInt(self.dotes.amount.innerText)) {
                css(closeSnow, {
                    opacity: 0
                });
                css(par, {
                    opacity: 0
                });
                closeSnow.className = closeSnow.className + " confirm-base";
                replaceInSleep(closeSnow, "Подтвердить", 300);
                replaceInSleep(par, "Установка базы произошла успешно, командир!", 300);
                css(closeSnow, {
                    top: "20%"
                });
                awake(closeSnow);
                awake(par);
                wasChanged = true;
            }
            var baloon = myMap.geoObjects;
            var placemark = new ymaps.Placemark([ coords[0], coords[1] ], {
                iconContent: counter() + "D.",
                balloonContent: "<strong> Точечные цели </strong>"
            }, {
                preset: "islands#circleIcon",
                iconColor: "red"
            });
            dotesTargets.add(placemark);
            self.dotesCoordinates.push(placemark);
            baloon.add(dotesTargets);
        }
    };
};

MapInteraction.prototype.setBase = function() {
    var self = this;
    this.button.onclick = function() {
        var snowball = get(".snow");
        if (!snowball.length) {
            iHide(self.panel, "Кликните на карту и выбирете место базирования");
        }
        var wasChanged = false;
        myMap.events.add("click", getCenter);
        var interval = setInterval(function() {
            if (wasChanged) {
                clearInterval(interval);
                myMap.events.remove("click", getCenter);
            }
        }, 10);
        function getCenter(e) {
            if (self.baseBalloon.length) {
                myCollection.remove(myCollection.get(0));
            }
            var coords = e.get("coords"), lon = get(".lon-base"), lat = get(".lat-base"), closeSnow = get(".snow-close-it")[0], par = get(".snow-paragraph")[0];
            if (closeSnow && par) {
                css(closeSnow, {
                    opacity: 0
                });
                css(par, {
                    opacity: 0
                });
                closeSnow.className = closeSnow.className + " confirm-base";
                replaceInSleep(closeSnow, "Подтвердить", 300);
                replaceInSleep(par, "Установка базы произошла успешно, командир!", 300);
                css(closeSnow, {
                    top: "20%"
                });
                awake(closeSnow);
                awake(par);
                wasChanged = true;
            }
            var baloon = myMap.geoObjects;
            var placemark = new ymaps.Placemark([ coords[0], coords[1] ], {
                iconContent: "B",
                balloonContent: "<strong> Место базирования </strong>"
            }, {
                preset: "islands#circleIcon",
                iconColor: "#336f94"
            });
            myCollection.add(placemark);
            self.baseBalloon.push(placemark);
            baloon.add(myCollection);
            lon[0].replaceText(coords[0].toPrecision(6));
            lat[0].replaceText(coords[1].toPrecision(6));
            if (lat[0].className.indexOf("not-choosen") && lon[0].className.indexOf("not-choosen")) {
                lon[0].className = lon[0].cutClassTo("not-choosen") + "choosen-base";
                lat[0].className = lat[0].cutClassTo("not-choosen") + "choosen-base";
            }
            for (var i = 0; i <= coords.length - 1; i++) {
                self.baseCoordinates.push(coords[i]);
            }
        }
    };
};

MapInteraction.prototype.canvas = {};

MapInteraction.prototype.canvas.setBase = function(sample) {
    var polygon = sample.canvasMap.getContext("2d");
    sample.base.button.onclick = function() {
        var x = sample.base.coordinates.x, y = sample.base.coordinates.y, r = sample.base.radius, d = r * 2 * 2;
        var snowball = get(".snow"), dotesAmount = sample.dotes.amount.innerText, ending = "";
        dotesAmount > 1 ? ending = " точечных целей!" : ending = " точечную цель!";
        if (!snowball.length) {
            iHide(sample.panel, "Кликните на карту и определите место базирования беспилотников");
        }
        sample.canvasMap.onmousemove = function(e) {
            this.onclick = function() {
                if (x && y) {
                    polygon.clearRect(x - d, y - d, d * 2, d * 2);
                }
                var offset = sample.canvasMap.getBoundingClientRect(), x0 = e.clientX - offset.left, y0 = e.clientY - offset.top, r = 6, startAngle = 0, endAngle = 2 * Math.PI, color = "rgba(93, 138, 168, 1)";
                drawCircle(polygon, x0, y0, r, startAngle, endAngle, 0, color, 2);
                drawCircle(polygon, x0, y0, r + 6, startAngle, endAngle, color, 0, 2);
                MapInteraction.prototype.baseCoordinates = {
                    x: x0,
                    y: y0
                };
                sample.canvasMap.onmousemove = null;
                var closeSnow = get(".snow-close-it")[0], par = get(".snow-paragraph")[0];
                css(closeSnow, {
                    opacity: 0
                });
                css(par, {
                    opacity: 0
                });
                closeSnow.className = closeSnow.className + " confirm-base";
                replaceInSleep(closeSnow, "Подтвердить", 300);
                replaceInSleep(par, "Установка базы произошла успешно!", 300);
                css(closeSnow, {
                    top: "20%"
                });
                awake(closeSnow);
                awake(par);
                sample.canvasMap.onclick = null;
                MapInteraction.prototype.baseCoordinates.x = x0;
                MapInteraction.prototype.baseCoordinates.y = y0;
                MapInteraction.prototype.baseRadius = r;
                var values = sample.base.values;
                values.xV.replaceText(x0.toString());
                values.yV.replaceText(y0.toString());
                var drones = get(".drones")[0], styles = window.getComputedStyle(drones);
                if (styles.display === "none") {
                    css(drones, {
                        display: "block"
                    });
                }
                for (var i in values) {
                    values[i].className = values[i].cutClassTo("not-choosen") + "choosen";
                }
            };
        };
    };
};

MapInteraction.prototype.canvas.createPolygons = function(sample) {
    var mainPolygon = get("#polygon"), control = get("#controls"), controlParent = control.parentNode, each = Array.prototype.forEach, dotesAmount = parseInt(get(".dotes-amount")[0].innerText), trajectoryAmount = parseInt(get(".trajectory-amount")[0].innerText), areaAmount = parseInt(get(".area-amount")[0].innerText), amount = [ {
        dotes: dotesAmount
    }, {
        trajectory: trajectoryAmount
    }, {
        area: areaAmount
    } ], canvases = [], groups = [], max = -Infinity, inds = 5;
    amount.forEach(function(x, i, a) {
        for (var e in x) {
            if (x.hasOwnProperty(e)) {
                if (x[e] >= max) {
                    max = x[e];
                }
            }
        }
    });
    amount.forEach(function(x, i, a) {
        for (var p in x) {
            if (x.hasOwnProperty(p)) {
                var arr = [];
                for (var j = 0; j <= x[p] - 1; j++) {
                    var polygon = document.createElement("canvas");
                    polygon.width = mainPolygon.width;
                    polygon.height = mainPolygon.height;
                    polygon.id = j + 1 + p.slice(0, 1).toUpperCase();
                    polygon.className = p + "-polygon";
                    css(polygon, {
                        zIndex: inds += 1
                    });
                    arr.push(polygon);
                }
                groups.push(p);
                canvases.push(arr);
            }
        }
    });
    groups.forEach(function(x, i, a) {
        var existed = get("." + x + "-polygons"), elements = get("." + x + "-polygon");
        console.log(x);
        if (existed.length) {
            if (amount[i][x] <= elements.length) {
                existed[0].remove();
                var group = document.createElement("div");
                group.className = x + "-polygons common-polygons";
                for (var t in canvases) {
                    if (canvases.hasOwnProperty(t)) {
                        if (t === x) {
                            var can = canvases[t];
                            group.appendChild(can);
                        }
                    }
                }
                controlParent.insertBefore(group, control);
            } else {}
        }
    });
    canvases.forEach(function(x, i, a) {
        var group = document.createElement("div");
        group.className = groups[i] + "-polygons common-polygons";
        x.forEach(function(y, j, b) {
            group.appendChild(y);
        });
        controlParent.insertBefore(group, control);
    });
};

MapInteraction.prototype.canvas.setDotes = function(sample) {
    var mainPolygon = get("#polygon"), polygon = sample.canvasMap.getContext("2d"), counter = count(1);
    sample.dotes.button.onclick = function() {
        var amount = parseInt(sample.dotes.amount.innerText), dotesLen = sample.dotesCoordinates.length, r = sample.dotes.radius, d = r * 2 * 2;
        if (amount <= dotesLen - 1) {
            var coords = sample.dotesCoordinates;
            for (var i = 0; i <= coords.length - 1; i++) {
                polygon.clearRect(coords[i].x - d * 2 * 2, coords[i].y - d * 2 * 2.65, d * 2 * 2 * 5, d * 2 * 2 * 2);
            }
            counter = count(1);
            coords.length = 0;
        }
        var snowball = get(".snow"), dotesAmount = sample.dotes.amount.innerText, color = "rgba(255,64,64, 1)", ending = "";
        dotesAmount > 1 ? ending = " точечных целей!" : ending = " точечную цель!";
        if (!snowball.length) {
            iHide(sample.panel, "Кликните на карту и определите " + amount + ending);
        }
        sample.canvasMap.onmousemove = function(e) {
            this.onclick = function() {
                var len = sample.dotesCoordinates.length;
                var offset = sample.canvasMap.getBoundingClientRect(), x0 = e.clientX - offset.left, y0 = e.clientY - offset.top, startAngle = 0, endAngle = 2 * Math.PI, val = counter();
                drawCircle(polygon, x0, y0, r, startAngle, endAngle, 0, color, 2, "  " + val + "D");
                drawCircle(polygon, x0, y0, r + 6, startAngle, endAngle, color, 0, 2, 0);
                MapInteraction.prototype.dotesCoordinates.push({
                    name: val + "D",
                    x: x0,
                    y: y0
                });
                if (len + 1 === amount) {
                    var closeSnow = get(".snow-close-it")[0], par = get(".snow-paragraph")[0];
                    css(closeSnow, {
                        opacity: 0
                    });
                    css(par, {
                        opacity: 0
                    });
                    closeSnow.className = closeSnow.className + " confirm-base";
                    replaceInSleep(closeSnow, "Подтвердить", 300);
                    replaceInSleep(par, "Задание целей произошло успешно!", 300);
                    css(closeSnow, {
                        top: "20%"
                    });
                    awake(closeSnow);
                    awake(par);
                    sample.canvasMap.onmousemove = null;
                    sample.canvasMap.onclick = null;
                    addToTable(sample);
                    sample.computeDistance("dotes");
                }
            };
        };
    };
    function addToTable(s) {
        var existedDotes = s.dotesCoordinates, clones = [];
        for (var j = 0; j <= existedDotes.length - 1; j++) {
            var dotesRow = get(".dotes-coords-row")[0], dotesClone = dotesRow.cloneNode(true);
            dotesClone.className = dotesClone.cutClassTo("-", true) + "-" + (j + 1);
            var children = dotesClone.getChildren();
            for (var i = 1; i <= children.length - 1; i++) {
                children[i].className = children[i].cutClassTo("not-choosen", true);
                children[i].className = children[i].cutClassTo("-", true);
                children[i].className += "-" + (j + 1) + " choosen";
                children[0].replaceText(j + 1 + "D.");
            }
            children[1].replaceText(s.dotesCoordinates[j].x.toString());
            children[2].replaceText(s.dotesCoordinates[j].y.toString());
            clones.push(dotesClone);
        }
        var tbody = get(".dotes-body")[0], tbodyChildren = tbody.getChildren();
        for (var b = 0; b <= tbodyChildren.length - 1; b++) {
            tbodyChildren[b].remove();
        }
        for (var k = 0; k <= clones.length - 1; k++) {
            tbody.parentOf(clones[k]);
        }
        return true;
    }
};

MapInteraction.prototype.canvas.setTrajectory = function(sample) {
    var polygon = sample.canvasMap.getContext("2d"), r = sample.trajectory.radius, d = r * 2 * 2;
    var counter = count(1), evenCounter = count(0), dotesID = count(1), evDotes = dotesID();
    var lineCoords = [];
    sample.trajectory.button.onclick = function() {
        var snowball = get(".snow"), ending = "", amount = parseInt(sample.trajectory.amount.innerText), trajectoryLen = sample.trajectoryCoordinates.length;
        amount > 1 ? ending = " траекторных целей!" : ending = " тректорную цель!";
        if (!snowball.length) {
            iHide(sample.panel, "Кликните на карту и определите " + amount + ending);
        }
        if (amount <= trajectoryLen) {
            var coords = sample.trajectoryCoordinates;
            for (var i = 0; i <= coords.length - 1; i++) {
                coordinate = coords[i];
                var xc1 = coordinate[0].x, yc1 = coordinate[0].y, xc2 = coordinate[1].x, yc2 = coordinate[1].y;
                polygon.clearRect(xc1 - d * 2 * 2, yc1 - d * 2 * 2.65, d * 2 * 2 * 5, d * 2 * 2 * 2);
                polygon.clearRect(xc2 - d * 2 * 2, yc2 - d * 2 * 2.65, d * 2 * 2 * 5, d * 2 * 2 * 2);
                polygon.clearRect(xc1, yc1, xc2 - xc1, yc2 - yc1);
            }
            counter = count(1);
            evenCounter = count(0);
            dotesID = count(1);
            evDotes = dotesID();
            coords.length = 0;
        }
        sample.canvasMap.onmousemove = function(e) {
            this.onclick = function() {
                var offset = sample.canvasMap.getBoundingClientRect(), x0 = e.clientX - offset.left, y0 = e.clientY - offset.top, color = "rgba(73, 121, 107, 1)", startAngle = 0, endAngle = 2 * Math.PI;
                lineCoords.push({
                    x: x0,
                    y: y0
                });
                var ev = evenCounter();
                if (ev === 1) {
                    evenCounter = count(0);
                    MapInteraction.prototype.trajectoryCoordinates.push(lineCoords);
                    var x1 = lineCoords[0].x, y1 = lineCoords[0].y, x2 = lineCoords[1].x, y2 = lineCoords[1].y;
                    polygon.beginPath();
                    polygon.moveTo(x1, y1);
                    polygon.lineTo(x2, y2);
                    polygon.strokeStyle = "rgba(73, 121, 107, .5)";
                    polygon.stroke();
                    lineCoords = [];
                    if (sample.trajectoryCoordinates.length === amount) {
                        var closeSnow = get(".snow-close-it")[0], par = get(".snow-paragraph")[0];
                        css(closeSnow, {
                            opacity: 0
                        });
                        css(par, {
                            opacity: 0
                        });
                        closeSnow.className = closeSnow.className + " confirm-base";
                        replaceInSleep(closeSnow, "Подтвердить", 300);
                        replaceInSleep(par, "Задание целей произошло успешно!", 300);
                        css(closeSnow, {
                            top: "20%"
                        });
                        awake(closeSnow);
                        awake(par);
                        sample.canvasMap.onmousemove = null;
                        sample.canvasMap.onclick = null;
                        addToTrajectoryTable(sample);
                        sample.computeDistance("trajectory");
                    }
                }
                drawCircle(polygon, x0, y0, r + 2, startAngle, endAngle, 0, color, 2, "  " + evDotes + "T." + counter());
                if (ev === 1) {
                    evDotes = dotesID();
                    counter = count(1);
                }
            };
        };
    };
    function addToTrajectoryTable(s) {
        var existedTrajectory = s.trajectoryCoordinates, clones = [];
        for (var j = 0; j <= existedTrajectory.length - 1; j++) {
            var element = existedTrajectory[j];
            for (var l = 0; l <= element.length - 1; l++) {
                var trajectoryRow = get(".trajectory-coords-row")[0], trajectoryClone = trajectoryRow.cloneNode(true);
                trajectoryClone.className = trajectoryClone.cutClassTo("coordinate-1", true) + "coordinate-" + (j + 1) + "-" + (l + 1);
                var children = trajectoryClone.getChildren();
                for (var h = 1; h <= children.length - 1; h++) {
                    children[h].className = children[h].cutClassTo("not-choosen", true);
                    children[h].className = children[h].cutClassTo("thla-", true);
                    children[h].className += "thla-" + (l + 1) + "-" + h + " choosen";
                }
                children[0].replaceText(j + 1 + "T." + (l + 1));
                children[1].replaceText(s.trajectoryCoordinates[j][l].x.toString());
                children[2].replaceText(s.trajectoryCoordinates[j][l].y.toString());
                clones.push(trajectoryClone);
            }
        }
        var tbody = get(".trajectory-table-body")[0];
        var tbodyChildren = tbody.getChildren();
        for (var e = 0; e <= tbodyChildren.length - 1; e++) {
            tbodyChildren[e].remove();
        }
        for (var q = 0; q <= clones.length - 1; q++) {
            tbody.parentOf(clones[q]);
        }
        return true;
    }
};

MapInteraction.prototype.computeDistance = function(kind) {
    var map = new MapInteraction();
    MapInteraction.prototype.kInP = 2.84210526315789;
    if (kind === "dotes") MapInteraction.prototype.distances.toDotes = computeDistanceToDotes();
    if (kind === "trajectory") MapInteraction.prototype.distances.toTrajectories = computeDistanceToTrajectories();
    if (kind === "area") MapInteraction.prototype.distances.toAreas = computeDistanceToAreas();
    function computeDistanceToDotes() {
        var mapCanvas = new MapInteraction(), dotes = mapCanvas.dotesCoordinates, base = mapCanvas.baseCoordinates, result = [];
        if (isCorrect(dotes, "Array")) {
            dotes.forEach(function(element, ind, arr) {
                var dotX = element.x, dotY = element.y, baseX = base.x, baseY = base.y, distance = {}, obj = {}, k = mapCanvas.kInP;
                distance.x = dotX - baseX;
                distance.y = dotY - baseY;
                distance.result = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
                distance.result = parseInt(distance.result.toFixed(3));
                obj = {
                    name: element.name,
                    pixels: distance.result,
                    coords: {
                        x: dotX,
                        y: dotY
                    },
                    kilometers: distance.result * k,
                    to: {}
                };
                dotes.forEach(function(dot, i, a) {
                    var distance = {};
                    if (i !== ind) {
                        distance.x = dot.x - dotX;
                        distance.y = dot.y - dotY;
                        distance.result = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
                        distance.result = parseInt(distance.result.toFixed(3));
                        obj.to[dot.name] = {
                            pixels: distance.result,
                            kilometers: distance.result * k,
                            name: dot.name
                        };
                    }
                });
                result.push(obj);
            });
        }
        return result;
    }
    function computeDistanceToTrajectories() {
        var mapCanvas = new MapInteraction(), trajectory = mapCanvas.trajectoryCoordinates, base = mapCanvas.baseCoordinates, result = [], k = mapCanvas.kInP;
        if (isCorrect(trajectory, "Array")) trajectory.forEach(function(element, ind, arr) {
            result.push([]);
            element.forEach(function(oneDot, j, b) {
                var dotX = oneDot.x, dotY = oneDot.y, baseX = base.x, baseY = base.y, distance = {}, previous = result[ind][j - 1], data = {};
                distance.x = dotX - baseX;
                distance.y = dotY - baseY;
                distance.result = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
                distance.result = parseInt(distance.result.toFixed(3));
                data.pixels = distance.result;
                data.kilometers = distance.result * k;
                if (previous) {
                    if (distance.result <= previous.pixels) {
                        data.entry = true;
                    } else {
                        result[ind][j - 1].entry = true;
                    }
                }
                result[ind].push(data);
            });
        });
        return result;
    }
};

MapInteraction.prototype.replaceHeaders = function(lon, lat) {
    this.base.headers.xH.replaceText(lon);
    this.base.headers.yH.replaceText(lat);
    this.dotes.headers.xH.replaceText(lon);
    this.dotes.headers.yH.replaceText(lat);
    this.trajectory.headers.xH.replaceText(lon);
    this.trajectory.headers.yH.replaceText(lat);
    this.area.headers.xH.replaceText(lon);
    this.area.headers.yH.replaceText(lat);
    return this;
};

MapInteraction.prototype.canvas.initialize = function(sp) {
    sp.replaceHeaders("x", "y");
    this.setBase(sp);
    this.setDotes(sp);
    this.setTrajectory(sp);
    return this;
};

MapInteraction.prototype.baseBalloon = [];

MapInteraction.prototype.baseCoordinates = [];

MapInteraction.prototype.dotesCoordinates = [];

MapInteraction.prototype.areaCoordinates = [];

MapInteraction.prototype.trajectoryCoordinates = [];

MapInteraction.prototype.distances = {};

(function() {
    var baseMap = new MapInteraction({
        map: "#dynamic-map",
        panel: "#control-additional",
        button: "#set-base",
        longitude: ".lon-base",
        latitude: ".lat-base"
    });
    baseMap.setBase();
    var targetsMap = new MapInteraction({
        map: "#dynamic-map",
        panel: "#control-additional",
        dotes: {
            longitude: get(".lon-dhla-1")[0],
            latitude: get(".lat-dhla-1")[0],
            amount: get(".dotes-amount")[0],
            button: get("#set-dotes")
        },
        trajectory: {
            pointA: {
                lontitude: get(".lon-thla-1-1")[0],
                latitude: get(".lat-thla-1-1")[0]
            },
            pointB: {
                lontitude: get(".lon-thla-1-2")[0],
                latitude: get(".lat-thla-1-2")[0]
            },
            amount: get(".trajectory-amount")[0],
            button: get("#set-trajectory")
        },
        area: {
            pointA: {
                longitude: get(".lon-ahla-1-1")[0],
                latitude: get(".lat-ahla-1-1")[0]
            },
            pointB: {
                longitude: get(".lon-ahla-1-2")[0],
                latitude: get(".lat-ahla-1-2")[0]
            },
            pointC: {
                longitude: get(".lon-ahla-1-3")[0],
                latitude: get(".lat-ahla-1-3")[0]
            },
            pointD: {
                longitude: get(".lon-ahla-1-4")[0],
                latitude: get(".lat-ahla-1-4")[0]
            },
            amount: get(".area-amount")[0],
            button: get("#set-area")
        }
    });
    targetsMap.setDotes();
    var mapData = new MapInteraction({
        canvasMap: "#polygon",
        panel: "#control-additional",
        base: {
            coordinates: {
                x: 0,
                y: 0
            },
            radius: 3,
            button: get("#set-base"),
            values: {
                xV: get(".lon-base")[0],
                yV: get(".lat-base")[0]
            },
            headers: {
                xH: get(".lon-base-headers")[0],
                yH: get(".lat-base-headers")[0]
            }
        },
        dotes: {
            coordinates: [],
            values: {
                xV: get(".lon-dotes-hla")[0],
                yV: get(".lat-dotes-hla")[0]
            },
            headers: {
                xH: get(".lon-dotes-headers")[0],
                yH: get(".lat-dotes-headers")[0]
            },
            amount: get(".dotes-amount")[0],
            button: get("#set-dotes"),
            radius: 2
        },
        trajectory: {
            coordinates: [],
            values: {
                xV: get(".lon-trajectory-hla")[0],
                yV: get(".lat-trajectory-hla")[0]
            },
            headers: {
                xH: get(".lon-trajectory-headers")[0],
                yH: get(".lat-trajectory-headers")[0]
            },
            amount: get(".trajectory-amount")[0],
            button: get("#set-trajectory"),
            radius: 1.5
        },
        area: {
            coordinates: [ [ {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            } ] ],
            values: {
                xV: get(".lon-area-hla")[0],
                yV: get(".lat-area-hla")[0]
            },
            headers: {
                xH: get(".lon-area-headers")[0],
                yH: get(".lat-area-headers")[0]
            },
            amount: get(".area-amount")[0],
            button: get("#set-area")
        }
    });
    var cv = mapData.canvas;
    var button = get("#switch"), flag = false;
    button.onclick = showCanvas;
    function showCanvas() {
        if (!flag) {
            var canvas = get("#polygon"), static = get("#static-map");
            sleep(canvas, static);
            css(canvas, {
                zIndex: 200
            });
            css(static, {
                zIndex: 4,
                background: "rgba(255, 255, 255, .4)"
            });
            awake(canvas, static);
            this.value = "Переключиться на карту";
            flag = true;
        } else {
            this.onclick = showMap;
            this.onclick();
        }
        function showMap() {
            if (flag) {
                var canvas = get("#polygon"), static = get("#static-map");
                sleep(canvas, static);
                css(canvas, {
                    zIndex: 1
                });
                css(static, {
                    zIndex: 0,
                    background: "rgba(255, 255, 255, .4)"
                });
                awake(canvas, static);
                this.value = "Переключиться на холст";
                flag = false;
            } else {
                this.onclick = showCanvas;
                this.onclick();
            }
        }
        if (flag) {
            cv.initialize(mapData);
        } else {
            mapData.replaceHeaders("Долгота", "Широта");
            baseMap.setBase();
            targetsMap.setDotes();
        }
    }
})();

function Planes() {
    return this;
}

(function() {
    Planes.prototype.atBase = function() {
        isCorrect(this, "Object");
        var map = new MapInteraction();
        for (var i = 0; i <= this.all.length - 1; i++) {
            this.all[i].base = map.baseCoordinates;
        }
    };
    Planes.prototype.toCanvas = function() {
        isCorrect(this, "Object");
        var map = new MapInteraction();
        var polygon = get("#polygon").getContext("2d"), x0, y0, r = map.baseRadius, d = r * 2 * 2, startAngle = 0, endAngle = Math.PI * 2, color = "rgba(30,199,115, 1)", drone = this.all[0], allDrones = this.all;
        if (drone.base.x) {
            polygon.clearRect(drone.base.x - (d + r), drone.base.y - (d + r), d * 2.5, d * 2.5);
        }
        drawCircle(polygon, drone.base.x, drone.base.y, r, startAngle, endAngle, 0, color, 2);
        drawText(polygon, "white", "9px serif", allDrones);
        drawCircle(polygon, drone.base.x, drone.base.y, r + 6, startAngle, endAngle, color, 0, 2);
        var planesPolygon = get(".actions"), each = Array.prototype.forEach;
        if (planesPolygon.length) {
            each.call(planesPolygon, function(action, ind, arr) {
                css(action, {
                    zIndex: ind + 5
                });
            });
        }
        var pol = get("#polygon");
        css(pol, {
            zIndex: 26
        });
    };
    Planes.prototype.initialize = function() {
        var self = this, map = new MapInteraction();
        self.atBase();
        self.dronesCanvases();
        self.toCanvas();
        self.flyToTarget();
    };
})();

(function() {
    Planes.prototype.flyToTarget = function() {
        var self = this, map = new MapInteraction(), distances = map.distances, each = Array.prototype.forEach, sort = Array.prototype.sort, drones = self.all;
        each.call(drones, function(y, j, b) {
            y.watch = [];
        });
        if (classOf(distances) === "Object") {
            for (var i in distances) {
                var aDistance = distances[i];
                if (classOf(aDistance) === "Array" && typeof aDistance !== "function") {
                    if (i === "toDotes") {
                        sort.call(aDistance, function(a, b) {
                            if (a.kilometers < b.kilometers) {
                                return 1;
                            } else if (a.kilometers > b.kilometers) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                        for (var j in aDistance) {
                            if (typeof aDistance[j] !== "function") {
                                var dot = aDistance[j];
                                each.call(drones, function(x, i, a) {
                                    targetsToDrones(x, dot);
                                });
                            }
                        }
                    }
                }
            }
            var simulate = get("#simulate");
            simulate.onclick = function() {
                if ("move" in self) {
                    console.log("Starting simulation!");
                    self.move();
                    this.onclick = null;
                } else {
                    alert("Вы не загрузили или не активировали алгоритм движения!");
                }
            };
        }
    };
    function targetsToDrones(dr, tg) {
        var sps = dr.specification, range = sps.range / 2;
        if (!dr.watch.length && !tg.watched) {
            if (range >= tg.kilometers) {
                dr.leftRange = sps.range - tg.kilometers;
                dr.watch.push(tg);
                tg.watched = true;
            } else {
                dr.leftRange = sps.range;
                dr.watch = [];
                tg.watched = null;
            }
        }
    }
    Planes.prototype.dronesCanvases = function() {
        var self = this;
        var controlPanel = get("#controls"), parent = controlPanel.parentNode;
        self.all.forEach(function(drone, ind, arr) {
            var canvas = document.createElement("canvas");
            canvas.height = 600;
            canvas.width = 1300;
            canvas.className = "actions";
            canvas.id = drone.name + "-" + drone.iAm;
            parent.insertBefore(canvas, controlPanel);
        });
    };
    Planes.prototype.move = function() {
        var self = this;
        var container = get(".actions");
        var map = new MapInteraction(), each = Array.prototype.forEach, step = 10, radius = 4, startAngle = 0, endAngle = Math.PI * 2, assignmentTime = 0, done = count();
        Planes.prototype.all.coordinates = [];
        self.all.forEach(function(drone, id, arr) {
            drone.path = [];
            drone.completed = [];
            if (drone.watch.length) {
                droneWay(drone, [ drone.base.x, drone.base.y ], [ drone.watch[0].coords.x, drone.watch[0].coords.y ], [ assignmentTime, done ]);
            }
        });
    };
    function dotIsAchieved(d) {
        var map = new MapInteraction();
        var dotes = get("#polygon").getContext("2d"), r = 2.5, c = d.colors.slice(0, d.colors.lastIndexOf(",") + 1) + "1)", startAngle = 0, endAngle = Math.PI * 2;
        var dotX = d.watch[0].coords.x, dotY = d.watch[0].coords.y;
        var nm = "  " + d.watch[0].name;
        dotes.beginPath();
        dotes.font = "20px Tahoma";
        var nmWidth = dotes.measureText(nm).width;
        dotes.closePath();
        dotes.clearRect(dotX - r * 5, dotY - r * 6, r * r * 2 + nmWidth, r * r * r * r - 5);
        drawCircle(dotes, dotX, dotY, r + 6, startAngle, endAngle, c, 0, 2, nm);
    }
    function drawStroke(p, s, e, c) {
        p.beginPath();
        p.setLineDash([ 5, 2, 2, 2 ]);
        p.moveTo(s[0], s[1]);
        p.lineTo(e[0], e[1]);
        p.strokeStyle = c;
        p.stroke();
    }
    function droneWay(d, start, end, options) {
        isCorrect(start, "Array") && isCorrect(end, "Array") && isCorrect(options, "Array");
        var dWay = arguments;
        var polygon = get("#" + d.name + "-" + d.iAm).getContext("2d"), container = get(".actions"), map = new MapInteraction(), x1 = start[0], y1 = start[1], x2 = end[0], y2 = end[1], distance = getDistance(start, end, 3), speed = d.specification.speed * 10 / map.kInP / 3600, color = d.colors, circle = color.slice(0, color.lastIndexOf(",") + 1) + "1)", simulate = distance / speed, angle = Math.atan2(y2 - y1, x2 - x1), codedX = [], codedY = [], radius = 4, startAngle = 0, endAngle = Math.PI * 2, step = 10;
        var simulating = setInterval(function() {
            polygon.clearRect(0, 0, container[0].width, container[0].height);
            x1 += speed * Math.cos(angle);
            y1 += speed * Math.sin(angle);
            drawCircle(polygon, x1, y1, radius, startAngle, endAngle, 0, circle, 2);
            drawStroke(polygon, start, [ x1, y1 ], color);
            if (d.completed.length) {
                d.completed.forEach(function(cmp, ind, c) {
                    if (ind === 0) {
                        drawStroke(polygon, [ d.base.x, d.base.y ], [ cmp.coords.x, cmp.coords.y ], color);
                    } else {
                        drawStroke(polygon, [ c[ind - 1].coords.x, c[ind - 1].coords.y ], [ c[ind].coords.x, c[ind].coords.y ], color);
                    }
                });
            }
            codedX.push(btoa(x1));
            codedY.push(btoa(y1));
            options[0]++;
            simulate--;
            if (simulate <= 0) {
                d.path.push([ codedX, codedY ]);
                dotIsAchieved(d);
                d.completed.push(d.watch[0]);
                for (var k in map.distances) {
                    if (map.distances.hasOwnProperty(k)) notWatched(map.distances[k], d.watch[0]);
                }
                clearInterval(simulating);
                var completed = d.completed;
                if (start[0] !== end[0]) {
                    dWay.callee(d, [ completed[completed.length - 1].coords.x, completed[completed.length - 1].coords.y ], [ d.watch[0].coords.x, d.watch[0].coords.y ], [ options[0], options[1] ]);
                } else {
                    var cmp = options[1]();
                    console.log(map.canvas, cmp);
                    if (cmp === parseInt(map.canvas.dotes.amount.innerText())) {
                        console.log("Simulating has been completed.");
                    }
                }
            }
        }, step);
    }
    function notWatched(dotes, drone) {
        isCorrect(dotes, "Array");
        var toWatch = [];
        for (var i in dotes) {
            if (dotes.hasOwnProperty(i)) {
                var dot = dotes[i];
                if (!dot.watched) {
                    toWatch.push(dot);
                }
            }
        }
        setDroneWay(toWatch, drone);
    }
    function setDroneWay(watch, dr) {
        isCorrect(watch, "Array");
        isCorrect(dr, "Object");
        var map = new MapInteraction(), each = Array.prototype.forEach, droneCanWatch = dr.to, min = Infinity, rightDot = {}, drs = new Planes(), dotty = 0, doneIsDone = false;
        if (!watch.length) {
            dotty = {
                coords: {
                    x: drs.all[0].base.x,
                    y: drs.all[0].base.y
                },
                distances: dr.kilometers || 0,
                name: "Done!"
            };
            transferDot(drs.all, dr, dotty);
        } else {
            for (var j in droneCanWatch) {
                if (droneCanWatch.hasOwnProperty(j)) {
                    var dot = droneCanWatch[j];
                    watch.forEach(function(w, t, a) {
                        if (dot.name === w.name) {
                            if (dot.pixels <= min) {
                                min = dot.pixels;
                                rightDot = dot;
                            }
                        }
                    });
                }
            }
            for (var k in map.distances) {
                if (map.distances.hasOwnProperty(k)) {
                    var type = map.distances[k];
                    for (var t in type) {
                        if (type.hasOwnProperty(t)) {
                            var mapDot = type[t];
                            if (mapDot.name === rightDot.name) {
                                mapDot.watched = true;
                                dotty = mapDot;
                            }
                        }
                    }
                }
            }
            transferDot(drs.all, dr, dotty, rightDot);
        }
        function transferDot(ad, curDrone, dot) {
            for (var m in ad) {
                if (classOf(ad[m]) === "Object") {
                    var tempDrone = ad[m];
                    if (tempDrone.watch[0] && tempDrone.watch[0].name === curDrone.name) {
                        var leftDistance = 0;
                        if (arguments.length === 4) {
                            leftDistance = dot.kilometers + arguments[arguments.length - 1].kilometers;
                        } else {
                            leftDistance = dot.distances;
                        }
                        if (tempDrone.leftRange / 2 >= leftDistance) {
                            tempDrone.watch[0] = dot;
                            if (arguments.length === 4) {
                                tempDrone.leftRange -= arguments[arguments.length - 1].kilometers;
                            } else {
                                tempDrone.leftRange -= arguments[arguments.length - 1].distances;
                            }
                        } else {
                            tempDrone.watch[0] = {
                                coords: {
                                    x: tempDrone.base.x,
                                    y: tempDrone.base.y
                                },
                                distances: dot.kilometers || 0,
                                name: "Done!"
                            };
                            dotty.watched = null;
                        }
                    } else {
                        continue;
                    }
                } else {
                    continue;
                }
            }
        }
    }
})();

(function() {
    function Toddle(elements) {
        if (typeof elements !== "object") throw new TypeError("Incoming parameter is not an object");
        for (var i in elements) {
            var arr = elements[i];
            this[i] = {};
            for (var j in arr) {
                if (typeof arr[j] === "string") this[i][j] = get(arr[j])[0]; else this[i][j] = arr[j];
            }
        }
    }
    Toddle.prototype.defineSegments = function(el) {
        var coords = el.getBoundingClientRect();
        el.segments = {
            start: coords.left,
            end: coords.right,
            width: coords.right - coords.left
        };
        return this;
    };
    Toddle.prototype.breaks = function(el) {
        var segment = el.segments;
        segment.each = segment.width / this.options.divisions;
        segment.coords = new Array(this.options.divisions);
        segment.coords[this.options.divisions] = segment.end;
        for (var i = this.options.divisions - 1; i >= 0; i--) {
            segment.coords[i] = Math.round(segment.coords[i + 1] - segment.each);
        }
        delete segment.coords[segment.coords.length - 1];
        return this;
    };
    Toddle.prototype.resize = function() {
        window.onresize = function() {
            tod.defineSegments(tod.dom.line);
            tod.breaks(tod.dom.line);
            var index = parseInt(tod.dom.amount.getText());
            tod.dom.tongle.style.left = tod.dom.line.segments.coords[index - 1] - tod.dom.line.segments.start + "px";
        };
    };
    Toddle.prototype.action = function() {
        var self = this;
        this.dom.tongle.onmousedown = function(e) {
            moveAt(e);
            function moveAt(e) {
                var line = self.dom.line.segments;
                self.dom.tongle.style.cursor = "pointer";
                if (e.clientX >= line.start && e.clientX <= line.end) {
                    self.dom.tongle.style.left = e.clientX - line.start - self.dom.tongle.offsetWidth / 2 + "px";
                }
            }
            function atCheckPoint(e) {
                var tonglePos = self.dom.tongle.segments;
                self.defineSegments(self.dom.tongle);
                self.breaks(self.dom.line);
                self.dom.line.segments.coords.forEach(function(x, i, a) {
                    if (tonglePos.start <= x && tonglePos.start >= x - 10) {
                        self.dom.amount.replaceText((i + 1).toString());
                    }
                });
            }
            document.onmousemove = function(e) {
                moveAt(e);
                atCheckPoint(e);
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                self.dom.tongle.onmouseup = null;
            };
            self.dom.tongle.ondragstart = function() {
                return false;
            };
        };
    };
    Toddle.prototype.create = function() {
        this.defineSegments(this.dom.line);
        this.defineSegments(this.dom.tongle);
        this.breaks(this.dom.line);
        this.resize();
        this.action();
    };
    var tod = new Toddle({
        dom: {
            slider: ".planes-slider",
            line: ".planes-toddler-line",
            tongle: ".planes-toddle",
            amount: ".planes-amount"
        },
        options: {
            divisions: 20
        }
    });
    tod.create();
    var def = new Toddle({
        dom: {
            slider: ".defence-slider",
            line: ".defence-toddler-line",
            tongle: ".defence-toddle",
            amount: ".defence-amount"
        },
        options: {
            divisions: 10
        }
    });
    def.create();
    var dotes = new Toddle({
        dom: {
            slider: ".dotes-slider",
            line: ".dotes-toddler-line",
            tongle: ".dotes-toddle",
            amount: ".dotes-amount"
        },
        options: {
            divisions: 30
        }
    });
    dotes.create();
    var area = new Toddle({
        dom: {
            slider: ".area-slider",
            line: ".area-toddler-line",
            tongle: ".area-toddle",
            amount: ".area-amount"
        },
        options: {
            divisions: 10
        }
    });
    area.create();
    var trajectory = new Toddle({
        dom: {
            slider: ".trajectory-slider",
            line: ".trajectory-toddler-line",
            tongle: ".trajectory-toddle",
            amount: ".trajectory-amount"
        },
        options: {
            divisions: 10
        }
    });
    trajectory.create();
})();

(function() {
    var hard = get(".hard-drone-cls"), middle = get(".middle-drone-cls"), light = get(".light-drone-cls"), hardCheckboxes = get(".hard-drone-checks"), middleCheckboxes = get(".middle-drone-checks"), lightCheckboxes = get(".light-drone-checks"), hardAmount = get(".hard-drone-amount"), middleAmount = get(".middle-drone-amount"), lightAmount = get(".light-drone-amount"), each = Array.prototype.forEach;
    var commonCls = [ hard, middle, light ], commonChecks = [ hardCheckboxes, middleCheckboxes, lightCheckboxes ], commonAmount = [ hardAmount, middleAmount, lightAmount ];
    var closeButtons = [], checkboxes = [], am = [];
    for (var n = 0; n <= commonCls.length - 1; n++) {
        var inputs = commonCls[n];
        each.call(inputs, function(x, i, a) {
            closeButtons.push(x);
        });
    }
    for (var k = 0; k <= commonChecks.length - 1; k++) {
        var checkbox = commonChecks[k];
        each.call(checkbox, function(x, i, a) {
            checkboxes.push(x);
        });
    }
    for (var r = 0; r <= commonAmount.length - 1; r++) {
        var input = commonAmount[r];
        each.call(input, function(x, i, a) {
            am.push(x);
        });
    }
    each.call(closeButtons, function(x, i, a) {
        x.onclick = function() {
            if (checkboxes[i].checked) {
                checkboxes[i].checked = false;
                am[i].value = "";
                css(am[i], {
                    border: "1px solid transparent"
                });
            }
        };
    });
})();

var myMap, myCollection, dotesTargets, areaTargets, trajectoryTargets;

ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("dynamic-map", {
        center: [ 55.76, 37.64 ],
        zoom: 5,
        controls: [ "rulerControl", "zoomControl" ]
    });
    myCollection = new ymaps.GeoObjectCollection({}, {
        preset: "twirl#redIcon",
        draggable: false
    });
    dotesTargets = new ymaps.GeoObjectCollection({}, {
        preset: "twirl#redIcon",
        draggable: false
    });
}