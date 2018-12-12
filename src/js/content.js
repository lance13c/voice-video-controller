
console.log("Content Script Setup");
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log("Before Selector");
    let videoEl = document.querySelector("video");
    console.log("After Selector");

    switch(msg.task) {
        case "test":
          console.log("TEST HAS BEEN COMPLETED");
          sendResponse({res: "TEST HAS BEEN COMPLETED"});
          break;
        case "play":
            console.log("PLAY HAS BEEN COMPLETED");
            sendResponse({res: "PLAY HAS BEEN COMPLETED"});
            play(videoEl);
          break;
        case "pause":
            console.log("PAUSE HAS BEEN COMPLETED");
            sendResponse({res: "PAUSE HAS BEEN COMPLETED"});
            pause(videoEl);
          break;
        default: {
          console.log("Failed");
          sendMessage({res: "FAILED"});
        }
    }
});


function play(videoEl, config) {
    //let videoEl = document.querySelector(config.video_selector);
    //videoEl = DOM.querySelector(config.video_selector);

    //if (!videoEl) { console.warn("No Video Element Found")}

    videoEl.play();
}

function pause(videoEl, config) {
    //let videoEl = document.querySelector(config.video_selector);
    //videoEl = DOM.querySelector(config.video_selector);

    //if (!videoEl) { console.warn("No Video Element Found")}

    videoEl.pause();
}