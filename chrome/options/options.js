
var $ = document.querySelector.bind( document );
var manifest = chrome.runtime.getManifest();
var shareConfig = {
  fb: 'https://www.facebook.com/dialog/share?app_id=1644680659131297&display=popup&href=%URL%',
  vk: 'http://vk.com/share.php?url=%URL%&description=%DESCR%',
  tw: 'https://twitter.com/intent/tweet?text=%DESCR%',
};


$('#ext-version').innerHTML = 'v. ' + manifest.version;
$('#curr-year').innerHTML = (new Date()).getFullYear();
document.title = manifest.name;

function updateLinks (msg){
  for (site in shareConfig) {
    if (shareConfig.hasOwnProperty(site)) {
      var extLink = 'https://chrome.google.com/webstore/detail/правільны-сцяг/eblobdnhbollnjjnfigjobhldpfeiejd';
      var shareLink = shareConfig[site].replace('%URL%', extLink).replace('%DESCR%', encodeURIComponent(msg))
      window['share-'+ site]['href'] = shareLink;
    }
  }
}

$('#share-text').addEventListener('input', function(e){
  updateLinks(e.target.value);
});

updateLinks($('#share-text').value);