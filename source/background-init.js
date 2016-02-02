
chrome.runtime.onInstalled.addListener(function () {
  // This is triggered when the extension is installed or updated.
  (new Sciah()).init();
});