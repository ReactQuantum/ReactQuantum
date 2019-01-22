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
      console.log(connections)
      return;
    }
    if (message.target) {
      console.log("targeted message", message)
      var conn = connections[tabId][message.target];
      if (conn) {
        conn.postMessage(message);
      }
    }
  }
  port.onMessage.addListener(extentionListener)
  port.onDisconnect.addListener((port) => {
    console.log("background-script onDisconnect", port);
    var tabs = Object.keys(connections);
    for (var i = 0; i < tabs.length; i++) {
      if (connections[tabs[i]][port.name] === port) {
        console.log("background-script onDisconnect connections cleanup",
          { tabId: tabs[i], portName: port.name });
        delete connections[tabs[i]][port.name];

        // If there is not port associated to the tab, remove it
        // from the connections map.
        if (Object.keys(connections[tabs[i]]).length === 0) {
          console.log("background-script onDisconnect remove connection object",
            { tabId: tabs[i] });
          delete connections[tabs[i]];
        }
        break;
      }
    }
  });
  // if (typeof devPort === 'undefined') {

  //   port.onMessage.addListener((message, sender) => {
  //     if (message.name === "initialize") {
  //       console.log(message)
  //       port.postMessage({ message: "initialize" })
  //       console.log('sent initialization message (devport=undefined, port.sendmessage)')
  //     }
  //     if (message.name === "fiberRoot") {
  //       port.postMessage({ name: 'fiberRoot', message: message.message })
  //       console.log('sent fibernode to devtools (devport=undefined)', devPort)
  //     }
  //   })
  // } else {
  ////////////////////
  // port.onMessage.addListener((message) => {
  //   console.log("message in BG", message)
  //   if (message.message === 'initialize') {
  //     devPort = port
  //     devId = message.tabId
  //     chrome.tabs.sendMessage(devId, { message: "initialize", id: devId }, () => {
  //       console.log('chrome.tabs.sendMessage(devId, { message: "initialize", id: devId }')
  //     })
  //   }

  //   if (message.name === "fiberRoot") {
  //     //console.log("devId", devId)
  //     devPort.postMessage({ name: 'fiberRoot', message: message.message })
  //     console.log("devPort.postMessage({ name: 'fiberRoot', message: message.message }) in background", devPort)
  //   }
  // })
})
/**
 * Receive one-time message from panel and relay to the content script.
 * This is for messages sent through 'chrome.runtime.sendMessage'.
 * We could use port for that but this is here as an example of one-time messages.
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("background-script runtime.onMessage", request, sender);

  // Messages from content scripts should have sender.tab set.
  // The are all relayed to the "panel" connection.
  if (request.target == "content") {
    console.log("startQuantum is here in BG", request)
    chrome.tabs.sendMessage(request.tabId, request);
  }

  return true;
});
////////////////////////

