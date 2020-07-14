const ENTITY_GROUP_TYPE = 0;
const GROUP_GROUP_TYPE = 1;

/*property
    Augment, Chainify, DateRangeFiltering, Debounce, DynamicSort,
    DynamicSortMultiple, FilterByQuery, FindRegex, GenerateGUID,
    GetAttributeSelector, GetId, GetKeyValuePairs, GetProperty,
    GetViewportDimensions, Mix, SortNumber, TextareaMouseUp, TextareaResize,
    TransformAllMatches, apply, clientHeight, clientWidth, dataset,
    documentElement, exec, findRegex, forEach, getAttribute, height, id,
    indexOf, innerHeight, innerWidth, keys, length, log, max, offsetHeight,
    offsetWidth, parentElement, prototype, push, query, random, replace,
    scrollHeight, search, style, substr, test, toLowerCase, toString, trim,
    value, width
*/
var Helper =
{
    /*
    Adds a function to execute during every function within window.
    Functions created after this executes are not affected.

    @param {function} withFn - apply this function to all functions in window
    */
    augment: function (withFn) {
        var name,
            fn;

        for (name in window) {
            fn = window[name];

            if (typeof fn === "function") {
                window[name] = (function (name, fn) {
                    var args = arguments;

                    return function () {
                        withFn.apply(this, args);
                        return fn.apply(this, arguments);
                    };
                })(name, fn);
            }
        }
    },

    /**
    * Alters the prototype of an object to make each function
    * @param {object} obj will have its prototype altered
    */
    chainify: function (obj) {
        Object.keys(obj).forEach(function (key) {
            var member = obj[key];
            if (typeof member === "function" && !(/\breturn\b/).test(member)) {
                obj[key] = function () {
                    member.apply(this, arguments);
                    return this;
                };
            }
        });
    },

    cssManipulation:
    {
        /*
        This adds some CSS to the page
        */
        AddStyleSheet: function (content) {
            //for cross browser compatibility, use the following commented statement
            //var cssRuleCode = document.all ? 'rules' : 'cssRules'; //account for IE and FF

            document.querySelector("head").appendChild(this.CreateStyleSheet(content));
        },

        /*
        This function creates a style sheet and returns it.
        */
        CreateStyleSheet: function (content) {
            var style = document.createElement("style");
            var styleSheet = style.styleSheet;

            if (styleSheet) {
                stylesheet.cssText = content;
            }
            else {
                style.appendChild(document.createTextNode(content));
            }

            style.type = "text/css";
            return style;
        }
    },

    /*
    I copy source's prototype to destination's prototype!
    source is an object
    destination is an object
    */
    debounce: function (func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap) {
                    func.apply(obj, args);
                }

                timeout = null;
            }

            if (timeout) {
                clearTimeout(timeout);
            }
            else if (execAsap) {
                func.apply(obj, args);
            }

            timeout = setTimeout(delayed, threshold || 100);
        };
    },

    events: {
        // addEventListener wrapper:,
        $on: function (target, type, callback, useCapture) {
            console.log("Helper.&on");
            if (target !== null) {
                // if the browser is old
                if (!target.addEventListener) {
                    target.attachEvent(type, callback);
                }
                else {
                    target.addEventListener(type, callback, !!useCapture);
                }
            }
        },

        // Attach a handler to event for all elements that match the selector,
        // now or in the future, based on a root element
        $delegate: function (target, selector, type, handler) {
            console.log("Helper.&delegate");
            var that = this;

            function dispatchEvent(event) {
                var targetElement = event.target;
                var potentialElements = that.qsa(selector, target);
                var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

                if (hasMatch) {
                    handler.call(targetElement, event);
                }
            }

            // https://developer.mozilla.org/en-US/docs/Web/Events/blur
            var useCapture = type === 'blur' || type === 'focus';

            this.$on(target, type, dispatchEvent, useCapture);
            //window.$on(target, type, dispatchEvent, useCapture);
        },
    },

    /**
    * Filters items based on the given query
    * @param {object} query is an object with the desired key/value
    * @param {object} item is to be compared to query
    * @returns {bool}
    */
    filterByQuery: function (query, item) {
        console.log("Helper.filterByQuery");

        Object.keys(query).forEach(function (key) {
            if (item[key] !== undefined) {
                if (String(item[key]).toLowerCase().indexOf(query[key].toLowerCase()) === -1) {
                    return false;
                }
            }
            else {
                return false;
            }
        });
        return true;
    },

    formatting: {
        /**
        * Formats money
        * @param {number} price is a numeric value without notation
        * @returns {string} a formatted monetary value
        */
        money: function (price) {
            var p = parseFloat(price).toFixed(2).split(".");
            return "$" + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
                return num + (i && !(i % 3) ? "," : "") + acc;
            }, "") + "." + p[1];
        },
        /**
        * Adjusts precision to 2 places, then strips out invalid values
        * @param {number} price
        * @returns {number/string}
        */
        price: function (price) {
            var val = parseFloat(Math.round(price * 100) / 100).toFixed(2);
            return val == 'NaN' ? '' : val == 'Infinity' ? '' : val;
        },
        /**
        * Formats the date with the given separator
        * @param {string} date
        * @param {string} separator defaults to /
        * @returns {string}
        */
        date: function (date, separator/* separator = "/" */) {
            if ((typeof date === "string") || (typeof date === "number")) {
                date = new Date(date);
            }
            if (!separator) {
                separator = "/";
            }
            if (date == undefined) {
                date = new Date();
            }

            return (date.getMonth() + 1) + separator + date.getDate() + separator + date.getFullYear();
        },
        //formatDate: function (value) {
        //    var monthNames = [
        //        "Jan",
        //        "Feb",
        //        "Mar",
        //        "Apr",
        //        "May",
        //        "Jun",
        //        "Jul",
        //        "Aug",
        //        "Sep",
        //        "Oct",
        //        "Nov",
        //        "Dec"
        //    ];
        //
        //    var date = new Date(value);
        //    var day = date.getDate();
        //    var monthIndex = date.getMonth();
        //    var year = date.getFullYear();
        //
        //    return day + " " + monthNames[monthIndex] + " " + year;
        //},

        /**
        * Gives the time portion of a DateTime
        * @param {string} date
        * @returns {string}
        */
        time: function (date) {
            if (typeof date === "string") {
                date = new Date(date);
            }

            return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }
    },

    /**
    * @returns {string} a randomly generated guid
    */
    generateGuid: function () {
        var template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        //    var template = "xxxxxxxxxxxxyxxxyxxxxxxxxxxxxxxx";
        var returnMe = template.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == "x" ? r
                    /*
                     * What we're doing here is bitwise operations :
                     * 0x3.toString(2) => 11
                     * 0x8.toString(2) => 1000
                     * first a and with 11 at the bit level (truncating to only the two last bits, that is doing %4),
                     * then a or with 1000 (setting one bit, adding 8).
                     */
                    : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        return returnMe;
    },

    /*
     * Generates an id for an HTML element based on the guid generator, 
     * it removes the dashes because the DOM doesn't like them.
     * @return {string}
     */
    generateHTMLElementId: function () {
        return "id" + this.generateGuid().split("-").join("");
    },

    //from viewrfq.js
    //getGuid: function () {
    //    console.log("getGuid");
    //    var d = new Date().getTime();
    //    var template = "xxxxxxxxxxxxyxxxyxxxxxxxxxxxxxxx";
    //    var uuid = template
    //        .replace(/[xy]/g, function (c) {
    //            var r = (d + Math.random() * 16) % 16 | 0;
    //            d = Math.floor(d / 16);
    //            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    //        });
    //    return uuid;
    //},

    /**
    * Gets the requested property from a list of objects and returns an array with each value
    * @param {array} items is the list of objects to search
    * @param {string} property is the property to search for
    * @returns {array} a list of the values found
    */
    getProperty: function (items, property) {
        console.log("Helper.getProperty");
        var returnMe = [];

        items.forEach(function (item) {
            returnMe.push(item[property]);
        });

        return returnMe;
    },

    /**
    * get viewport dimensions,
    * @param {}
    * @returns {object} {width: x, height: y}
    */
    getViewportDimensions: function () {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        return { width: w, height: h };
    },

    html: {
        /**
        * Concatenates an attribute selector based on inputs
        * @param {string} attr
        * @param {string} value
        * @returns {string}
        */
        getAttributeSelector: function (attr, value) {
            var template = "[{{0}}=\"{{1}}\"]";
            return template
                .replace("{{0}}", attr)
                .replace("{{1}}", value);
        },

        // Get the key/value pairs from HTML controls and put them into a returned object
        // expects the control to have a key attribute
        /**
        * Iterate over a list of DOM elements, extracting their "key" attributes and their values,
        * and returning the result as an array.
        * @param {array} list
        * @param {bool} replaceEmpty
        * @returns {array}
        */
        getKeyValuePairs: function (list, replaceEmpty) {
            var returnMe = {};

            list.forEach(function (item) {
                var key = item.getAttribute("key");
                var value = item.value;

                if ((value !== "") && (value !== undefined)) {
                    returnMe[key] = value.trim();
                }
                else if (replaceEmpty) {
                    returnMe[key] = key;
                }
            });

            return returnMe;
        },

        /**
        * Return the id for the given element, supporting older versions of IE
        * @param {object} element
        */
        getId: function (element) {
            console.log("Helper.getId");
            var returnMe = undefined;

            if (element.dataset) {
                returnMe = element.dataset.id;
            }
            else {
                returnMe = element.getAttribute("data-id");
            }

            return returnMe;
        },

        /**
        * Resize textareas to fit the text they contain
        * @param {object} el
        */
        textareaResize: function resize(el) {
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
        },

        /**
        * Prevent textareas from being bigger than their container
        * @param {object} sender
        */
        textareaMouseUp: function (sender) {
            var parent = sender.parentElement;
            var width = parent.offsetWidth + "px";
            var height = parent.offsetHeight + "px";

            sender.style.height = sender.style.height > height ?
                height : sender.style.height;

            sender.style.width = sender.style.width > width ?
                width : sender.style.width;
        },

        qs: function (selector, scope) {
            console.log("Helper.qs");
            var temp = scope || document;
            return temp.querySelector(selector);
        },

        qsa: function (selector, scope) {
            console.log("Helper.qsa");
            var temp = scope || document;
            return temp.querySelectorAll(selector);
        },
    },

    /**
    * concatenate arrays and delete duplicates
    * @param {array} source
    * @param {array} destination
    * @returns {array}
    */
    join: function (source, destination) {
        //console.log("join", source, destination);
        return destination.concat(source.filter(function (item) {
            return destination.indexOf(item) < 0;
        }));
    },

    json: {
        /**
         * determines whether or not the data is in a parseable format
         * and returns a parsed object if possible
         *
         * @param {string} data is JSON or an object
         * @returns {object} parsed data
         */
        tryParse: function (data) {
            if (typeof (data) === "string") {
                return JSON.parse(data);
            } else {
                return data;
            }
        }
    },

    math: {
        /*
        I try to parse an argument through math.js
        I return a parsed string
        */
        // todo this should probably move into a controller
        doMath: function (thing) {
            try {
                return math.eval(thing);
            }
            catch (e) {
                return thing;
            }
        },
    },

    /**
    * Mix one objects prototype into another's
    * @param {object} source
    * @param {object} destination
    */
    mix: function (source, destination) {
        console.log("Helper.mix");
        if ((source.prototype !== undefined) && (source.prototype.length > 0)) {
            source.prototype.forEach(function (prop) {
                if (destination.prototype[prop] === undefined) {
                    destination.prototype[prop] = prop;
                }
            });
        }
        else {
            return;
        }
    },

    mvc: {
        getModelPrefix: function (guid) {
            return "Model." + guid + ".";
        },
        getControllerPrefix: function (guid) {
            return "Controller." + guid + ".";
        },
        getViewPrefix: function (guid) {
            return "View." + guid + ".";
        },
    },

    regex: {
        /**
        * Escapes a regex
        * @param {string} str is a regex
        */
        escape: function (str) {
            return str.replace(/([.*+?\^=!:${}()\|\[\]\/\\])/g, "\\$1");
        },

        /**
        * Uses a regex to search a string
        * @param {string} value
        * @param {string} regex
        * @returns {array} the original string and the first match
        */
        find: function (value, regex) {
            console.log("Helper.findRegex");

            if (!value || value === "") {
                return;
            }

            if (!value.indexOf) {
                return;
            }

            if (value.search(regex) !== -1) {
                return regex.exec(value);
            }
        },

        /**
        * I iterate through all matches of regex in value and run callback on each match
        * @param {string} value
        * @param {string} regex is what you're looking for
        * @param {function} callback is a thing you want to do.  it should return a string
        * @returns {string}
        */
        transformAllMatches: function (value, regex, callback) {
            console.log("Helper.transformAllMatches");
            var match = "";
            var returnMe = value;

            if (value) {
                match = Helper.findRegex(value, regex);

                while (match) {
                    returnMe = callback(returnMe, match, regex);
                    match = Helper.findRegex(returnMe, regex);
                }

                return returnMe;
            }
            else {
                return value;
            }
        },

        validDate: "(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])"
    },

    /**
    * Sets up infinite scrolling on the target,
    * using the callback
    * @param {object} scope is an object or a selector that constrains the find function.  
    * I added this to deal with shadow DOM.
    * @param {string} selector identifies the element that has scrolling enabled
    * @param {number} buffer a number of pixels in which the scroll bar can trigger the effect
    * @param {number} offset a number of pixels to use to account for margins
    * @param {function} callback is executed while the scroll position is within the buffer
    */
    setupInfiniteScroll: function (scope, selector, buffer, offset, callback) {
        if (!scope) { scope = document; }

        $(scope).find(selector).parent().scroll(
            //Helper.debounce(
            function () {
                if ($(scope).find(selector).parent().scrollTop() >= $(scope).find(selector).height() - 200 + offset) {
                    callback();
                }
            });
        //}, 500, false));
    },

    sorting: {
        /**
        * Sort based on the given property
        * @param {string} property
        * @returns {function}
        */
        dynamicSort: function (property) {
            console.log("Helper.dynamicSort");
            var sortOrder = 1;

            if (!property) {
                return;
            }

            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }

            return function (a, b) {
                var first = a[property];
                var second = b[property];

                if (first.toLowerCase) {
                    first = first.toLowerCase();
                }

                if (second.toLowerCase) {
                    second = second.toLowerCase();
                }

                var result = (first < second) ?
                    -1 : (first > second) ?
                        1 : 0;

                return result * sortOrder;
            };
        },

        /**
        * Sort based on multiple properties
        * @returns {function}
        */
        dynamicSortMultiple: function () {
            /*
             * save the arguments object as it will be overwritten
             * note that arguments object is an array-like object
             * consisting of the names of the properties to sort by
             */
            var props = arguments;

            return function (obj1, obj2) {
                var i = 0,
                    result = 0,
                    numberOfProperties = props.length;

                /* try getting a different result from 0 (equal)
                 * as long as we have extra properties to compare
                 */
                while (result === 0 && i < numberOfProperties) {
                    result = dynamicSort(props[i])(obj1, obj2);
                    i += 1;
                }

                return result;
            };
        },

        /**
        * Returns true if the value is between the min and max values
        * @param {object} min
        * @param {object} max
        * @param {object} value
        * @returns {bool}
        */
        between: function (min, max, value) {
            if (min === "" && max === "") {
                return true;
            }
            else if (min <= value && max === "") {
                return true;
            }
            else if (max >= value && min === "") {
                return true;
            }
            else if (min <= value && max >= value) {
                return true;
            }
            return false;
        },

        numeric: function (a, b) {
            return a - b;
        }
    },

    stringManipulation: {
        /**
        * Cleans JSON of extra escape characters
        * @param {string} json
        * @returns {string}
        */
        cleanJSON: function (json) {
            var returnMe = json;
            return replaceAll(returnMe, "/\r|\n|\\/g", "");
        },
        /**
        * Replace all instances of a string within a context with another string
        * @param {string} str
        * @param {string} find
        * @param {string} replace
        * @returns {string}
        */
        replaceAll: function (str, find, replace) {
            console.log("replaceAll", str, find, replace);
            return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
        }
    },

    webStorage: {
        /*
        * Determine which data store to access based on browser support
        *
        * @param {string} key - the index of WebStorage
        * @param {function(data)} callback - executes logic on the returned data
        */
        getDataFromStore: function (key, callback) {
            console.log("getDataFromStore");

            if (WebStorage.local) {
                if (!WebStorage.local[key]) {
                    WebStorage.local[key] = [];
                }
                callback(WebStorage.local[key]);
            }
            else {
                data.read(callback(data));
            }
        },

        /*
        * fold the items in the parameter into the data store
        * data is an object or an array of objects
        *
        * @param {object} saveMe - the data to save
        * @param {string} key - the index in WebStorage to save into
        */
        saveDataToStore: function (saveMe, key) {
            console.log("saveToDataStore", saveMe, key);
            if (WebStorage.local) {
                if (!WebStorage.local[key]) {
                    WebStorage.local[key] = [];
                }
                console.log("storing in localStorage");
                WebStorage.local[key] = this.join(saveMe, WebStorage.local[key]);
            }
            else {
                console.log("storing in Collection");

                saveMe.forEach(function (me) {
                    data.create(me, function () { });
                });
            }
        },

        getParameterByName: function (name, url) {
            var regex, results;

            if (!url) {
                url = window.location.href;
            }

            name = name.replace(/[\[\]]/g, "\\$&");
            regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
            results = regex.exec(url);

            if (!results) {
                return null;
            }
            if (!results[2]) {
                return '';
            }

            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    }
};

var dateTimeOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: "h24"
};

var statuses = new Map();
statuses.set(0, "Draft");
statuses.set(1, "Voting");
statuses.set(2, "Confirmed");
statuses.set(3, "Denied");
statuses.set(4, "Archived");

//todo pass in the controller and the action and build the url
//not sure if this is better than passing the url from the caller
class RequestBuilder {
    #isCacheEnabled = false;
    // include, *same-origin, omit
    #credentials = "same-origin";
    // no-cors, *cors, same-origin
    #mode = "cors";
    // *default, no-cache, reload, force-cache, only-if-cached
    #cache = "default";
    // manual, *follow, error
    #redirect = 'follow';
    // no-referrer, *client
    #referrerPolicy = 'no-referrer';

    #headers = {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    };

    constructor(isCacheEnabled, credentials, mode, cache, redirect, refer, headers) {
        this.#isCacheEnabled = isCacheEnabled ? true : false;
        this.#credentials = credentials ? credentials : this.#credentials;
        this.#mode = mode ? mode : this.#mode;
        this.#cache = cache ? cache : this.#cache;
        this.#redirect = redirect ? redirect : this.#redirect;
        this.#referrerPolicy = refer ? refer : this.#referrerPolicy;
        this.#headers = headers ? headers : this.#headers;
    }

