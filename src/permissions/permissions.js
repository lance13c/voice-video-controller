navigator.webkitGetUserMedia({
    audio: true,
}, function(stream) {
    window.close();
    // Now you know that you have audio permission. Do whatever you want...
}, function() {
    // Aw. No permission (or no microphone available).
});