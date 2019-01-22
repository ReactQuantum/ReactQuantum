var port = chrome.runtime.connect({ name: "content" });
console.log(port)
function injectScript(file) {
  const body = document.getElementsByTagName('body')[0];
  const scriptFile = document.createElement('script');
  scriptFile.id = 'injectScript';
  scriptFile.setAttribute('type', 'text/javascript');
  scriptFile.setAttribute('src', file);
  body.appendChild(scriptFile);
}



function shouldInject() {
  let injected = document.getElementById('injectScript')
  if (injected === null) {
    injectScript(chrome.extension.getURL('inject.js'))
  } else {
    injected.parentNode.removeChild(injected)
    console.log('removed injectScript from DOM')
    injectScript(chrome.extension.getURL('inject.js'))
  }
}

function initialInject(message) {
  if (message.message === 'initialize') {
    console.log("content, msg was 'initialize'", message)
    shouldInject()
  }
}

//chrome.runtime.onMessage.addListener((message) => console.log("chrome.runtime.onMessage.addListener((message) in content", message))
//initialInject(message))

window.addEventListener("load", () => {
  console.log("window.addEventListener('load')")
  shouldInject()
});

window.addEventListener('message', message => {
  console.log("window.addEventListener('message') in content", message.data)
  if (message.data.name === undefined) return;
  if (message.data.name == 'inject') {
    fiberRoot = message.data.data;
    console.log("window.addEventListener, e.data.name was 'inject' in content", typeof fiberRoot)
    port.postMessage(
      {
        name: "fiberRoot",
        message: fiberRoot,

      }
    )
    console.log("port.postMessage({ name: 'fiberRoot', message: fiberRoot,}) in content")
  }
});

// target element that we will observe
const target = document.body

// config object
const config = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
};

// subscriber function
function subscriber(mutations) {
  let fiberUpdate = true;
  //check if <script id='injectScript> is present on the DOM
  //  console.log(mutations)
  if (mutations.length) {
    mutations.forEach(mutation => {
      //  console.log("mutation.addedNodes", mutation.addedNodes)
      //  console.log("mutations.removedNodes", mutations.removedNodes)
      if (mutation.addedNodes.length) {
        if (mutation.addedNodes[0].nodeName === 'SCRIPT' && mutation.addedNodes[0].getAttribute('id') === 'injectScript') {
          console.log('update was a script injection')
          fiberUpdate = false;
        }
      }
      if (mutation.removedNodes.length > 0) {
        //console.log("mutation.removedNodes 85", mutation.removedNodes)
        //console.log("mutation.removedNodes nodeType", mutation.removedNodes[0].nodeType)

        if (mutation.removedNodes[0].nodeName === 'SCRIPT' && mutation.removedNodes[0].getAttribute('id') === 'injectScript') {
          console.log('update was a script removal')
          fiberUpdate = false;
        }
      }
    })
  }
  if (fiberUpdate) {
    shouldInject()
    fiberUpdate = false;
    console.log("fiberUpdate back to false")
  }
}



// instantiating observer
const observer = new MutationObserver(subscriber);

// observing target
observer.observe(target, config)