    async Get(url) {
        return await this.#get(url);
    }

    async Put(url, data) {
        return await this.#send(url, data, "PUT");
    }

    async Post(url, data) {
        return await this.#send(url, data, "POST");
    }

    async Delete(url) {
        return await this.#send(url, "DELETE");
    }

    #get = async function (url = '') {
        // Default options are marked with *
        const response = await fetch(url, {
            // *GET, POST, PUT, DELETE, etc.
            method: "GET",
            mode: this.#mode,
            cache: this.#cache,
            credentials: this.#credentials,
            headers: this.#headers,
            redirect: this.#redirect,
            referrerPolicy: this.#referrerPolicy
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    #send = async function (url = '', data = {}, method) {
        // Default options are marked with *
        const response = await fetch(url, {
            // *GET, POST, PUT, DELETE, etc.
            method: method,
            mode: this.#mode,
            cache: this.#cache,
            credentials: this.#credentials,
            headers: this.#headers,
            redirect: this.#redirect,
            referrerPolicy: this.#referrerPolicy,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
}

var dataAccess = {
    queryGroups: function (text) {
        return $.ajax({
            url: window.location.origin + "/Group/Find/" + text,
            type: "GET"
        });
    },
    getGroupsByUserId: function (userId) {
        return $.ajax({
            url: window.location.origin + "/Group/User/" + userId,
            type: "GET"
        });
    },
    getGroups: function () {
        //success(testGroups);
        return $.ajax({
            url: window.location.origin + "/Group",
            type: "GET"
        });
    },
    getGroup: function (id) {
        //success(testGroups.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/group/" + id,
            type: "GET"
        });
    },
    getDecisionsByGroupId: function (groupId) {
        return $.ajax({
            url: window.location.origin + "/Decision/Group/" + groupId,
            type: "GET"
        });
    },
    getDecisionsByUserId: function (userId) {
        return $.ajax({
            url: window.location.origin + "/Decision/User/" + userId,
            type: "GET"
        });
    },
    getDecisions: function () {
        //success(testDecisions);
        return $.ajax({
            url: window.location.origin + "/Decision",
            type: "GET"
        });
    },
    getDecision: function (id) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/decision/" + id,
            type: "GET"
        });
    },
    postUser: function (user) {
        return $.ajax({
            url: window.location.origin + "/User",
            type: "POST",
            data: JSON.stringify(new User(user)),
            contentType: "application/json"
        });
    },
    postVoter: function (voter) {
        return $.ajax({
            url: window.location.origin + "/Voter",
            type: "POST",
            data: JSON.stringify(new PersistVoter(voter)),
            contentType: "application/json"
        });
    },
    postGroup: function (group) {
        return $.ajax({
            url: window.location.origin + "/group",
            type: "POST",
            data: JSON.stringify(new PersistGroup(group)),
            contentType: "application/json"
        });
    },
    postDecision: function (decision) {
        return $.ajax({
            url: window.location.origin + "/decision",
            type: "POST",
            data: JSON.stringify(new PersistDecision(decision)),
            contentType: "application/json"
        });
    },
    putGroup: function (group) {
        return $.ajax({
            url: window.location.origin + "/group",
            type: "PUT",
            data: JSON.stringify(new PersistGroup(group)),
            datatype: "json",
            contentType: "application/json"
        });
    },
    putUser: function (user) {
        return $.ajax({
            url: window.location.origin + "/User",
            type: "PUT",
            data: JSON.stringify(new User(user)),
            datatype: "json",
            contentType: "application/json"
        });
    },
    putGroupVoter: function (groupId, voterId) {
        return $.ajax({
            url: window.location.origin + "/group/" + groupId + "/AddVoter/" + voterId,
            type: "PUT",
            datatype: "json",
            contentType: "application/json"
        });
    },
    putGroupGroup: function (groupId, childId) {
        return $.ajax({
            url: window.location.origin + "/group/" + groupId + "/AddGroup/" + childId,
            type: "PUT",
            datatype: "json",
            contentType: "application/json"
        });
    },
    putVoter: function (voter) {
        return $.ajax({
            url: window.location.origin + "/Voter",
            type: "PUT",
            data: JSON.stringify(new Voter(voter)),
            datatype: "json",
            contentType: "application/json"
        });
    },
    putDecision: function (decision) {
        return $.ajax({
            url: window.location.origin + "/decision",
            type: "PUT",
            data: JSON.stringify(new PersistDecision(decision)),
            datatype: "json",
            contentType: "application/json"
        });
    },
    deleteDecision: function (id) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/decision/" + id,
            type: "DELETE",
            datatype: "json",
            contentType: "application/json"
        });
    },
    deleteUser: function (id) {
        return $.ajax({
            url: window.location.origin + "/User/" + id,
            type: "DELETE",
            datatype: "json",
            contentType: "application/json"
        });
    },
    deleteGroup: function (id) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/group/" + id,
            type: "DELETE",
            datatype: "json",
            contentType: "application/json"
        });
    },
    deleteVoter: function (id) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/Voter/" + id,
            type: "DELETE",
            datatype: "json",
            contentType: "application/json"
        });
    },
    getVotesByUserId: function (userId) {
        return $.ajax({
            url: window.location.origin + "/Vote/User/" + userId,
            type: "GET"
        });
    },
    getVotes: function () {
        return $.ajax({
            url: window.location.origin + "/Vote",
            type: "GET"
        });
    },
    getVote: function (id) {
        return $.ajax({
            url: window.location.origin + "/Vote/" + id,
            type: "GET"
        });
    },
    getUsers: function () {
        return $.ajax({
            url: window.location.origin + "/User",
            type: "GET"
        });
    },
    getUser: function (id) {
        return $.ajax({
            url: window.location.origin + "/User/" + id,
            type: "GET"
        });
    },
    getUserByName: function (name) {
        return $.ajax({
            url: window.location.origin + "/User/Find/" + name,
            type: "GET"
        });
    },
    getVoters: function () {
        //success(testEntities);
        return $.ajax({
            url: window.location.origin + "/Voter",
            type: "GET"
        });
    },
    getVoter: function (id) {
        //success(testEntities.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/Voter/" + id,
            type: "GET"
        });
    }
};

