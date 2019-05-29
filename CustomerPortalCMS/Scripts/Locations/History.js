var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = function () {
    function Session() {
        _classCallCheck(this, Session);
    }

    _createClass(Session, [{
        key: 'set',
        value: function set(id, value) {
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') value = JSON.stringify(value);
            sessionStorage.setItem(id, value);
        }
    }, {
        key: 'get',
        value: function get(id) {
            var value = sessionStorage.getItem(id);
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        }
    }, {
        key: 'remove',
        value: function remove(id) {
            sessionStorage.removeItem(id);
        }
    }]);

    return Session;
}();

window.addEventListener("beforeunload", function (e) {
    if (backButton.saveData)
        backButton.register();
    backButton.setHlength();
});

var backButton = {

    ClearDataOnLoad: true,

    clearData: false,

    saveData: false,

    Key: "pagedata",

    db: new Session(),

    identity: "20171110",

    allowRestoreForThePage: false,

    element: null,

    enablePageRestore: function () {
        this.saveData = true;
    },

    register: function () {
        if (backButton.saveData) {
            var data = this.data();
            data.html = this.element.html();
            data.url = location.href;
            this.db.set(this.Key, data);
        }
    },

    restore: function () {
        if (backButton.saveData && backButton.allowRestoreForThePage) {
            var data = this.data();
            if (data != null && data.restoredata && data.url == location.href) {
                this.element.html(data.html);
                this.clearData = true;
            }
        }
    },

    setHlength: function () {
        var data = this.data();
        data.hlength = history.length;
        this.db.set(this.Key, data);
    },

    ISBackButtonPresssed: function () {
        var data = this.data();
        return (data.hlength == history.length);

    },

    enableRestoreOnLoad: function () {
        var data = this.data();
        data.restoredata = true;
        this.db.set(this.Key, data);
    },

    DisableRestoreOnLoad: function () {
        var data = this.data();
        data.restoredata = false;
        this.db.set(this.Key, data);
    },

    remove: function () {
        if (backButton.clearData) {
            this.db.remove(this.Key);
        }
    },

    emptyData: function () {
        return {
            identity: backButton.identity,
            restoredata: false,
            hlength: -2,
            html: "",
            url: ""
        };
    },

    IsRestorable: function () {
        var data = this.data();
        return data.restoredata;
    },

    additionalData: function () {
        var data = this.data();
        return data.additionalData;
    },

    updateData: function (additionalData) {
        var data = this.data();
        data.additionalData = additionalData;
        this.db.set(this.Key, data);
    },

    onRestoreLoad: function () { },

    onReady: function () { },

    data: function () {
        try {
            var data = this.db.get(this.Key);
            if (data == null || data.identity == null || data.identity != this.identity) {
                data = this.emptyData();
                data.additionalData = {};
                data.additionalData.test = true;
            }
            return data;
        }
        catch (ex) {
            return this.emptyData();
        }
    }
};

if (backButton.IsRestorable() && backButton.ISBackButtonPresssed()) {
    var ready = $.prototype.ready;

    // proxy the ready function
    $.prototype.ready = function (fn, allowed) {
        allowed = allowed || false;

        if (allowed) {
            ready.call(this, fn);
        }
    };

    $(document).ready(function () {
        backButton.restore();
        backButton.onRestoreLoad();
        var data = backButton.additionalData();
        backButton.remove();
        backButton.updateData(data);
        backButton.onReady();
    }, true)
}