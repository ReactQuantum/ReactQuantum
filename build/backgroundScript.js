
let connections = {}
let devPort;
let devId;

chrome.runtime.onConnect.addListener(function (port) {

  port.onMessage.addListener((message, sender) => {
    console.log("background", sender, message)
    if (message.name === "initialize") {
      devPort = port
      devId = message.tabId

      chrome.tabs.sendMessage(devId, { message: "initialize", id: devId }, (response) => {
        console.log("response after hello", response)
      })
    } if (message.name === "fiberRoot") {
      //console.log("fiberRoot from content", message.name, message.message)

      devPort.postMessage({ name: 'fiberRoot', message: message.message });
      console.log('sent fibernode to devtools', devPort)
    }
  })
})