var Vote = (function () {

    function constructor(data) {
        this.id = data.id ? data.id : generateId();
        this.voterId = data.voterId ? data.voterId : null;
        this.selectedIndex = data.selectedIndex ? data.selectedIndex : 0;
        this.time = data.time ? data.time : 0;
    }

    return constructor;

})();

var Comment = (function () {

    function constructor(data) {
        this.id = data.id ? data.id : generateId();
        this.voterId = data.voterId ? data.voterId : null;
        this.time = data.time ? data.time : new Date();
        this.upvotes = data.upvotes ? data.upvotes : 0;
        this.downvotes = data.downvotes ? data.downvotes : 0;
        this.narrative = data.narrative ? data.narrative : "";
    }

    return constructor;

})();

var Decision = (function () {

    function constructor(data) {

        if (data) {
            this.id = data.id ? data.id : generateId();
            this.votes = data.votes ? data.votes : [];
            this.options = data.options ? data.options : [];
            this.comments = data.comments ? data.comments : [];
            this.attachments = data.attachments ? data.attachments : [];
            this.creationDate = data.creationDate ? data.creationDate : null;
            this.description = data.description ? data.description : "";
            this.expirationDate = data.expirationDate ? data.expirationDate : "";
            this.name = data.name ? data.name : "";
            this.statusId = data.statusId ? data.statusId : 0;
            this.groupId = data.groupId ? data.groupId : 0;
            this.status = data.statusId ? statuses.get(data.statusId) : statuses.get(0);
            this.statusDate = data.statusDate ? data.statusDate : "";
        } else {
            this.id = generateId();
            this.votes = [];
            this.options = [];
            this.comments = [];
            this.attachments = [];
            this.creationDate = null;
            this.description = "";
            this.expirationDate = null;
            this.name = "";
            this.statusId = 0;
            this.groupId = 0;
            this.statusDate = null;
        }
    }

    return constructor;
})();

var PersistDecision = (function () {

    function constructor(data) {

        if (data) {
            this.id = (data.id !== null && data.id !== undefined)
                ? parseInt(data.id.replace(/id/, ""), 0)
                : parseInt(generateId().replace(/id/, ""), 0);
            this.description = data.description ? data.description : "";
            this.name = data.name ? data.name : "";
            this.statusId = data.statusId ? data.statusId : 0;
            this.groupId = data.groupId ? data.groupId : 0;
        }
        else {
            this.id = parseInt(generateId().replace(/id/, ""), 0);
            this.description = "";
            this.name = "";
            this.statusId = 0;
        }
    }

    return constructor;
})();

// this can be a group of Voters or a group of Groups
var PersistGroup = (function () {

    function constructor(data) {
        if (data) {
            this.decisions = data.decisions ? data.decisions : [];
            this.childGroups = data.childGroups ? data.childGroups : [];
            this.parentGroups = data.parentGroups ? data.parentGroups : [];
            this.voters = data.voters ? data.voters.map(x => x.id) : [];
            this.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
            this.description = data.description ? data.description : "";

            this.id = (data.id !== null && data.id !== undefined)
                ? data.id.replace
                    ? parseInt(data.id.replace(/id/, ""), 0)
                    : data.id
                : parseInt(generateId().replace(/id/, ""), 0);
            this.name = data.name ? data.name : "";
            this.type = data.type ? data.type : ENTITY_GROUP_TYPE;
        } else {
            this.childGroups = [];
            this.parentGroups = [];
            this.voters = [];
            this.creationDate = new Date().getTime();
            this.description = "";
            this.id = parseInt(generateId().replace(/id/, ""), 0);
            this.name = "";
            this.type = ENTITY_GROUP_TYPE;
        }
    }

    return constructor;
})();

var Group = (function () {

    function constructor(data) {
        if (data) {
            this.decisions = data.decisions ? data.decisions : [];
            this.childGroups = data.childGroups ? data.childGroups : [];
            this.parentGroups = data.parentGroups ? data.parentGroups : [];
            this.voters = data.voters ? data.voters.map(x => new Voter(x)) : [];
            this.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
            this.description = data.description ? data.description : "";
            this.id = data.id ? data.id : generateId();
            this.name = data.name ? data.name : "";
            this.type = data.type ? data.type : ENTITY_GROUP_TYPE;
        } else {
            this.decisions = [];
            this.childGroups = [];
            this.parentGroups = [];
            this.voters = [];
            this.creationDate = new Date().getTime();
            this.description = "";
            this.id = generateId();
            this.name = "";
            this.type = ENTITY_GROUP_TYPE;
        }
    }

    return constructor;
})();


var PersistVoter = (function () {

    function constructor(data) {
        var self = this;
        if (data) {
            self.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
            self.id = (data.id !== null && data.id !== undefined)
                ? data.id.replace
                    ? parseInt(data.id.replace(/id/, ""), 0)
                    : data.id
                : parseInt(generateId().replace(/id/, ""), 0);
            self.firstName = data.firstName ? data.firstName : "";
            self.lastName = data.lastName ? data.lastName : "";
            self.middleName = data.middleName ? data.middleName : "";
            self.address = data.address ? data.address : "";
            self.city = data.city ? data.city : "";
            self.state = data.state ? data.state : "";
        }
        else {
            self.id = parseInt(generateId().replace(/id/, ""), 10);
            self.creationDate = new Date().getTime();
            self.userId = 0;
            self.firstName = "";
            self.lastName = "";
            self.middleName = "";
            self.address = "";
            self.city = "";
            self.state = "";
        }

        self.name = self.lastName + ", " + self.firstName + " " + self.middleName;
    }

    return constructor;
})();

