//establish connection for background script
let port = chrome.runtime.connect({ name: 'content' });
let initialized = false;

//inject script to the dom
function injectScript(file) {
  const body = document.getElementsByTagName('body')[0];
  const scriptFile = document.createElement('script');
  scriptFile.id = 'injectScript';
  scriptFile.setAttribute('type', 'text/javascript');
  scriptFile.setAttribute('src', file);
  body.appendChild(scriptFile);
}

function setupPortIfNeeded() {
  if (!port) {
    port = chrome.runtime.connect({ name: 'content' }, () => {
      console.log('connected')
    });
    port.postMessage({ message: 'initialize' });
    port.onDisconnect.addListener(() => {
      port = null;
    });
  }
}

function shouldInject() {
  const injected = document.getElementById('injectScript');
  if (injected === null) {
    injectScript(chrome.extension.getURL('inject.js'));
  } else {
    injected.parentNode.removeChild(injected);
    injectScript(chrome.extension.getURL('inject.js'));
  }
}

window.addEventListener('load', () => {
  console.log(initialized);
  if (initialized) {
    shouldInject();
  }
});

chrome.runtime.onMessage.addListener((message) => {
  console.log(message);
  if (message.name === 'startQuantum') {
    initialized = true;
    shouldInject();
  }
});

window.addEventListener('message', (message) => {
  if (message.data.name === undefined) return;
  if (message.data.name === 'inject') {
    setupPortIfNeeded();
    const fiberRoot = message.data.data;
    port.postMessage(
      {
        name: 'fiberRoot',
        message: fiberRoot,
        target: 'devTools',
      },
    );
  }
});

const target = document.body;

const config = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
};

function subscriber(mutations) {
  let fiberUpdate = true;
  let timeout;
  if (initialized) {
    if (mutations.length) {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          if (mutation.addedNodes[0].nodeName === 'SCRIPT' && mutation.addedNodes[0].getAttribute('id') === 'injectScript') {
            fiberUpdate = false;
          }
        }
        if (mutation.removedNodes.length > 0) {
          if (mutation.removedNodes[0].nodeName === 'SCRIPT' && mutation.removedNodes[0].getAttribute('id') === 'injectScript') {
            fiberUpdate = false;
          }
        }
      });
    }
    if (fiberUpdate) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        shouldInject();
        fiberUpdate = false;
      }, 750);
    }
  }
}
const observer = new MutationObserver(subscriber);
observer.observe(target, config);

