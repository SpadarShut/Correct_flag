// ==UserScript==
// @name        Correct Flag
// @author      Pavel Shut
// @description На пэўных сайтах замяняе значкі з чырвона-зялёным сцягам на бел-чырвона-белы нябесны вольны смелы.
//
// @include     *wikipedia.org*
// @include     *yandex.*
// @include     *opera.com*
// @include     *sovrep.gov.by*
// @include     *un.org*
// @include     *godaddy.com*
// @include     *rutracker.org*
// @include     *kvitki.by*
// @include     *cybergames.by*
// @include     *audience.by*
// @include     *advocates.by*
// @include     *barsu.by*
// @include     *prazdnik.by*
// @include     *prazdnikby.ru*
// @include     *kinopoisk.ru*
// @include     *greencard.by*
// @include     *grodnonews.by*
// @include     *techlabs.by*
// @include     *parta.by*
// @include     *fotoclub.by*
// @include     *mypet.by*
// @include     *autoline.*
// @include     *autoline-eu.*
// @include     *library.gsu.by*
// @include     *brestintourist.*
// @include     *navitel.*
// @include     *world-geographics.com*
// @include     *sportlemon.tv*
// @include     *allsport-live.ru*
// @include     *livescore.in*
// @include     *livetv.ru*
// @include     *fantasy.premierleague.com*
// @include     *adsl.by/services/radio*
// @include     *goals.by*
// @include     *pac.by*
// @include     *postcrossing.com*

// @include     *rfe.by*
// @include     *1c-bitrix.ru*
// @include     *free-torrents.org*
// @include     *nnm-club.ru*
// @include     *active.by*
// @include     *active.am*
// @include     *activecloud.az*
// @include     *activecloud.ge*
// @include     *activecloud.ru*
// @include     *activecloud.com*
// @include     *active.uz*
// @include     *flagcounter.com*
// @include     *internetworldstats.com*
// @include     *go.hrw.com*

// @include     *freeads.by*
// @include     *samsungapps.com*
// @include     *slando.by*
// @include     *gismeteo.by*
// @include     *gismeteo.ru*
// @include     *gismeteo.ua*
// @include     *gismeteo.md*
// @include     *gismeteo.lt*
// @include     *gismeteo.com*
// @include     *vk.com*
// @include     *vkontakte.ru*
// @include     *busuu.com*
// @include     *sports.ru*
// @include     *pefl.ru*
// @include     *sportpanorama.by*
// @include     *exist.by*
// @include      *dinamo-minsk.by*
// @include      *championat.com*
// @include      *myscore.ru*
// @include      *joma.by*
// @include      *battlefield.com*
// @include      *belpost.by*
// @include      *tamby.info*
// @include      *pbliga.com*
// @include      *ibb.by*
// @include      *ibbhotel.by*
// @include      *soccerstand.com*
// @include      *soccer.ru*
// @include      *transfermarkt.de*
// @include      *erepublik.com*
// @include      *catholic.by*
// @include      *google.com*
// @include      *budist.ru*
// @include      *kinozal.tv*
// @include      *transinfo.by*
// @include      *meteo-europ.com*
// @include      *greyorder.su*
// @include      *timeanddate.com*
// @include      *myjob.by*
// @include      *football.by*
// @include      *telegraf.by*
// @include      *sportbox.ru*
// @include      *eventot.com*
// @include      *skyscanner.*
// @include      *tb.by*
// @include      *ecolines.by*

// @include      *codeforces.com*
// @include      *tribuna.com*
// @include      *iihfworlds2014.com*
// @include      *pressball.by*
// @include      *secret.ly*

// @include      *paypal.com*
// @include      *theprintful.com*




// @include     */*
// ==/UserScript==
(function () {

  function addCSS(CSS) {
    var styleEl = window.document.createElement('style');
    var styles  = window.document.createTextNode(CSS);
    styleEl.setAttribute('title', 'Correct Flag');
    styleEl.appendChild(styles);
    window.document.head && window.document.head.appendChild(styleEl);
  };

  chrome.runtime.sendMessage({'domain': location.host}, function(css){
    if (css) {
      window.addEventListener('DOMContentLoaded', function() {
        addCSS(css);
      })
    }
  });

})();