var Voter = (function () {
    function constructor(data) {
        var self = this;

        if (data) {
            self.id = data.id ? data.id : generateId();
            self.firstName = data.firstName ? data.firstName : "";
            self.lastName = data.lastName ? data.lastName : "";
            self.middleName = data.middleName ? data.middleName : "";
            self.address = data.address ? data.address : "";
            self.city = data.city ? data.city : "";
            self.state = data.state ? data.state : "";
            self.id = data.id ? data.id : generateId();
            self.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
            self.groups = data.groups ? data.groups.map(x => new Group(x)) : [];
        }
        else {
            self.id = generateId();
            self.firstName = "";
            self.lastName = "";
            self.middleName = "";
            self.address = "";
            self.city = "";
            self.state = "";
            self.id = generateId();
            self.creationDate = new Date().getTime();
            self.groups = [];
        }


        self.name = self.lastName + ", " + self.firstName + " " + self.middleName;
    }

    return constructor;
})();


Vue.component('nav-bar', {
    methods: {
        showDecisionList: function () {
            this.$emit("showdecisionlist");
        },
        showGroupList: function () {
            this.$emit("showgrouplist");
        },
        showVoterList: function () {
            this.$emit("showvoterlist");
        }

    },
    template: $("#tmpNavBar").html()
});

Vue.component('data-table', {
    model: {
        event: "change"
    },
    data: function () {
        return {
            search: ""

            , slots: [
                'body',
                'body.append',
                'body.prepend',
                'footer',
                'header.data-table-select',
                'header',
                'progress',
                'item.data-table-select',
                'item.<name>',
                'no-data',
                'no-results',
                'top',
            ]
        };
    },
    props: {
        showActions: { type: Boolean }
        , header: { type: String }
        , data: { type: Array }
        , query: { type: Function }
    },
    methods: {
        generic_filter: function (value, query, item) {
            console.log("generic_filter", value, query, item);
            return filterOnAllProps(value, query, item);
        },
        search_onchange: function (text) {
            console.log("data-table emitting search_onchange", text, this.header);
            this.$emit("search_onchange", text, this.header);
        },
        row_onclick: function (item) {
            console.log("data-table emitting row_onclick", item);
            this.$emit("row_onclick", item, this.header);
        },
        deleteItem: function (id) {
            console.log("data-table emitting deleteItem");
            this.$emit("delete_item", id);
        },
        select: function (id) {
            console.log("data-table emitting select", id);
            this.$emit("select", id);
        },
        dateDisplay: function (value) {
            return new Date(value).toLocaleString("en-us", dateTimeOptions);
        }
    },
    computed: {
        statusDisplay: function () {
            return statuses.get(value);
        }
        , headers: function () {
            var returnMe = [];

            switch (this.header) {
                case "Voters":
                    returnMe = [
                        { text: 'Name', value: 'name' },
                        { text: 'Groups', value: 'groups' },
                        { text: 'Created', value: 'creationDate' }
                    ];
                    break;

                case "Decisions":
                    returnMe = [
                        { text: 'Name', value: 'name' },
                        { text: 'Status', value: 'statusId' },
                        { text: 'Created', value: 'creationDate' },
                        { text: 'Expires', value: 'expirationDate' },
                    ];
                    break;

                case "Groups":
                    returnMe = [
                        { text: 'Name', value: 'name' },
                        { text: 'Group', value: 'parentId' },
                        { text: 'Type', value: 'type' },
                        { text: 'Created', value: 'creationDate' },
                        { text: 'Attachments', value: 'attachments' }
                    ];
                    break;

                default:
                    returnMe = [];
                    break;

            }

            if (this.showActions) {
                returnMe.push({ text: 'Actions', value: 'action', sortable: false });
            }

            return returnMe;
        }

    },
    watch: {
    },
    mounted: function () {
    },
    template: $("#tmpDataTable").html()
});

Vue.component('decision-detail', {
    model: {
        event: "change"
    },
    data: function () {
        return {
            search: "",
            currentSorting: 'none',
            isSelectingGroup: false,
            showDiscussion: false,
            showVotes: false,
            decision: new Decision()
        };
    },
    props: {
        value: { type: Object }
        , editable: { type: Boolean }
    },
    methods: {
        sortComments: function (key) {
            this.currentSorting = key;
            this.comments.sort(function (a, b) {
                return a[key] < b[key]
                    ? -1
                    : a[key] > b[key]
                        ? 1
                        : 0;
            });
        },
        voteYes: function () {
            throw ("not implemented");
        },
        voteNo: function () {
            throw ("not implemented");
        },
        addComment: function () {
            throw ("not implemented");
        },
        uploadAttachment: function () {
            throw ("not implemented");
        },
        showVoterDetail: function (voter) {
            console.log("decision-detail emitting showDetail");
            this.$emit("show-detail", voter, "Voter");
        },
        showDetail: function (data) {
            console.log("decision-detail emitting showDetail");
            this.$emit("show-detail", data, "Decision");
        },
        setGroup: function (id) {
            console.log("decision-detail setGroup");
            this.decision.groupId = id;

        },
        selectGroup: function () {
            var self = this;
            this.isSelectingGroup = true;
            Vue.nextTick(function () {
                $(self.$el).find(".modal.group").dialog({
                    modal: true,
                    width: "70%"
                });

            });
        },
        getDate: function (date) {
            return new Date(date).toLocaleString();
        }
        , save_onclick: function () {
            this.$emit("change", this.decision);
            console.log("decision-detail save_onclick emitting change", this.decision);
        }
        , delete_onclick: function () {
            this.$emit("delete", this.decision);
            console.log("decision-detail delete_onclick emitting change", this.decision);
        }
    },
    computed: {
        votable: function () {
            return this.decision.status === 1;
        },
        group: function () {
            return getItemById(this.value.groupId, this.groups);
        },
        votesDisplay: function () {
            if (this.decision) {
                return this.decision.votes.map(function (x) {
                    return {
                        name: getItemById(x.voterId, voters)
                        , id: x.voterId
                        , choice: this.choices[x.selectedIndex]
                        , time: x.time
                    };
                });
            } else {
                return [];
            }
        }
    },
    watch: {
        value: function (current, old) {
            this.decision = new Decision(current);
        }
        //decision: {
        //    handler: function (current, old) {
        //        this.$emit("change", current);
        //        console.log("decision-detail watch emitting change", current);
        //    },
        //    deep: true
        //}
    },

    mounted: function () {
        // for some reason we need this to establish reactivity,
        // without it, we don't get reactivity until an emit is triggered
        this.decision = new Decision(this.value);
    },
    template: $("#tmpDecisionDetail").html()
});

