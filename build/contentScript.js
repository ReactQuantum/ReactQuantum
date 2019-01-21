var port = chrome.runtime.connect({ name: "content-bg" });

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
    console.log("content, msg was 'initialize'", messsage)
    shouldInject()
  }
}

chrome.runtime.onMessage.addListener((message) => console.log("initialization", message))
//initialInject(message))

window.addEventListener("load", () => shouldInject());

window.addEventListener('message', e => {
  console.log('e', e)
  if (e.data.name === undefined) return;
  if (e.data.name == 'inject') {
    fiberRoot = e.data.data;
    console.log("sending fiberRoot", fiberRoot)
    port.postMessage(
      {
        name: "fiberRoot",
        message: fiberRoot,

      }
    )
  } else {
    return;
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
