exports.Get = function (badgeContent, callback, sender) {
  var tabId = sender.tab.id;
  chrome.browserAction.setIcon({
    tabId: tabId,
    path: {
      '19': 'icons/icon19.png',
      '38': 'icons/icon38.png'
    }
  });
  if (badgeContent > 0) {
    //Display the browser button only when there are more than 1 articles on the page
    chrome.browserAction.setBadgeText({
      text: badgeContent.toString(),
      tabId: tabId
    });
    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: 'popup.html'
    });
  }
};