Vue.component('group-detail', {
    model: {
        event: "change"
    },
    data: function () {
        return {
            isAddingChild: false,
            isSelectingGroup: false,
            group: new Group()
        };
    },
    props: {
        value: { type: Object }
        , editable: { type: Boolean }
        , voters: { type: Array }
        , groups: { type: Array }
    },
    methods: {
        search_onchange: function (text, header) {
            console.log("group-detail search_onchange", text, header);
            if (header.indexOf("Groups")) {
                this.searchGroups(text);
            }

            if (header.indexOf("Voters")) {
                this.searchVoters(text);
            }
        },
        searchGroups: function (text) {
            console.log("group-detail emitting search_onchange");
            this.$emit("search_onchange", text, "Groups");
        },
        searchVoters: function (text) {
            console.log("group-detail emitting search_onchange");
            this.$emit("search_onchange", text, "Voters");
        },
        makeDecision_onclick: function () {
            var d = new Decision();
            d.groupId = this.group.id;

            this.$emit("decisions_loaded", [d]);
            this.showDecisionDetail(d);
        },
        showChildDetail: function (item) {
            console.log("group-detail emitting showChildDetail");
            this.$emit("show-detail", item, this.header);
        },
        showGroupDetail: function (group) {
            console.log("group-detail emitting showGroupDetail");
            this.$emit("show-detail", group, "Groups");
        },
        showDecisionDetail: function (decision) {
            console.log("group-detail emitting showDecisionDetail", decision);
            this.$emit("show-detail", decision, "Decisions");
        },
        setGroup: function (id) {
            console.log("group-detail setGroup");
            this.value.parentId = id;

        },
        selectGroup: function () {
            var self = this;
            this.isSelectingGroup = true;
            Vue.nextTick(function () {
                $(self.$el).find(".modal.parent").dialog({
                    modal: true,
                    width: "70%"
                });
            });
        },
        showAddChild: function () {
            var self = this;
            this.isAddingChild = true;

            if (self._modal) {
                $(self._modal).show();
            } else {
                Vue.nextTick(function () {
                    self._modal = $(self.$el).find(".modal.children").dialog({
                        modal: true,
                        width: "70%"
                    });
                });
            }
        },
        removeGroup: function (index) {
            this.$emit("removeGroup", index);
            //this.group.groups.splice(index, 1);
        },
        addGroup: function (data) {
            this.$emit("addGroup", data);
            //this.group.groups.push(data);
        },
        removeVoter: function (index) {
            this.$emit("removeVoter", index);
            //this.group.voters.splice(index, 1);
        },
        addVoter: function (data) {
            this.$emit("addVoter", data);
            //this.group.voters.push(data);
        },
        childrenQuery: function () {
            var self = this;
            return self.value.type === GROUP_GROUP_TYPE
                ? dataAccess.getGroups
                : dataAccess.getVoters;
        },
        removeChild: function (index) {
            var self = this;
            return self.value.type === GROUP_GROUP_TYPE
                ? self.removeGroup(index)
                : self.removeVoter(index);
        },
        addChild: function (data) {
            var self = this;
            return self.value.type === GROUP_GROUP_TYPE
                ? self.addGroup(data)
                : self.addVoter(data);
            //this.group.voters.push(data);
        }
        , save_onclick: function () {
            this.$emit("change", this.group);
            console.log("group-detail save_onclick emitting change", this.group);
        }
        , delete_onclick: function () {
            this.$emit("delete", this.group.id);
            console.log("group-detail delete_onclick emitting change", this.group);
        }

    },
    computed: {
        parentsDisplay: function () {
            return this.group.parentGroups.map(x => getItemById(x.id, this.groups));
        },
        header: function () {
            if (!!this.value) {
                return this.value.type === GROUP_GROUP_TYPE ? "Groups" : "Voters";
            }
        },
        groupsDisplay: function () {
            var self = this;
            return self.value.groups.map(function (c) {
                return getItemById(c, self.groups);
            });
        },
        votersDisplay: function () {
            var self = this;
            if (self.value.voters) {
                return self.value.voters;
                //    .map(function (c) {
                //    //todo maybe not store all the voters in one collection
                //    //and instead just use the ones sent back from the server
                //    return getItemById(c, self.voters);
                //});
            } else {
                return [];
            }
        },
        childrenDisplay: function () {
            var self = this;

            if (!!self.value) {
                return self.value.type === GROUP_GROUP_TYPE
                    ? self.groupsDisplay
                    : self.votersDisplay;
            }
            else {
                return null;
            }
        },
        addChildButtonText: function () {
            var self = this;

            if (!!self.value) {
                return self.value.type === GROUP_GROUP_TYPE
                    ? "Add Group"
                    : "Add Voter";
            }
            else {
                return null;
            }
        },
        decisionsDisplay: function () {
            return this.group.decisions;
        },
        childSelectionList: function () {
            var self = this;

            if (!!self.value) {
                var list = self.value.type === 0 ? self.voters : self.groups;
                var exclusionList = self.value.type === 0 ? self.value.voters : self.value.groups;

                return list.filter(function (x) {
                    return !exclusionList ||
                        (exclusionList &&
                            exclusionList.findIndex(function (y) {
                                return y.id === x.id;
                            }) === -1);
                });
            }
            else {
                return [];
            }
        }
    },
    watch: {
        value: {
            handler: function (current, old) {
                this.group = new Group(current);
            },
            deep: true
        }
    },
    mounted: function () {
        let self = this;
        // for some reason we need this to establish reactivity,
        // without it, we don't get reactivity until an emit is triggered
        self.group = new Group(this.value);

        if (self.group.id > 0) {
            dataAccess.getDecisionsByGroupId(self.group.id).then(function (result) {
                self.group.decisions = result.map(x => new Decision(x));
                self.$emit("decisions_loaded", result);
            });
        }
    },
    template: "#tmpGroupDetail"
});

Vue.component('voter-detail', {
    model: {
        event: "change"
    },
    data: function () {
        return {
            isSelectingGroup: false,
            voter: new Voter()
            , isLoading: false
            , search: ""
            , timeout: null
        };
    },
    props: {
        value: { type: Object }
        , editable: { type: Boolean }
        , groups: { type: Array }
        , users: { type: Array }
    },
    methods: {
        findUser: function (text) {
            console.log("voter-detail emitting findUser");
            this.$emit("find-user", text);
            this.isLoading = true;
        },
        showDetail: function (voter, header) {
            console.log("voter-detail emitting showDetail");
            this.$emit("show-detail", voter, header);
        },
        setupParentSelect: function () {
            var self = this;
            this.isSelectingGroup = true;
            Vue.nextTick(function () {
                $(self.$el).find(".modal.group").dialog({
                    modal: true,
                    width: "70%"
                });

            });
        },
        selectParent: function (id) {
            this.voter.groups.push(id);
        },
        removeParent: function (id) {
            this.voter.groups.splice(this.voter.groups.findIndex(x => x.id === id));
        }
        , save_onclick: function () {
            this.$emit("change", this.voter);
            console.log("group-detail save_onclick emitting change", this.voter);
        }
        , delete_onclick: function () {
            this.$emit("delete", this.voter);
            console.log("group-detail delete_onclick emitting delete", this.voter);
        }
        , user_onchange: function (user) {
            console.log("user_onchange", user);
            this.voter = user;
        }
    },
    computed: {
        groupsDisplay: function () {
            return this.voter.groups
                .map(x => getItemById(x.id, this.groups));
        },
        group: function () {

            //what to do here
            return getItemById(this.voter.groups, this.groups);
        },
        usersDisplay: function () {
            return this.users.map(x => x.lastName + ", " + x.firstName + " " + x.middleName);
        }
    },
    watch: {
        value: {
            handler: function (current, old) {
                //this.$emit("change", current);
                this.voter = new Voter(current);
                //this.user = new User(current);
                //console.log("voter-detail emitting change", current, this.index);
            },
            deep: true
        }
        , users: {
            handler: function (current, old) {
                this.isLoading = false;
            },
            deep: false
        }
        , search: {
            handler: function (current, old) {
                let self = this;
                clearTimeout(this.timeout);

                this.timeout = setTimeout(function () {
                    if ((current != null) && (current.length > 2)) {
                        self.isLoading = true;
                        self.findUser(current);
                    }
                }, 1000);
            },
            deep: false
        }
    },
    mounted: function () {
        // for some reason we need this to establish reactivity,
        // without it, we don't get reactivity until an emit is triggered
        this.voter = new Voter(this.value);
        this.search = this.voter.name;
        this.user = this.users.find(x => x.id === this.voter.id);
        if (!this.user) {
            this.user = new Voter();
        }
    },
    template: $("#tmpVoterDetail").html()
});

