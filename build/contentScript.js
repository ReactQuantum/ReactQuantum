var port = chrome.runtime.connect({ name: "content-bg" });

function injectScript(file) {
  const body = document.getElementsByTagName('body')[0];
  const scriptFile = document.createElement('script');
  scriptFile.id = 'injectedScript';
  scriptFile.setAttribute('type', 'text/javascript');
  scriptFile.setAttribute('src', file);
  body.appendChild(scriptFile);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'initialize') {
    console.log("content, msg was 'initialize'", request, sender)
    injectScript(chrome.extension.getURL('inject.js'))
    sendResponse("injected!")
  } else {
    console.log('content, message was something else', request, sender)
    sendResponse("all good in the hood from BG")
  }
})

window.addEventListener('message', e => {
  if (e.data.name === undefined) return;
  if (e.data.name == 'fiberRoot') {
    fiberRoot = e.data.data;
    console.log(fiberRoot)
    port.postMessage(
      {
        name: "fiberRoot",
        message: fiberRoot
      }
    )
  } else {
    return;
  }
});


  //console.log(sendResponse(JSON.stringify(node)))
  // port.postMessage({ injected: "true", node: node })