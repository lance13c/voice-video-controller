import youtube from "./youtube.json"


export function getConfig() {
  try {
    switch (window.location.hostname) {
        case "youtube": {
          return youtube
          break;
        }
        default: 
          return youtube
      }
    } catch (e) {
      console.warn(e);
      console.warn("configuration issue");
    }
}
