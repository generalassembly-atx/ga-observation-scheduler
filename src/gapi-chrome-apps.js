
(function () {
  if (typeof gapi !== 'undefined')
    throw new Error('gapi already defined.');
  if (typeof gapiLoaded !== 'function')
    throw new Error('gapiIsLoaded callback function must be defined prior to ' +
                    'loading gapi-chrome-apps.js');

  // If not running in a chrome packaged app, load web gapi:
  if (!(chrome && chrome.app && chrome.app.runtime)) {
    // Load web gapi.
    var script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js?onload=gapiIsLoaded';
    document.documentElement.appendChild(script);
    return;
  }

  window.gapi = {};
  window.gapi.auth = {};
  window.gapi.client = {};

  var access_token = undefined;

  gapi.auth.authorize = function (params, callback) {
    if (typeof callback !== 'function')
      throw new Error('callback required');

    var details = {};
    details.interactive = params.immediate === false || false;
    if (params.accountHint) {
      // Specifying this prevents the account chooser from appearing on Android.
      details.accountHint = params.accountHint;
    }
    console.assert(!params.response_type || params.response_type == 'token');

    var gapiLoaded = function (callback) {
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
    }

    var callbackWrapper = function (getAuthTokenCallbackParam) {
      access_token = getAuthTokenCallbackParam;
      // TODO: error conditions?
      if (typeof access_token !== 'undefined')
        callback({ access_token: access_token});
      else
        callback();
    }

    chrome.identity.getAuthToken(details, callbackWrapper);
  };


  gapi.client.request = function (args) {
    if (typeof args !== 'object')
      throw new Error('args required');
    if (typeof args.callback !== 'function')
      throw new Error('callback required');
    if (typeof args.path !== 'string')
      throw new Error('path required');

    if (args.root && args.root === 'string') {
      var path = args.root + args.path;
    } else {
      var path = 'https://www.googleapis.com' + args.path;
    }

    if (typeof args.params === 'object') {
      var deliminator = '?';
      for (var i in args.params) {
        path += deliminator + encodeURIComponent(i) + "="
          + encodeURIComponent(args.params[i]);
        deliminator = '&';
      }
    }

    var xhr = new XMLHttpRequest();
    xhr.open(args.method || 'GET', path);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    if (typeof args.body !== 'undefined') {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(args.body));
    } else {
      xhr.send();
    }

    xhr.onerror = function () {
      // TODO, error handling.
      debugger;
    };

    xhr.onload = function() {
      var rawResponseObject = {
        // TODO: body, headers.
        gapiRequest: {
          data: {
            status: this.status,
            statusText: this.statusText
          }
        }
      };

      var rawResp = JSON.stringify(rawResponseObject);
      if (this.response) {
        var jsonResp = JSON.parse(this.response);
        args.callback(jsonResp, rawResp);
      } else {
        args.callback(null, rawResp);
      }
    };
  };

  // Call client handler when gapi is ready.
  setTimeout(function () { gapiLoaded(); }, 0);
})();
