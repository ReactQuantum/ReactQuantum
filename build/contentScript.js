// This line opens up a long-lived connection to your background page.
var port = chrome.runtime.connect({ name: "content-bg" });

function injectScript(file) {
  //this adds <script type='text/javascript' src='reactTraverser.js'></script> to the DOM's body
  const body = document.getElementsByTagName('body')[0];
  const scriptFile = document.createElement('script');
  scriptFile.id = 'injectedScript';
  scriptFile.setAttribute('type', 'text/javascript');
  scriptFile.setAttribute('src', file);
  body.appendChild(scriptFile);

}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'hello') {
    console.log("content, msg was 'hello'", request, sender)
    injectScript(chrome.extension.getURL('inject.js'))
    sendResponse("injected!")
  } else {
    console.log('content, msg was something else', request, sender)
    sendResponse("all good in the hood from BG")
  }
})

window.addEventListener('message', e => {
  if (e.data.type === undefined) return;
  if (e.data.type == 'injected') {
    fiberRoot = e.data.data;
    console.log(fiberRoot)
    chrome.runtime.sendMessage(
      {
        type: "content-script",
        message: fiberRoot
      }
    )
  } else {
    return;
  }
});


  //console.log(sendResponse(JSON.stringify(node)))
  // port.postMessage({ injected: "true", node: node })