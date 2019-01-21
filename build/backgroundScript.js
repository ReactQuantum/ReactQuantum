let devPort;
let devId;

chrome.runtime.onConnect.addListener(function (port) {

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
  port.onMessage.addListener((message) => {
    console.log("message in BG", message)
    if (message.message === 'initialize') {
      devPort = port
      devId = message.tabId
      chrome.tabs.sendMessage(devId, { message: "initialize", id: devId }, () => {
        console.log('chrome.tabs.sendMessage(devId, { message: "initialize", id: devId }')
      })
    }
    // if (message.name === "initialize") {
    //   port.postMessage({ message: "initialize" })
    //   console.log('port.postMessage({ message: "initialize" }) in background)')
    // }
    //console.log("port.onMessage.addListener((message, sender) in background", message)
    if (message.name === "fiberRoot") {
      //console.log("devId", devId)
      devPort.postMessage({ name: 'fiberRoot', message: message.message })
      console.log("devPort.postMessage({ name: 'fiberRoot', message: message.message }) in background")
    }
  })
})


