
let connections = {}
let devPort;
let devId;

chrome.runtime.onConnect.addListener(function (port) {

  port.onMessage.addListener((message, sender) => {
    console.log("background", sender, message)
    if (message.name === "devtool") {
      devPort = port
      devId = message.tabId
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { message: "hello", id: tabs[0].id }, (response) => {
          console.log("response after hello", response)
        })
      })
    } if (message.name === "fiberRoot") {
      console.log("right here", message.name, message.message)
      //send the request to the specific port in the connections object associated to our tabId
      devPort.postMessage({ type: 'fiberRoot', msg: "fiberRoot" });
      console.log('sent', devPort)
    }
  })
})

// chrome.runtime.onMessage.addListener(function (req, sender, res) {
//   if (req.type === 'content-script') {
//     if (sender.tab) {
//       let tabId = sender.tab.id;
//       console.log("right here", req.type, req.message)
//       //send the request to the specific port in the connections object associated to our tabId
//       devPort.postMessage({ type: 'fiberRoot', msg: "fiberRoot" });
//       console.log('sent', devPort)
//     } else console.log('ATTENTION:: Tab not found in connection list');
//   } else console.log('ATTENTION:: sender.tab not defined');
//   return true;
// })