const connections = {};
<<<<<<< HEAD
//check to see if connection is from devtool or content script
=======

// Check to see if connection is from devtool or the content script
>>>>>>> 779e9514b2a0133f0cc3ce80d5bc5f8d27cdc77e
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'devTools' && port.name !== 'content') {
    return;
    //check to see if port has been established
  }
// Check to see if the connection has been established and stored in the connection object
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
  // Upon closing the tab, we'll remove the connection from the connections object
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

<<<<<<< HEAD
//sending message from devtool panel to content script
=======
// This is sending a message from the devtool panel to the content script
>>>>>>> 779e9514b2a0133f0cc3ce80d5bc5f8d27cdc77e
chrome.runtime.onMessage.addListener((request) => {
  if (request.target === 'content') {
    chrome.tabs.sendMessage(request.tabId, request);
  }
  return true;
});
