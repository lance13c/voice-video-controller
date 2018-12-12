import annyang from "annyang/dist/annyang.js";
import {getConfig} from "./config_manifest"

console.log("test");

// SETUP
let url = chrome.extension.getURL("/src/permissions/permissions.html");
console.log("URL: ", url);

chrome.tabs.create({
    url: url,
    active: true,
    selected: true
});

let config = getConfig();

let DOM;


// Commands
var commands = {
    'play': sendTask.bind(this, "play", config),
    'pause': sendTask.bind(this, "pause", config),
    'hello': function() { alert('Hello world!'); },
    'test': sendTask.bind(this, "test", config),
};
 
// Add our commands to annyang
annyang.addCommands(commands);
annyang.debug(true);

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

// Start listening.
annyang.start({
    autoRestart: true
});

setInterval(() => {
    console.log(annyang.isListening());
}, 1000);


function sendTask(task, config) {
    // Getting DOM from content script
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {task: task, config: config}, (response) => {
            console.log(response);
        });
    });
}




