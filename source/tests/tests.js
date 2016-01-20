
chrome.runtime.sendMessage('gimmeTests', function(data){
  console.log(data);

  var list = document.querySelector('#list');
  var listContents = '';

  data.forEach(function (site){

    var pre = '<li>';
    var post = '</li>';
    var host = '<h3>'+ site.addr +'</h3>';
    var links = [];
    var images = []; // todo show replaced images


    if (site.sample) {
      site.sample.forEach(function(link) {
        var linkText = link.notes ? link.notes : link.url;
        links.push('<li><a href="'+link.url+'" target="_blank">'+ linkText +'</a></li>');
      })
    }

    listContents += pre + host + '<ol>' +links.join('') + '</ol>' + post;
  });

  list.innerHTML = listContents;

});