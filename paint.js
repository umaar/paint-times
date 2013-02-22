var tabId = parseInt(window.location.search.substring(1));

window.addEventListener("load", function() {
  chrome.debugger.sendCommand({tabId:tabId}, "Timeline.start");
  chrome.debugger.onEvent.addListener(onEvent);
});

window.addEventListener("unload", function() {
  chrome.debugger.detach({tabId:tabId});
});


function onEvent(debuggeeId, message, params) {
  if (tabId != debuggeeId.tabId)
    return;

  if (message === "Timeline.eventRecorded") {
    var records = params.record.children;
    if (records.length) {
      //There's at least 1 record in this frame
      var duration = 0;
      records.forEach(function(record) {
        if (record.type === "Paint") {
          //Get the duration of this Paint record
          duration += record.endTime - record.startTime;
        }
      });
      if (duration) {
        console.log(duration);
      }
    }
  }
}
