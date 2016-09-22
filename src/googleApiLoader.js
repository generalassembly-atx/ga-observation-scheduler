const app_settings = {
  "client_id": "648521769057-js89ok1kb2vrt4pp7bg19mbtaukgr214.apps.googleusercontent.com",
  "libraries": [
    {
      "name": "compute",
      "version": "v1"
    },
    {
      "name": "calendar",
      "version": "v3"
    }

  ],
  "scopes": [
    "https://www.googleapis.com/auth/compute.readonly",
    "https://www.googleapis.com/auth/compute",
    "https://www.googleapis.com/auth/calendar"
  ]
}
var clientsLoaded = 0;

var sign2Loaded = false;
var auth2Loaded = false;
var auth2;

// if (app_settings.scopes.indexOf('profile') === -1)
//     app_settings.scopes.push('profile');

module.exports = {
    clientsLoaded: function (callback) {

        var ids = 0;

        var check = function () {
            if (ids++ > 1000 || app_settings.libraries.length === clientsLoaded) {
                callback();
            }
            else {
                window.setTimeout(function () {
                    check();
                }, 50);
            }
        }

        check();
    },
    authLoaded: function (callback) {
        var check = function () {
            if (auth2Loaded && sign2Loaded) {
                callback();
            }
            else {
                window.setTimeout(function () {
                    check();
                }, 50);
            }
        }

        check();
    },
    gapiLoaded: function (callback) {
        var hasgapi = function () {
            if (typeof (gapi) !== "undefined" && gapi.client) {
                callback();
            }
            else {
                window.setTimeout(function () {
                    hasgapi();
                }, 50);
            }
        }

        hasgapi();
    },
    getAuth2: function () {
        return auth2;
    },
    signIn: function () {

        var options = new gapi.auth2.SigninOptionsBuilder({
            scope: "https://www.googleapis.com/auth/calendar"
        });
        console.log('options ', options);
        console.log('scopes ', gapi.auth2);

        this.getAuth2().signIn(options).then(function (success) {
        }, function (fail) {
        });
    }
};


module.exports.gapiLoaded(function () {

    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: app_settings.client_id,
            scopes: app_settings.scopes.join(' ')
        });
        auth2Loaded = true;
    });

    gapi.load('signin2', function () {
        sign2Loaded = true;
    });

    var clientLoaded = function clientLoaded() {
        clientsLoaded++;
    }

    for (var i = 0; i < app_settings.libraries.length; i++) {
      var client = app_settings.libraries[i];
      gapi.client.load(client.name, client.version, clientLoaded);
    }

});
