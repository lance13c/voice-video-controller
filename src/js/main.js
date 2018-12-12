import annyang from "annyang/dist/annyang.js";
import {getConfig} from "./config_manifest"

console.log("test");

// Sets up voice permissions
setup();

// Listen to extention for click events
let active = false;
chrome.browserAction.onClicked.addListener(function (tab) {
  active = toggleExtension(active);
});


let config = getConfig();

// Commands
var commands = {
    'play': sendTask.bind(this, "play", config),
    'pause': sendTask.bind(this, "pause", config),
    'hello': function() { alert('Hello world!'); },
    'test': sendTask.bind(this, "test", config),
};


annyang.addCallback("error", (e) => {
  console.warn("ERROR");
  console.warn(e);
});

annyang.addCallback("errorPermissionDenied", (e) => {
  console.warn("Permission Denied");
  console.warn(e);
});

annyang.addCallback("start", () => {
  console.log("started");
})

annyang.debug(true);


function startListening() {

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
  annyang.start();
}

function stopListening() {
  annyang.abort();
}

// setInterval(() => {
//     console.log(annyang.isListening());
// }, 1000);

/**
 * Toggles the extention on and off
 * @param {Boolean} active
 */
function toggleExtension(active) {
    if (active) {
        stopListening();
        chrome.browserAction.setIcon({path:"/src/assets/mic.png"});
        return false;
    } else {
        startListening();
        chrome.browserAction.setIcon({path:"/src/assets/mic_active.png"})
        return true;
    }
}





function sendTask(task, config) {
    // Getting DOM from content script
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      console.log("After Query");
      console.log(tabs);
      console.log(tabs[0].id)

      const message = {
        task: task, 
        config: config
      }

      console.log(message);

        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
            console.log(response);
        });
    });
}



/**
 * Sets up microphone permissions.
 */
function setup() {
    let url = chrome.extension.getURL("/src/permissions/permissions.html");
    console.log("URL: ", url);

    chrome.tabs.create({
        url: url,
        active: true,
        selected: true
    });
}
