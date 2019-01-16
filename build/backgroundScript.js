
let connections = {}
console.log(connections)

chrome.runtime.onConnect.addListener(function (port) {
  console.log("background port", port)
  //console.log("connected with content", port.sender.id)
  port.onMessage.addListener((message, sender) => {
    console.log("background", sender, message)
    if (message === "yo wdup") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log("tab id", tabs[0].id)
        chrome.tabs.sendMessage(tabs[0].id, { message: "hello", id: tabs[0].id }, (response) => {
          console.log("response after hello", response)
        })
      })
    } else {
      console.log("background msg was not wdup", message)
    }
  })
})