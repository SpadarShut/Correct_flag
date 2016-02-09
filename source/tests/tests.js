
(new Sciah()).getSiteData().then(function (data) {

  var list = document.querySelector('#list');
  var listContents = '';

  data.forEach(function (site){

    if (!site.addr) return;

    var pre = '<li>';
    var post = '</li>';
    var host = '<h3>'+ site.addr.replace(/([\|\(\)\*\?\\])/g, function(a, b) {return '<span class="helper">'+ b +'</span>'}) +'</h3>';
    var links = [];
    var images = []; // todo show replaced images


    if (site.sample) {
      site.sample.forEach(function(link) {
        var linkText = link.notes ? link.notes : link.url;
        var linkEl = link.url ? 'a' : 'div';
        var href = '';
        if (link.url == '*' || link.url == '.*' || !link.url) {
          href = '';
        }
        else {
          href = ' href='+ link.url ;
        }
        var extraLink = href && linkText && (link.url.trim() !== linkText.trim()) ? '<p class="hint">'+ link.url +'</p>' : '';
        links.push('<li><'+ linkEl + href +' target="_blank">'+ linkText +'</'+ linkEl +'>'+ extraLink +'</li>');
      })
    }

    listContents += pre + host + '<ol>' +links.join('') + '</ol>' + post;
  });

  list.innerHTML = listContents;


  var domainsList = '';
  data.forEach(function (site) {

    if (site && site.addr && site.addr != '.*') {
      domainsList += '<li>' + site.addr
    }
  });
  domains.innerHTML = domainsList;
});