var Controller = {
  listen: function() {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      console.log(request);
      Controller.caller(request.method, request.data, sendResponse, sender);
      return true;
    });
  },
  caller: function(method, data, sendResponse, sender) {
    var chunks = method.split('.');
    if (chunks.length != 2) {
      throw new Error('The method send to background is incorrect');
    }
    var requireMethod = null,
      require_result = Controller.getRequiredByName(chunks[0]);
    if (require_result && require_result[chunks[1]]) {
      requireMethod = require_result[chunks[1]];
    } else {
      throw new Error('The method "' + method + '" sent to background does not exist');
    }
    requireMethod(data, sendResponse, sender);
    return null;
  },
  getRequiredByName: function(name) {
    switch(name.toLowerCase()) {
      case 'source':
        return require('./public/source');
      default:
        throw new Error('Unable to load the module: ' + name);
    }
  }
};

module.exports = Controller;