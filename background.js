chrome.browserAction.onClicked.addListener(function() {
  chrome.windows.getCurrent(function(win) {
    chrome.tabs.getSelected(win.id, actionClicked);
  });
});

var version = "1.0";

function actionClicked(tab) {
  chrome.debugger.attach({tabId:tab.id}, version, onAttach.bind(null, tab.id));
}

function onAttach(tabId) {
  if (chrome.extension.lastError) {
    alert(chrome.extension.lastError.message);
    return;
  }

  chrome.windows.create(
      {url: "paint-times.html?" + tabId, type: "popup", width: 800, height: 600});
}
