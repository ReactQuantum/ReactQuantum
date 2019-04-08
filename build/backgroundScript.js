const connections = {};
//check to see if connection is from devtool or content script
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'devTools' && port.name !== 'content') {
    return;
    //check to see if port has been established
  }
  const extentionListener = (message) => {
    const tabId = port.sender.tab ? port.sender.tab.id : message.tabId;

    if (message.message === 'initialize') {
      if (!connections[tabId]) {
        connections[tabId] = {};
      }
      connections[tabId][port.name] = port;
      return;
    }
    if (message.target) {
      const conn = connections[tabId][message.target];
      if (conn) {
        conn.postMessage(message);
      }
    }
  };

  port.onMessage.addListener(extentionListener);
  port.onDisconnect.addListener(() => {
    const tabs = Object.keys(connections);
    for (let i = 0; i < tabs.length; i += 1) {
      if (connections[tabs[i]][port.name] === port) {
        delete connections[tabs[i]][port.name];

        if (Object.keys(connections[tabs[i]]).length === 0) {
          delete connections[tabs[i]];
        }
        break;
      }
    }
  });
});

//sending message from devtool panel to content script
chrome.runtime.onMessage.addListener((request) => {
  if (request.target === 'content') {
    chrome.tabs.sendMessage(request.tabId, request);
  }
  return true;
});
