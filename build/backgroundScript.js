let connections = {}
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name != "devTools" && port.name != "content") {
    return;
  }
  let extentionListener = (message) => {
    let tabId = port.sender.tab ? port.sender.tab.id : message.tabId;

    if (message.message == "initialize") {
      if (!connections[tabId]) {
        connections[tabId] = {};
      }
      connections[tabId][port.name] = port;
      return;
    }
    if (message.target) {
      var conn = connections[tabId][message.target];
      if (conn) {
        conn.postMessage(message);
      }
    }
  }
  port.onMessage.addListener(extentionListener)
  port.onDisconnect.addListener((port) => {
    var tabs = Object.keys(connections);
    for (var i = 0; i < tabs.length; i++) {
      if (connections[tabs[i]][port.name] === port) {
        delete connections[tabs[i]][port.name];

        if (Object.keys(connections[tabs[i]]).length === 0) {
          delete connections[tabs[i]];
        }
        break;
      }
    }
  });
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.target == "content") {
    console.log("startQuantum is here in BG", request)
    chrome.tabs.sendMessage(request.tabId, request);
  }
  return true;
});

