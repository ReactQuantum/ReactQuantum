let devPort;

chrome.runtime.onConnect.addListener(function (port) {

  if (typeof devPort === 'undefined') {
    devPort = port

    port.onMessage.addListener((message, sender) => {
      if (message.name === "initialize") {
        console.log(message)
        port.postMessage({ message: "initialize" })
        console.log('sent initialization message (devport=undefined, port.sendmessage)')
      }
      if (message.name === "fiberRoot") {
        port.postMessage({ name: 'fiberRoot', message: message.message })
        console.log('sent fibernode to devtools (devport=undefined)', devPort)
      }
    })
  } else {
    port.onMessage.addListener((message, sender) => {
      if (message.name === "initialize") {
        port.postMessage({ message: "initialize" })
        console.log('sent initialization message (DEFINED, chrome.sendMessage)')
      }
      if (message.name === "fiberRoot") {
        port.postMessage({ name: 'fiberRoot', message: message.message })
        console.log('sent fibernode to devtools (DEFINED)', devPort)
      }
    })
  }
})