var vue = new Vue({
    el: "#vue",
    vuetify: new Vuetify(),
    data: function () {
        return {

            currentComponent: "",
            currentData: "",
            currentDecision: new Decision(),
            currentVoter: new Voter(),
            currentGroup: new Group(),
            currentHeader: "",
            decisions: [],
            voters: [],
            groups: [],
            users: []
        };
    },
    methods: {
        union: function (set, cacheMe) {
            if (cacheMe.length > 0) {
                cacheMe.forEach(x => {
                    if (!set.some(d => d.id === x.id)) {
                        set.push(x);
                    }
                });
            }
            return set;
        },
        cacheDecisions: function (decisions) {
            var self = this;

            self.decisions = self.union(self.decisions, decisions);
        },
        cacheGroups: function (groups) {
            var self = this;

            self.groups = self.union(self.groups, groups);
        },
        cacheUsers: function (users) {
            var self = this;

            self.users = self.union(self.users, users);
        },
        cacheVoters: function (voters) {
            var self = this;

            self.voters = self.union(self.voters, voters);
        },
        search_onchange: function (text, query) {
            if (query.indexOf("Decision") > -1) {
                this.queryDecisions(text);
            }
            else if (query.indexOf("Group") > -1) {
                this.queryGroups(text);
            }
            else if (query.indexOf("User") > -1) {
                this.queryUsers(text);
            }
            else /*if (query === "Voters")*/ {
                this.queryVoters(text);
            }
        },
        create_onclick: function (event) {
            if (this.currentHeader.indexOf("Decision") > -1) {
                this.createDecision();
            }
            else if (this.currentHeader.indexOf("Group") > -1) {
                this.createGroup();
            }
            else /*if (this.currentHeader === "Voters")*/ {
                this.createVoter();
            }
        },
        deleteDecision: function (id) {
            var self = this;
            console.log("deleteDecision", id);
            this.currentDecision = null;
            dataAccess.deleteDecision(id).then(function (result) {
                self.decisions.splice(self.decisions.findIndex(x => x.id === id), 1);
            })
                .catch(function () {
                    console.log("error during delete");
                });
        },
        persistDecision: function (data) {
            if (isNaN(data.id) && data.id.indexOf("id") > -1) {
                this.saveDecision(data);
            }
            else {
                this.updateDecision(data);
            }
        },
        persistGroup: function (data) {
            if (isNaN(data.id) && data.id.indexOf("id") > -1) {
                this.saveGroup(data);
            }
            else {
                this.updateGroup(data);
            }
        },
        persistVoter: function (data) {
            if (isNaN(data.id) && data.id.indexOf("id") > -1) {
                this.saveVoter(data);
            }
            else {
                this.updateVoter(data);
            }
        },
        saveDecision: function (data) {
            var self = this;
            console.log("saveDecision", data.id);
            this.currentDecision = data;
            dataAccess.postDecision(data)
                .then(function (result) {
                    var d = new Decision(result);
                    self.cacheDecisions([d]);
                    self.currentDecision = d;
                }).catch(function (err) {
                    console.log("error during insert");
                });
        },
        updateDecision: function (id, data) {
            var self = this;
            console.log("updateDecision", data);
            this.currentDecision = data;
            dataAccess.putDecision(id, data)
                .then(function (result) {
                    self.decisions[self.decisions.findIndex(x => x.id === result.id)] = new Decision(result);
                    self.currentDecision = new Decision(result);
                })
                .catch(function () {
                    console.log("error during update");
                });
        },
        deleteGroup: function (id) {
            var self = this;
            console.log("deleteGroup", id);
            this.currentGroup = new Group();

            dataAccess.deleteGroup(id)
                .then(function (result) {
                    self.groups.splice(self.groups.findIndex(x => x.id === id), 1);
                })
                .catch(function () {
                    console.log("error during delete");
                });
        },
        deleteVoter: function (voter) {
            var self = this;
            console.log("deleteVoter", voter);
            this.currentVoter = null;
            dataAccess.deleteVoter(voter.id)
                .then(function (result) {
                    self.voters.splice(self.voters.findIndex(x => x.id === voter.id), 1);
                })
                .catch(function () {
                    console.log("error during delete");
                });

        },
        saveGroup: function (data) {

            console.log("saveGroup", data);
            var self = this;
            this.currentGroup = data;

            dataAccess.postGroup(data)
                .then(function (result) {
                    var g = new Group(result);
                    self.cacheGroups(g);
                    self.currentGroup = g;
                    //console.log("result", g.id);
                }).catch(function (err) {
                    console.log("error during insert");
                });

        },
        updateGroup: function (data) {
            console.log("updateGroup", data);
            var self = this;
            this.currentGroup = data;

            dataAccess.putGroup(data)
                .then(function (result) {
                    self.currentGroup = new Group(result);
                    self.groups[self.groups.findIndex(x => x.id === result.id)] = self.currentGroup;
                    //getItemById(result.id, self.groups) = result;
                }).catch(function (err) {
                    console.log("error during insert");
                });
        },
        saveVoter: function (data) {
            console.log("saveVoter", data);
            var self = this;
            this.currentVoter = data;

            dataAccess.postVoter(new PersistVoter(data))
                .then(function (result) {
                    var v = new Voter(result);
                    self.cacheVoters([v]);
                    self.currentVoter = v;
                    //console.log("result", v.id);
                }).catch(function (err) {
                    console.log("error during insert");
                });

        },
        updateVoter: function (data) {
            console.log("updateVoter", data);
            var self = this;
            this.currentVoter = data;

            dataAccess.putVoter(data)
                .then(function (result) {
                    self.currentVoter = new Voter(result);
                    self.voters[self.voters.findIndex(x => x.id === result.id)] = self.currentVoter;
                    //getItemById(result.id, self.voters) = result;
                }).catch(function (err) {
                    console.log("error during insert");
                });
        },
        onchange: function (value) {
            this.data = value;
            console.log("this probably isn't working");
        },
        createDecision: function () {
            //this.currentDecision = new Decision();
            //this.decisions.push(this.currentDecision);
            this.showDecisionDetail(null, false, false);
        },
        createGroup: function () {
            //this.currentGroup = new Group();
            //this.groups.push(this.currentGroup);
            this.showGroupDetail(null, false, false);
        },
        queryUsers: function (text) {
            console.log("queryUsers", text)
            var self = this;
            var result = this.users.find(x => filterOnAllProps(null, text, x));

            if (!!result) {
                return result;
            }
            else {
                dataAccess.getUserByName(text)
                    .then(function (result) {
                        self.cacheUsers(result.map(x => new User(x)));
                    });
            }
        },
        queryGroups: function (text) {
            console.log("queryGroups", text);
            let self = this;
            var result = this.groups.find(x => filterOnAllProps(null, text, x));

            if (!!result) {
                return result;
            }
            else {
                dataAccess.queryGroups(text)
                    .then(function (result) {
                        self.cacheGroups(result.map(x => new Group(x)));
                    });
            }
        },
        queryDecisions: function (text) {
            console.log("queryDecisions", text);
            let self = this;
            var result = this.decisions.find(x => filterOnAllProps(null, text, x));

            if (!!result) {
                return result;
            }
            else {
                dataAccess.queryDecisions(text)
                    .then(function (result) {
                        self.cacheDecisions(result.map(x => new Group(x)));
                    });
            }
        },
        queryVoters: function (text) {
            console.log("queryVoters", text);
            let self = this;
            var result = this.users.find(x => filterOnAllProps(null, text, x));

            if (!!result) {
                return result;
            }
            else {
                dataAccess.queryVoters(text)
                    .then(function (result) {
                        self.cacheVoters(result.map(x => new Group(x)));
                    });
            }
        },
        createVoter: function () {
            //this.currentVoter = new Voter();
            //this.voters.push(this.currentVoter);
            this.showVoterDetail(null, false, false);
        },

        showDecisionList: function () {
            this.currentData = this.decisions;
            this.currentHeader = "Decisions";
            this.currentComponent = "data-table";
        },
        showDetail: function (item, header) {
            if (header.indexOf("Group") > -1) {
                this.showGroupDetail(item);
            }
            else if (header.indexOf("Decision") > -1) {
                this.showDecisionDetail(item);
            }
            else /*if (header === "Voters")*/ {
                this.showVoterDetail(item);
            }
        },
        showDecisionDetail: function (item, showVotes, showDiscussion) {
            if (item && item.id) {
                this.currentDecision = this.decisions.find(function (x) {
                    return x.id === item.id;
                });
            }
            else {
                this.currentDecision = item;
            }

            this.showVotes = showVotes;
            this.showDiscussion = showDiscussion;

            // this.currentData = this.currentDecision;
            this.currentHeader = "Decision";
            this.currentComponent = "decision-detail";
        },
        showGroupList: function () {
            this.currentData = this.groups;
            this.currentHeader = "Groups";
            this.currentComponent = "data-table";
        },
        showGroupDetail: function (item) {
            this.currentGroup = null;
            if (item && item.id) {
                this.currentGroup =
                    new Group(this.groups.find(function (x) {
                        return x.id === item.id;
                    }));
            }
            else {
                this.currentGroup = new Group(item);
            }

            // this.currentData = this.currentGroup;
            this.currentHeader = "Group";
            this.currentComponent = "";
            this.currentComponent = "group-detail";
        },
        showVoterList: function () {
            this.currentData = this.voters;
            this.currentHeader = "Voters";
            this.currentComponent = "data-table";
        },
        showVoterDetail: function (voter) {

            if ((voter != null) && (voter.id)) {
                this.currentVoter =
                    this.voters.find(function (x) {
                        return x.id === voter.id;
                    });
            } else {
                this.currentVoter = new Voter(voter);
            }

            //this.currentData = this.currentVoter;
            this.currentHeader = "Voters";
            this.currentComponent = "";
            this.currentComponent = "voter-detail";
        },
        removeGroupFromGroup: function (index) {
            this.currentGroup.groups.splice(index, 1);
        },
        addGroupToGroup: function (id) {
            if (this.currentGroup.groups.findIndex(x => x.id === id) === -1) {
                this.groups[this.groups.findIndex(x => x.id === id)].groups.push(this.currentGroup.id);
                this.currentGroup.groups.push(id);
                dataAccess.putGroupGroup(this.currentGroup.id, id);
            }
            else {
                //tell the user they can't add the same thing twice
            }
        },
        removeVoterFromGroup: function (index) {
            this.currentGroup.voter.splice(index, 1);
        },
        addVoterToGroup: function (item) {
            if (this.currentGroup.voters.findIndex(x => x.id === item.id) === -1) {
                this.voters[this.voters.findIndex(x => x.id === item.id)].groups.push(this.currentGroup.id);
                this.currentGroup.voters.push(item);
                dataAccess.putGroupVoter(this.currentGroup.id, item.id);
            }
            else {
                //tell the user they can't add the same thing twice
            }
        },
        rowSelect: function (id) {
            showDetail(id, header);
        }
    },
    computed: {

        currentEvents: function () {
            switch (this.currentComponent) {
                case "decision-detail":
                    return {
                        "delete": this.deleteDecision,
                        "change": this.persistDecision,
                        "show-detail": this.showDetail,
                    };
                case "group-detail":
                    return {
                        "voters": this.voters,
                        "groups": this.groups,
                        "change": this.persistGroup,
                        "search_onchange": this.search_onchange,
                        "delete": this.deleteGroup,
                        "show-detail": this.showDetail,
                        "removeGroup": this.removeGroupFromGroup,
                        "addGroup": this.addGroupToGroup,
                        "removeVoter": this.removeVoterFromGroup,
                        "addVoter": this.addVoterToGroup,
                        "decisions_loaded": this.cacheDecisions
                    };
                case "voter-detail":
                    return {
                        "change": this.persistVoter,
                        "delete": this.deleteVoter,
                        "show-detail": this.showDetail,
                        "search_onchange": this.queryUsers,
                        "find-user": this.queryUsers
                    };
                case "data-table":
                    return {
                        "row_onclick": this.showDetail,
                        "search_onchange": this.search_onchange
                    };
                default: return {};
            }
        },
        currentProperties: function () {
            switch (this.currentComponent) {
                case "decision-detail":
                    return {
                        "value": this.currentDecision,
                        "editable": true
                    };
                case "group-detail":
                    return {
                        "value": this.currentGroup,
                        "groups": this.groups,
                        "voters": this.voters,
                        "editable": true
                    };
                case "voter-detail":
                    return {
                        "value": this.currentVoter,
                        "groups": this.groups,
                        "users": this.users,
                        "editable": true
                    };
                case "data-table":
                    return {
                        "data": this.currentData,
                        "header": this.currentHeader
                    };
                default: return {};
            }
        }
    }
    , watch: {

        decisions: function (current, old) {
            if (this.currentHeader.indexOf("Decision") > -1) {
                this.currentData = current;
            }
        },
        voters: function (current, old) {
            if (this.currentHeader === "Voters") {
                this.currentData = current;
            }
        },
        groups: function (current, old) {
            if (this.currentHeader.indexOf("Group") > -1) {
                this.currentData = current;
            }
        }
    }
    , mounted: function () {
        var self = this;
        dataAccess.getDecisionsByUserId(1)
            .then(function (data) {
                self.decisions = data.map(x => new Decision(x));
            })
            .catch(function (err) {
                console.log("failed to get decisions");
            });

        //todo this should only get groups that relate to the id of the current user
        dataAccess.getGroups()
        //dataAccess.getGroupsByUserId(1)
            .then(function (data) {
                self.groups = data.map(x => new Group(x));
            })
            .catch(function (err) {
                console.log("failed to get groups");
            });

        dataAccess.getVoters()
            .then(function (data) {
                self.voters = data.map(x => new Voter(x));
            })
            .catch(function (err) {
                console.log("failed to get voters");
            });

        dataAccess.getUsers()
            .then(function (data) {
                self.users = data.map(x => new User(x));
            })
            .catch(function (err) {
                console.log("failed to get users");
            });
    }
});

function getItemById(id, collection) {
    var item = collection.find(function (x) {
        return x.id === id;
    });

    return item ? item : null;
}

function generateId() {
    var d = new Date();
    var seconds = d.getSeconds();
    var milliseconds = d.getMilliseconds();
    return "id" + (seconds * 1000) + milliseconds;
}

function filterOnAllProps(value, query, item) {
    return !!item
        ? JSON.stringify(item)
            .indexOf(query) > -1
        : false;
}