

export default class VideoCtrl {
  constructor() {}

  play(config) {
    let videoEl = this.getVideoEl();
    if (!videoEl) { 
      console.warn("No Video Element Found");
      return;
    }
  
    videoEl.play();
  }
    
  pause(config) {
    let videoEl = this.getVideoEl();
    if (!videoEl) { 
      console.warn("No Video Element Found");
      return;
    }
    videoEl.pause();
  }

  getVideoEl(selector = "video") {
    return document.querySelector(selector);
  }
};