
var $ = document.querySelector.bind( document );
var manifest = chrome.runtime.getManifest();
var shareConfig = {
  fb: 'https://www.facebook.com/dialog/share?app_id=1644680659131297&display=popup&href=%URL%',
  vk: 'http://vk.com/share.php?url=%URL%&description=%DESCR%',
  tw: 'https://twitter.com/intent/tweet?text=%DESCR%',
};

function updateLinks (msg){
  for (site in shareConfig) {
    if (shareConfig.hasOwnProperty(site)) {
      var extLink = 'https://source.google.com/webstore/detail/правільны-сцяг/eblobdnhbollnjjnfigjobhldpfeiejd';
      var shareLink = shareConfig[site].replace('%URL%', extLink).replace('%DESCR%', encodeURIComponent(msg))
      window['share-'+ site]['href'] = shareLink;
    }
  }
}

function setRootClass() {
  var rootClass = '';

  if (navigator.userAgent.match('OPR')) {
    rootClass = 'browser-opera';
  }
  else if (navigator.userAgent.match('Firefox')) {
    rootClass = 'browser-firefox';
  }
  else {
    rootClass = 'browser-chrome';
  }
  document.documentElement.classList.add(rootClass);
}
function checkForUpdates() {

  var $info = $('#update-status');
  $info.innerHTML = 'Праверка абнаўлення базы сцягоў...';

  (new Sciah()).getSiteData()
      .then(function (data) {
        $info.innerHTML = 'У вас апошняя версія базы сцягоў';
      })
      .catch(function () {
        $info.innerHTML = 'Не ўдалося праверыць абнаўленні';
      });

  // Make extension reload itself and load new data
  window.addEventListener('beforeunload', function () {
    chrome.runtime.sendMessage('go-reload-yourself');
  })
}

function init (){
  $('#ext-version').innerHTML = 'v. ' + manifest.version + '. ';
  $('#ext-meta-footer').innerHTML = manifest.name + ' v. ' + manifest.version;
  $('#ext-author').innerHTML = manifest.developer.name;
  $('#curr-year').innerHTML = (new Date()).getFullYear();
  document.title = manifest.name;
  setRootClass();
  updateLinks($('#share-text').value);

  // Event listeners
  // ---------------
  // Open test links tab by double clicking the logo
  $('#logo').addEventListener('dblclick', function(e){
    chrome.tabs.create({'url': chrome.extension.getURL('tests/testlinks.htm')});
  });

  // Update Share buttons with text from textarea
  $('#share-text').addEventListener('input', function(e){
    updateLinks(e.target.value);
  });

  setTimeout(function () {
    checkForUpdates()
  }, 700);

}

init();