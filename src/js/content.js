
import VideoCtrl from "./core/VideoCtrl";

window.onload = () => {
  let videoCtrl = VideoCtrl();

  console.log("Content Script Setup");
  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    let videoEl = document.querySelector("video");

    switch(msg.task) {
      case "test":
        console.log("TEST HAS BEEN COMPLETED");
        sendResponse({res: "TEST HAS BEEN COMPLETED"});
      break;
      case "play":
          console.log("PLAY HAS BEEN COMPLETED");
          sendResponse({res: "PLAY HAS BEEN COMPLETED"});
          videoCtrl.play(videoEl);
      break;
      case "pause":
          console.log("PAUSE HAS BEEN COMPLETED");
          sendResponse({res: "PAUSE HAS BEEN COMPLETED"});
          videoCtrl.pause(videoEl);
      break;
      default: {
        console.log("Failed");
        sendMessage({res: "FAILED"});
      }
    }
  });
}





/**
 * Sets the video elements and video's start time
 */
function setStartTime() {

}