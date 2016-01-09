
/**
 *  Logic:
 *  - BG script knows all domains to work on: it can replace images using
 *   webRequest API and compile css to be injected in pages.
 *  - Injected script on document start sends a msg to BG for css, and on
 *   DOMContentLoaded injects it
 *
 * BG:
 *  - setup url filters
 *  - listen for messages
 *  - on message: see domain, pick CSS from dzieShto send response
 *
 *
 *  INJECTED:
 *  - on doc_start send msg for css
 *  - on DOMContentLoaded inject response
 *
 * */


function boxShadow (param) {

  var darkness = 0.15;
  var shadow = '';

  if (typeof param === 'number') {
    darkness = param;
  }
  if (typeof param === 'string') {
    shadow = param
  }

  shadow = shadow || 'inset 0 0 0 1px rgba(0,0,0,'+ darkness +')';

  return '\
            box-shadow: '+ shadow + ';\
        ';
}

function res (file) {
  return chrome.extension.getURL('res/'+ file );
}
var sciahSphereSrc = res('sciahSphere.svg') ;

//var gradientCSS = '\
//		background:\
//        linear-gradient(transparent, transparent 32%, rgba(204,18,18,.95) 32%,  rgba(204,18,18,.95) 68%, transparent 68%, transparent),\
//        linear-gradient(-45deg, rgba(198,198,198,0.43) 0%, rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%) !important;\
//		background-color:#fff !important;';

var reflectionDownCSS = '\
			background:\
 			linear-gradient(top, rgba(255,255,255,1) 0%,rgba(255,255,255,0.67) 33%,rgba(204,18,18,0.66) 34%,rgba(204,18,18,0.32) 68%,rgba(255,255,255,0.31) 69%,rgba(255,255,255,0) 100%); ';

var flagCSS =
    flagBGI() +
    'background-position: 0 0 !important;' +
    'background-size: cover;';


var dzieShto = [

    // All sites
    // ---------

  { addr: '.*',
    css: ' /* Skype ckick-to-call plugin */\
    html body .skype_pnh_container span[style *="background-position: -909px"], \
    html body .skype_pnh_container span[style ="background-position:-909px 1px !important;"] {\
        background: none !important;\
        position: relative !important;\
    }\
    html body .skype_pnh_container span[style *="background-position: -909px"]::after, \
    html body .skype_pnh_container span[style ="background-position:-909px 1px !important;"]::after {'+
        'position: absolute;' +
        'content: ""' +
        flagCSS +
        'height: 12px;' +
        'width: 16px;' +
        'left: 0;' +
        'top: 0;' +
    '}' +


    '/* Lib for tel input https://github.com/jackocnr/intl-tel-input */' +
    '.iti-flag.by { \
      background: linear-gradient(to bottom, #fff, #fff 33.333333%, #E21313 33.33333%, #E21313 66.66666%, #fff 66.666%);\
    }'
  },

    // Sites popular in Belarus
    // ------------------------

  { addr: 'yandex.',
    images: [
      {i: '*://*/*/ftG_g5PBLY3vNpbeycqToQ3F5y8.gif', w: 16, h: 11},
      {i: '*://*/*/b-country-flag_size-16_by', w: 16, h: 11},
      {i: '*://*/*/b-country-flag_size-24_by', w: 24, h: 18},
      {i: '*://*/*/b-country-flag_size-32_by', w: 32, h: 22},
      {i: '*://*/*/b-country-flag_size-48_by', w: 48, h: 37}
    ],
    css:  ' \
      /* Mail Settins - Language in sidebar */\
      .b-mail-dropdown__item__content[data-params="lang=be"] .b-mail-icon_lang-be {\
          display: none;\
      }\
      .b-mail-dropdown__item__content[data-params="lang=be"]:before {\
        content: "";\
        display: inline-block;\
        position: absolute;\
        top: 7px;\
        left: 7px;\
        width: 16px;\
        height: 12px;\
        '+ flagBGI() +'\
      }\
      \
      /* Keyboard on search homepage */\
      .b-keyboard__lang-by .b-keyboard__lang-ic { \
          '+ flagBGI({contour: 0.2, w: 'auto'}) +'\
          background-position: 0 0 !important;\
          background-size: 16px 12px;\
          height:12px;\
      }',
    sample: [
      {url: 'https://www.yandex.by/', notes: 'Click keyboard in search field, select Belarusian in dropdow kbd'},
      {url: 'https://mail.yandex.by/?uid=225165401&login=sp-shut#setup/other', notes: ' Mail Settins - Language in sidebar, also in footer'}
    ]

      //
      //'.b-country-flag_size-16_by,' +
      //'.b-country-flag_size-24_by, ' +
      //'.b-country-flag_size-32_by, ' +
      //'.b-country-flag_size-48_by {'+
      //    flagCSS
      //+ '}' +
      //
      //'.b-country-flag_size-16_by { ' +
      //    'padding: 12px 0 0 16px;' +
      //' }' +
  },
  { addr: 'rutracker.org',
    images: [
      {i: 'flags/by.gif', contour: 1, w: 24, h: 15 },
      {i: 'flags/17.gif', contour: 1, w: 32, h: 20 },
      {i: 'flags/lang_by.png', w: 40, h: 20, contour: 0 },
      {i: 'logo_new_by.gif', replacer: res('rutracker_logo_by.png') },
    ],
    sample: [
      {url: 'http://rutracker.org/forum/profile.php?mode=viewprofile&u=21923338', notes: 'See user flag. You must be logged in'},
      {url: 'https://by.rutracker.org/forum/index.php', notes: 'Logo must be white-red-white'},
      {url: 'https://ua.rutracker.org/forum/', notes: 'In footer'},
    ]
  },
  { addr: 'skyscanner\.*',
    images: [
      {i: '*://*/*header/by.png', w: 50, h: 38, contour: 0 },
      {i: '*://*/*header/BY.png', w: 50, h: 38, contour: 0 }
    ],
    sample: [{url: 'http://www.skyscanner.net/', notes: 'In header from BRL IP. Also click it for dialog anf hamburger menu'}]
  },
  { addr: 'kvitki.by',
    images: [
      { i: 'lang_by.gif', w: 16, h: 12 },
      { i: 'lang_by_ov.gif', w: 16, h: 12, red: '#888' },
    ],
    sample: [{ url: 'http://www.kvitki.by/', 'notes': 'In header icon + hover'}]
  },
  {
    addr: 'ticketpro.by',
    css: '#destination form select.by {padding-left: 26px }',
    images: [{i: '/243567_118809_belorusko.gif', w: 16, h: 11 }],
    sample: [{url:'http://www.ticketpro.by/jnp/sport/football/index.html', notes: 'Country selector in header'}]

  },
  { addr: 'kinopoisk.ru',
    css:
    '.flag69 * {'+
      flagCSS+'; \
      height: 12px;\
      background-position: 0 0;\
    }\
    .flag.flag69 {\
      height: 12px\
    } \
    .tenItems .flags {\
        height: auto !important;\
    }\
    .movieFlags .flag69 * {\
        height: 10px\
    }\
    .country_flag[style *="/by.png"] {\
        background-image: url("'+ sciahSphereSrc +'") !important;\
        opacity:.5;\
    }',
    sample: [{url: 'http://www.kinopoisk.ru/lists/m_act%5Bcountry%5D/69/', notes: 'On map and in every search list item'}]
  },
  {
    addr: 'belpost.by',
    images: [{i: 'i/blr.jpg', w: 25, h: 13, outline: 0.2}],
    sample: [{'url': 'http://belpost.by/', notes: 'In header'}]
  },
  {
    addr: 'gismeteo.',
    css:
    '.flag.bel {' +
        flagBGI({ w: 'auto', contour: 0.04, white: '#F0EFF0' }) +
        'background-position: 0 0 !important;' +
    '}'
  },
  {
    addr: 'vandrouki.',
    images: [{i: '*://*/Belarus.png', w: 17, h: 10}]
  },


    // Sports sites
    // ------------

  {
    addr: 'pressball.by',
    images: [
      {i: 'th_blr4.jpg', replacer: res('pressballFlagBy.png')},
      {i: 'blr4.jpg', replacer: res('pressballFlagBy.png')},
      {i: 'th_belarus.jpg', w: 200, h: 131}, // legacy
      //{i: 'images/countries/belarus.png', w: 16, h: 14, canvasW: 16, canvasH: 16 }, // ?? legacy
    ],
    sample: [{'url': 'http://www.pressball.by/online/handball/argentinahand_belarus_2016-01-08', notes: 'Second flag'}]
  },
  {
    addr: 'pefl.ru',
    images: [{i: '/flags/18.gif', w: 115, h: 77, contour: 0}],
    sample: [{url: 'http://pefl.ru/index.php', notes: 'Go to Турниры link in sidebar and see Belarus (links are signed)'}]
  },
  {
    addr: 'sports.ru',
    css:
    '.flag-1302, ' +
    '.icon-flag_1302 {'+
        flagBGI({ r: 2, w: 'auto', emboss: 0.3, contour: 0.17, red: '#FF3E00' }) +
        'background-position: 0 0 !important;'+
    '}' +
    '.icon-flag-circle_belarus {' +
        'background-position: 0 0 !important;' +
        'background-image: url("'+ res('sportsRuBelarusCircle.png') +'") !important' +
    '}',
    sample: [
      {url: 'http://www.sports.ru/', notes: 'On homepage in header language selector'},
      {url: 'http://www.sports.ru/tribuna/statuses/hockey/', notes: 'On inner page in header language selector'},
      {url: 'http://www.sports.ru/ekstraliga/', notes: 'Inner page in page content'},
      {url: 'http://www.sports.ru/transfers/', notes: 'Circle flags. If there\'s no Belarus, inspect a circle flag, set class icon-flag-circle_tag-id_* to icon-flag-circle_belarus' }
    ]
  },
  {
    addr: 'sportpanorama.by',
    images: [{i: '/flags/1.jpg', w: 16, h: 11, contour: 0.15, emboss: 0.27 }],
    sample: [{url: 'http://sportpanorama.by/themes/49/table/', notes: 'See table'}]
  },
  {
    addr: 'myscore.ru',
    css:'.flag.fl_31 { ' +
        flagBGI({w: 16, h: 12, canvasW: 16, canvasH: 13, contour: 0.16}) +
        'background-position: 0 0 !important;'+
    '}',
    images: [
      {i: '/image/data/rN9xhjRc-I7KbpC8c.png', w: 50, h: 25, canvasW: 50, canvasH: 50}
    ],
    sample: [
      {url: 'http://www.myscore.ru/football/belarus/super-cup/', notes: 'In breadcrumbs'}
    ]
  },
  {
    addr: 'championat.com',
    images: [{i: 'http://st.championat.com/i/flags/18x12/by.png', w: 18, h: 12, contour: 0}],
    sample: [{url: 'http://www.championat.com/tennis/player/208.html', notes: 'See bio "Гражданство"'}]
  },
  {
    addr: 'dinamo-minsk.by',
    images: [
      {i: '/Flags/30x19/Belarus.png', canvasW: 30, canvasH: 19, w: 28, h: 17, contour: 0.2},
      {i: '/Flags/31x24/Belarus.png', canvasW: 31, canvasH: 24, w: 29, h: 22, contour: 0.07, r: 1, white: '#f0f0f0'},
    ],
    sample: [
      {url: 'http://dinamo-minsk.by/be/komanda', notes: 'See players' },
      {url: 'http://dinamo-minsk.by/be/komanda/igrok/~show/ignatovich_sergej', notes: 'Near photo' },
    ]
  },
  {
    addr: 'pbliga.com',
    images: [
      {i: 'flags/flag_17.png', canvasW: 24, canvasH: 24, w: 23, h: 21, gradient: true },
      {i: 'flags/blr.gif', w: 16, h: 11, gradient: true, contour: 0.15 }
    ],
    sample: [
      {url: 'http://pbliga.com/mng_roster.php?id=129', notes: 'In header, in table'},
      {url: 'http://pbliga.com/mng_stat_players.php?sid=1&id=7', notes: 'In table'},
      {url: 'http://pbliga.com/mng_tr_table.php#form', notes: 'See next page if there are not brl flags'},
      {url: 'http://pbliga.com/mng_developers.php', notes: 'For blr.gif change flag url'},
    ]
  },
  {
    addr: 'football.by',
    images: [{i: 'stat/getimage.php?flagid=1', w: 19, h: 13}],
    favicon: res('footballByFavicon.png'),
    sample: [
      {url:'http://www.football.by/stat/belarus/2013/sub/2013m/teams/5/', notes: 'See table'},
      {url:'http://www.football.by/', notes: 'See favicon'},
    ],
  },
  {
    addr: 'sportbox.ru',
    css:'img[src *="land/by.png"], .fffx { '+ flagCSS + '}'
  },
  {
    addr: 'soccer.ru',
    css:'img[src *="/images/flag/15.gif"], .fffx{ '+ flagCSS +'; '+ boxShadow(0.28) +' height: 15px; vertical-align: middle; position: static !important}'
  },
  {
    addr: 'transfermarkt.de',
    css:'.sprite_land_18{ '+ flagCSS +'; '+ boxShadow(0.28) +' height: 12px}'
  },
  {
    addr: 'soccerstand.com',
    css:'.flag_small_all.f57{ '+ flagCSS +'; '+ boxShadow(0.18) +'}'
  },
  { addr: 'sportlemon.tv',
    css:'img[src $="flags/by.gif"],.fffx{'+flagCSS+'width: 16px;height:12px;}'
  },
  { addr: 'allsport-live.ru',
    css: 'td[width="30"][height="20"] img[src $="flags/flag_belarus.png"],.fffx {'+flagCSS+'width: 16px !important;height:12px !important;}' +
    '#fsbody .fl_31, .fl_31 { background:none !important;}' +
    '.fl_31:before{'+flagCSS+'width: 16px;height:12px;margin:0 8px -1px -24px;}'
  },
  { addr: 'livescore.in',
    css: '#fsbody .fl_31, .fl_31 { background:none !important;} ' +
    '.fl_31:before{'+flagCSS+'width: 16px; height:12px; vertical-align:top;} ul.menu-left .fl_31:before { margin:0 8px -1px -24px; vertical-align:text-top}'
  },
  { addr: 'livetv.ru',
    css:'img[src $="national/by.gif"],img[src $="img/flags/24.png"],.fffx{'+flagCSS+'width: 16px;height:12px;}\
				img[src $="fullsize/1372.gif"], img[src $="fullsize/1373.gif"], img[src $="fullsize/1374.gif"], img[src $="fullsize/1375.gif"], \
				img[src $="fullsize/1376.gif"], img[src $="fullsize/1377.gif"], img[src $="fullsize/1378.gif"], img[src $="fullsize/1379.gif"], \
				img[src $="fullsize/1380.gif"], img[src $="fullsize/1381.gif"], img[src $="fullsize/1382.gif"], img[src $="fullsize/1383.gif"], \
				img[src $="fullsize/1384.gif"], img[src $="fullsize/1385.gif"], img[src $="fullsize/1386.gif"], img[src $="fullsize/1387.gif"], \
				img[src $="fullsize/1388.gif"], img[src $="fullsize/1389.gif"], img[src $="fullsize/1390.gif"], img[src $="fullsize/1391.gif"], \
 				img[src $="fullsize/1392.gif"],\
				img[src $="teams/1372.gif"], img[src $="teams/1373.gif"], img[src $="teams/1374.gif"], img[src $="teams/1375.gif"], \
				img[src $="teams/1376.gif"], img[src $="teams/1377.gif"], img[src $="teams/1378.gif"], img[src $="teams/1379.gif"], \
				img[src $="teams/1380.gif"], img[src $="teams/1381.gif"], img[src $="teams/1382.gif"], img[src $="teams/1383.gif"], \
				img[src $="teams/1384.gif"], img[src $="teams/1385.gif"], img[src $="teams/1386.gif"], img[src $="teams/1387.gif"], \
				img[src $="teams/1388.gif"], img[src $="teams/1389.gif"], img[src $="teams/1390.gif"], img[src $="teams/1391.gif"], \
 				img[src $="teams/18/1392.gif"],\
				img[src $="teams/18/1372.gif"], img[src $="teams/18/1373.gif"], img[src $="teams/18/1374.gif"], img[src $="teams/18/1375.gif"], \
				img[src $="teams/18/1376.gif"], img[src $="teams/18/1377.gif"], img[src $="teams/18/1378.gif"], img[src $="teams/18/1379.gif"], \
				img[src $="teams/18/1380.gif"], img[src $="teams/18/1381.gif"], img[src $="teams/18/1382.gif"], img[src $="teams/18/1383.gif"], \
				img[src $="teams/18/1384.gif"], img[src $="teams/18/1385.gif"], img[src $="teams/18/1386.gif"], img[src $="teams/18/1387.gif"], \
				img[src $="teams/18/1388.gif"], img[src $="teams/18/1389.gif"], img[src $="teams/18/1390.gif"], img[src $="teams/18/1391.gif"], \
 				img[src $="teams/18/1392.gif"],.fffx\
  					{\
	content:"";display:inline-block;width:49px;height:49px;\
	background:\
 repeating-linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, rgba(255,255,255,.25) 1px,rgba(255,255,255,.25) 2px), \
 linear-gradient(-45deg,transparent, transparent 30%, rgba(204,18,18,.95) 30%,  rgba(204,18,18,.95) 70%, transparent 70%, transparent), \
 linear-gradient(-45deg, rgba(198,198,198,0.43) 0%,rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%); \
box-shadow:inset 0 0 0 1px #333,inset 0 0 0 2px rgba(255,255,255,.6); \
					}\
				img[src $="teams/1372.gif"], img[src $="teams/1373.gif"], img[src $="teams/1374.gif"], img[src $="teams/1375.gif"], \
				img[src $="teams/1376.gif"], img[src $="teams/1377.gif"], img[src $="teams/1378.gif"], img[src $="teams/1379.gif"], \
				img[src $="teams/1380.gif"], img[src $="teams/1381.gif"], img[src $="teams/1382.gif"], img[src $="teams/1383.gif"], \
				img[src $="teams/1384.gif"], img[src $="teams/1385.gif"], img[src $="teams/1386.gif"], img[src $="teams/1387.gif"], \
				img[src $="teams/1388.gif"], img[src $="teams/1389.gif"], img[src $="teams/1390.gif"], img[src $="teams/1391.gif"], \
 				img[src $="teams/1392.gif"]\
					{width:36px;height:36px}\
				img[src $="teams/18/1372.gif"], img[src $="teams/18/1373.gif"], img[src $="teams/18/1374.gif"], img[src $="teams/18/1375.gif"], \
				img[src $="teams/18/1376.gif"], img[src $="teams/18/1377.gif"], img[src $="teams/18/1378.gif"], img[src $="teams/18/1379.gif"], \
				img[src $="teams/18/1380.gif"], img[src $="teams/18/1381.gif"], img[src $="teams/18/1382.gif"], img[src $="teams/18/1383.gif"], \
				img[src $="teams/18/1384.gif"], img[src $="teams/18/1385.gif"], img[src $="teams/18/1386.gif"], img[src $="teams/18/1387.gif"], \
				img[src $="teams/18/1388.gif"], img[src $="teams/18/1389.gif"], img[src $="teams/18/1390.gif"], img[src $="teams/18/1391.gif"], \
 				img[src $="teams/18/1392.gif"]\
					{width: 18px;height:18px;}\
 				img[width="65"]{width:65px !important;height:65px !important;}'
  },
  { addr: 'fantasy.premierleague.com',
    css: 'img[src $="static/img/flags/BY.gif"],.fffx{'+flagCSS+'width:64px;height32px;}'
  },
  { addr: 'goals.by',
    css: 'img[src *="img/flags/by.png"],.fffx {'
    +flagCSS+'width: 16px;height:12px}' +
    '.ic-flag-BY::before, \
     .ic-flag-BY img, img.fffx {\
          width: 16px; \
          height: 12px; \
          clip: auto !important; \
          left: 0 !important; \
          top: auto !important; \
          right: 0 !important; \
          transform:translateY(1px);\
          '+ flagCSS +'\
              }\
              .ic-flag-BY::before {\
                    content: "" !important\
              }\
              .ic-flag-r.ic-flag::before { left: auto !important; right: 0 !important}'
  },
  {
    addr: 'tribuna.com',
    css: '.flag-1302 { '+ flagCSS + boxShadow('inset 0 0 1px rgba(0,0,0,1), inset 0 0 0 2px rgba(255,265,255,.25)') +'; border-radius: 2px}'
  },


    // International popular sites
    // ---------------------------

  {
    addr: 'google.com',
    css:
    '.talk-flag[style *="background-position: 0px -1100px"], ' +
    '.i18n-phone-flag[style *="background-position: 0px -1100px"],' +
    '.aYU-aYX-aD2[style *="background-position"][style *="-1100px"] { '+
      flagCSS +
      'background-position: 0 0 !important; ' +
      'height: 12px; ' +
    '}' +
    '._GAf-_countryFlag-_BY {'+
        flagCSS +
        'height: 12px' +
    '}',
    sample: [{url:'https://accounts.google.com/SignUp?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ltmpl=default', notes: 'In phone box enter +375 '}]
  },
  {
    addr: 'behance\.net|adobe\.com',
    // .iti-flag.by is covered by .* entry. Keeping behance/adobe here for stats.
    //css: '.iti-flag.by {'+ flagBGI() + '}'
    sample: [{
      url: 'https://adobeid-na1.services.adobe.com/renga-idprovider/pages/login.do',
      notes: 'Page where it asks for mobile phone number after logging in'
    }]
  },
  {
    addr: 'aliexpress.com',
    css: '.css_flag.css_by {' +
        flagBGI({red: '#ED5050'}) +
        'background-position: 0 0;' +
        'background-size: 20px 12px;' +
    '}',
    images: [{i: '*://*/*/country/s/by.gif', w: 20, h: 10, red: '#E36060'}],
    sample: [
      { url: 'http://www.aliexpress.com/item/Pagonya-Flag-90x150cm-100D-Polyester-Belarus-Belarusian-flag-Country-Flags-and-Banners-For-Home-Decoration/32238574521.html',
        notes: 'Scroll to Transaction History & Feedback, see people from Belarus'
      }]
  },
  {
    addr: 'paypal.com',
    css: '' +
    '.country.belarus,' +
    '.country.BY {' +
        flagBGI({r: 1, red: '#EA6A6E', emboss: 0.1 }, true) +
        'background-position: 5px 3px !important;' +
        'background-size: 22px 16px; !important' +
    '}',
    images : [{i: 'icon/icon_BY_22x14.gif', w: 22, h: 14}],
    sample: [{
      url:'https://www.paypal.com/by/webapps/mpp/home',
      notes: 'In footer, and in country selector which is opened by clicking it'
    }, {
      url: 'https://www.paypal.com/by/signup/account',
      notes: 'In footer '
    }, {
      url: '',
      notes: 'icon/icon_BY_22x14.gif ??? dont remember where i saw it '
    }]
  },
  {
    addr: 'timeanddate.com',
    css:'img[src *= "gfx/fl/"][src *= "/by.png"], .fffx { '+ flagCSS + '}'
  },
  {
    addr: 'erepublik.com',
    css:'img[src *="/flags"][src *="/Belarus"], .fffx{ '+
    flagCSS  +
    'border-radius: 2px;' +
    '}' +
    'img[src *="/flags"][src *="/Belarus"][src *="/S/"],' +
    'img[data-origsrc *="/flags"][data-origsrc *="/Belarus"][data-origsrc *="/S/"] {' +
    'width: 14px; height: 12px;' +
    'border-radius: 1px;' +
    boxShadow("inset 0 0 0 1px rgba(0,0,0,.20), 0 1px 2px rgba(0,0,0,.1)") +
    '}' +
    'img[src *="/flags"][src *="/Belarus"][src *="/M/"],' +
    'img[data-origsrc *="/flags"][data-origsrc *="/Belarus"][data-origsrc *="/M/"] {' +
    'width: 22px; height: 15px;' +
    'border-radius: 1px' +
    boxShadow("inset 0 0 0 1px rgba(0,0,0,.20), 0 1px 3px rgba(0,0,0,.15)") +
    '}' +
    'img[src *="/flags"][src *="/Belarus"][src *="/L/"],' +
    'img[data-origsrc *="/flags"][data-origsrc *="/Belarus"][data-origsrc *="/L/"] {' +
    'width: 30px; height: 21px;' +
    boxShadow("inset 0 0 0 1px rgba(0,0,0,.20), 0 1px 4px rgba(0,0,0,.15)") +
    '}' +
    'img[src *="/flags"][src *="/Belarus"][src *="/XL/"],' +
    'img[data-origsrc *="/flags"][data-origsrc *="/Belarus"][data-origsrc *="/XL/"] {' +
    'width: 46px; height: 33px; '+
    boxShadow("inset 0 0 0 1px rgba(0,0,0,.20), 0 1px 6px rgba(0,0,0,.25)") +
    '}' +
    '#filters a.selector img[src *="/Belarus"], .fffx {display: block}' +
    '.flag[src *="Belarus"], .flag[data-origsrc *="Belarus"] {padding:0; margin-right: 5px}' +
    '#battle_listing img[src *="Belarus"],#battle_listing img [data-origsrc *="Belarus"]{ height: 18px } '
  },
  { addr: 'postcrossing.com',
    css: '.flag.flag-BY {'+ flagCSS +'width: 16px;height:12px;}'
  },
  { addr: 'wikipedia.org',
    files: [
      { src:'*Coat_of_arms_of_Belarus.svg(.png)?',
        newSrc: 'http://upload.wikimedia.org/wikipedia/commons/9/9c/Coat_of_Arms_of_Belarus_(1991).svg'
      }
    ],
    css:'img[src $="data:image/svg+xml"].thumbborder{border:0 !important;}\
				img[src *="Flag_of_Belarus.svg"],.fffx{border:0 !important;'+ flagCSS+'}  \
				img[src *="Coat_of_Arms_of_Belarus_(1991).svg"][width ="80"]{ width:70px }  \
		  '
  },


    // Rest
    // ----
  {
    addr: 'theprintful.com',
    css: '.flag.by { ' + flagBGI(null, true) + '}',
    sample: [{url: 'https://www.theprintful.com/', notes: 'From Belarusian IP' }],
  },

  {
    addr: 'codeforces\.com|codeforces\.ru',
    css: '.standings-flag[src *="flags-16/by.png"], .fffx{ '+ flagCSS + boxShadow('inset 0 0 1px rgba(0,0,0,.45), 0 1px 3px rgba(0,0,0,.2)') +' height: 12px; width: 16px; border-radius:2px;}'
  },
  {
    addr: 'budist.ru',
    css:'.flag[style *="background-image"][style *="img/flags/by.png"]:before{ '+ flagCSS +' height: 12px; width: 100%; position: relative; top: 50%; margin-top: -6px}' +
    '.flag[style *="background-image"][style *="img/flags/by.png"]{ background: none !important}' +
    'img[src *="/img/flags/by.png"], .fffx{ '+ flagCSS + boxShadow(0.2) +' height: 12px; display: inline-block !important; padding: 0 !important}',
    isAsyncSite: true
  },
  {
    //todo: this doesn't work
    addr: 'xperteleven.com',
    css:'img[src *="flags/BY.gif"], .fffx{ '+ sciahSphereSrc +' opacity: .5; height: 14px; width: 15px; }'
  },
  {
    addr: 'catholic.by',
    css:'img[src *="/flag-by2.gif"], .fffx{ '+ flagCSS +'; '+ boxShadow(0.28) + '; opacity: .5; height: 15px;}'
  },
  {
    addr: 'kinozal.tv',
    css:' img[src *="/pic/f/10.gif"], .fffx{'+ flagCSS + ' width: 14px; height: 12px}'
  },
  {
    addr: 'transinfo.by',
    css:' img[src *="country/BY.gif"], .fffx{'+ flagCSS + ' border: 0 !important}'
  },
  {
    addr: 'meteo-europ.com',
    css:'.country.country-by { '+ flagCSS + ' height: 20px}'
  },
  {
    addr: 'greyorder.su',
    css:'img[src *= "flags/by.png"], .fffx { '+ flagCSS + ' width: 16px; height: 12px}'
  },
  {
    addr: 'myjob.by',
    css:'img[src *= "flags/15x10/by.gif"], .fffx { '+ flagCSS + ' width: 15px; height: 12px;}'
  },
  {
    addr: 'ibbhotel.by',
    css:'img[src *="/images/flag_by.gif"], .fffx{ '+ flagCSS + boxShadow(0.28) +'}'
  },
  {
    addr: 'ibb.by',
    css:'img[src $="icons/russian.gif"],.fffx{ '+ flagCSS +'; width: 16px; height: 12px; vertical-align: top; '+ boxShadow(0.18) +'}'
  },
  {
    addr: 'tamby.info',
    css:'img[src $="images/strany/belarus.png"],.fffx{ '+ flagCSS +'; '+ boxShadow(0.15) +'}'
  },
  {
    addr: 'battlefield.com',
    css:'img[src $="/flags/by.gif"],.fffx{ '+ flagCSS +';width: 16px;height: 12px !important; '+ boxShadow(0.3) +'}'
  },
  {
    addr: 'joma.by',
    css:'img[src $="/images/by.png"],.fffx{ '+ flagCSS +';width: 16px;height: 12px !important;vertical-align: middle;}'
  },
  {
    addr: 'exist.by',
    css:'img[src $="/flags/by.gif"],.fffx{ '+ flagCSS +'; display: inline-block !important; width: 16px; height: 11px; '+ boxShadow(0.99) +'}'
  },
  {
    addr: 'busuu.com',
    css:'img.flag[src $="/flags/by.gif"],.fffx{ '+ flagCSS +'; display: inline-block !important }'
  },
  {
    addr: 'samsungapps.com',
    css:  'img[src $="flag/BY.png"]:not(.fakeclassforspecificity),.fffx:not(.fakeclassforspecificity) {'+
    + flagCSS +'; \
          height: 12px; \
          width: 18px;\
          border:0\
          '+ boxShadow(0.5) +'\
        }\
        a.country img {\
          margin-bottom:-2px;\
          '+ boxShadow(0) +
    '}'
  },
  {
    addr: 'freeads.by',
    css: 'img[src $="flag_header_freeads.by.gif"] {content:"";background:50% no-repeat url("'+sciahSphereSrc+'"); background-size: 35px 35px;}\
                  img[src $="flags/flag_icon_freeads.by.gif"],.fffx {'+
    flagCSS +'\
                      '+ boxShadow(0.65) +
    '}'
  },
  {
    addr: "go.hrw.com",
    css: 'img[src $="flags/belarus.gif"],.fffx {'+ flagCSS +'; \
           box-shadow:inset 0 0 0 1px rgba(0,0,0,.9);\
            width: 200px; height: 100px;}'
  },
  {
    addr: "internetworldstats.com",
    css: 'img[src $="images/belarusia.jpg"],.fffx {'+ flagCSS +'; \
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.9)}'
  },
  {
    addr: "flagcounter.com",
    css: 'img[src $="flags/by.png"],.fffx {'+ flagCSS +';padding:1px 0 0; \
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.4)}'
  },
  {
    addr: "(active\.by|active\.am|activecloud\.az|activecloud\.ge|activecloud\.com|activecloud\.ru|active\.uz)",
    css: '.by > img, .ru-by > img,' +
    '.content .selector .selBar .cont ul.flags li.by a i,' +
    ' li.lang a.by i,' +
    'i.by,.fffx  {'+ flagCSS +'}'
  },
  {
    addr: "(free\-torrents\.org|nnm\-club\.ru)",
    css: 'img[src $="images/flags/belarus.gif"],.fffx{'+ flagCSS +'; width:32px; height:20px;\
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.6)}'
  },
  {
    addr: "1c-bitrix.ru",
    css: 'img[src $="icons/Flag_Belarus.png"],.fffx{'+ flagCSS +';\
           box-shadow:inset 0 0 0 1px rgba(0,0,0,.2), 0 0 3px rgba(0,0,0,.2)}\
            img[src $="icons/belarus.jpg"],.fffx{'+ flagCSS +'; border:0; padding:0px; margin-left:.4em}'
  },
  {
    addr: "rfe.by",
    css: 'img[src $="lang_by.gif"]{'+ flagCSS+'; width: 15px; height: 11px; vertical-align: top}'
  },
  { addr: '(my\.)?opera\.com',
    css: '[style *= "flags/BY.png"]::before, img[src $= "flags/BY.png"], .f-BY::before{ '+ flagCSS +';height:12px}\
		  [style *= "flags/BY.png"]{background-image:none !important;position:relative;}\
		  [style *= "flags/BY.png"]::before{' +
    'width: 16px;height:12px;position:absolute;top:6px;right:3px;content:"";' +
    'box-shadow:inset 0 0 0 1px rgba(0,0,0,.3);}\
a[href="/community/members/location/Belarus"]{margin-left:.5em;}'
  },
  { addr: 'sovrep.gov.by',
    css: 'img[src $="top_01.jpg"],.fffx{'+flagCSS+';width:190px;height:108px;margin:0;border-left:1px solid #c24621}'
  },
  { addr: 'un.org',
    css: 'img[src $="belarus.gif"],.fffx{'+ flagCSS +'width:22px;height:13px;border:0 !important;}'
  },
  { addr: 'godaddy.com',
    css: 'div[style *="/country_flags_sml/by.gif"],.ffi_by{'+ flagCSS+'}\
				.ffi_by {height:13px;margin-top: 1px;}'
  },
  { addr: 'eventot.com',
    css:'.flag.flag-by {'+flagCSS+'}'
  },
  { addr: 'tb.by',
    css:'img[src $="img/bel.png"], .fffx {'+flagCSS+';width: 15px; height:10px} '
  },
  { addr: 'ecolines.by',
    css:'img[src $="flag-by.gif"], .fffx {'+flagCSS+';} '
  },

  { addr: 'cybergames.by',
    css:'img[src $="flags/by.gif"],.fffx {'+flagCSS+'width: 18px;height:12px;}' +
    'img[src $="flags/by_large.png"],.fffx {'+flagCSS+'width: 180px;height:90px;' +
    'box-shadow:inset 0 0 1px 1px rgba(0,0,0,.3);}'
  },
  { addr: 'audience.by',
    css:'img[src $="flags/by.gif"],.fffx {'+flagCSS+'width:23px;height:15px;}'
  },
  { addr: 'paei.by',
    css:'img[src $="by.gif"],.fffx {'+flagCSS+'width:39px;height:26px;}'
  },
  { addr: 'advocates.by',
    css:'img[src $="langs/by.gif"],.fffx {'+flagCSS+'width:22px;height:16px;}'
  },

  { addr: 'barsu.by',
    css:'img[src $="Images/by.gif"],.fffx {'+flagCSS+'width:28px;height:21px;margin-bottom:5px}'
  },
  { addr: 'prazdnik.?by(\.ru)?',
    css:'img[src $="/img/by.gif"] {content:"";height:50px;width:50px;display:inline-block;background:url("'+ sciahSphereSrc +'") no-repeat} '},
  { addr:'prazdnik.by',
    css:''
  },
  { addr: 'greencard.by',
    css:'img[src $="flags/by.gif"],.fffx {'+flagCSS+'width: 16px; height:12px}'
  },
  { addr: 'grodnonews.by',
    css:'img[src $="images/by.gif"],.fffx {'+flagCSS+'width:17px; height:13px}'
  },
  { addr: 'techlabs.by',
    css:'img[src $="flag-by.gif"],.fffx {'+flagCSS+
    'width: 18px;height:12px;' +
    'box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);}'
  },
  { addr: 'parta.by',
    css:'img[src $="icons/flag_by.gif"],.fffx {'+flagCSS+'width: 18px;height:12px;' +
    'box-shadow:inset 0 0 0 1px rgba(0,0,0,.4);}'
  },
  { addr: 'fotoclub.by',
    css:'img[src $="icons/flag-by.png"],.fffx {'+flagCSS+'width:40px;height:25px}'
  },
  { addr: 'mypet.by',
    css:'img[src $="16x12/by.png"],.fffx {'+flagCSS+'width:17px;height:12px;}' +
    '.small_container img.flag{padding:0;margin:3px 7px 0 0;}',
    files: [
      { src: "50x50/by.png",
        newSrc: sciahSphereSrc,
        width:"50",
        height: "50"
      }
    ]
  },
  { addr: 'autoline(\-eu)?.*',
    css: '[style *="flags/langs/by.gif"] {position:relative;background:none !important} \
				[style *="flags/langs/by.gif"]::before {'+flagCSS+'width: 18px;height:13px;position:absolute;left:0;top:3px;}\
				img[src $="flag/flag_by.png"],.fffx {'+flagCSS+'width:24px;height:19px}'
  },
  { addr: 'library.gsu.by',
    css:'img[src $="img/by.png"],.fffx {'+flagCSS+'width:24px;height:14px;margin-bottom:1px}'
  },
  { addr: '((pl|en)\.)?brestintourist.*',
    css: 'img[src $="lang/by.png"],.fffx{'+flagCSS+'width:25px;height:18px;margin:0 0 3px;' +
    '        box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);}\
.item_by a{position:relative}\
.item_by a:after{content:"";display:block;position:absolute;left:-34px;top:-3px;' +
    'width:25px;height:25px;background:url("'+sciahSphereSrc+'") no-repeat}'
  },
  { addr: 'navitel.*',
    css:'img[src $="global/by.png"],.fffx {'+flagCSS+'width: 18px;height:13px;' +
    'box-shadow:inset 0 0 0 1px rgba(0,0,0,.15), 1px 1px 2px  rgba(0,0,0,.4);}'
  },
  { addr: 'world-geographics.com',
    css:'img[src $="flags/BY.png"],.fffx{'+flagCSS+'height:18px;border-radius:1.5px;' +
    'box-shadow:inset 0 0 0 1px rgba(0,0,0,.04),inset 0 -1px 0  rgba(0,0,0,.15);}'+
    'img[src $="flags/BY.png"]:not(".flagsmall") {width:48px;height:42px;}'
  },
  { addr: 'adsl.by',
    css: 'img[src $="flags/Belarus.png"],.fffx{'
    + flagCSS +
    'width:14px;' +
    'height:12px;'+
    'box-shadow:inset 0 0 0 1px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.1);}'
  },
  { addr: 'pac.by',
    css: '.by_l_by,.by_l {width: 16px} .by_l_by img,.by_l img{display:none;}' +
    '.by_l_by a::before, .by_l a::before{'+flagCSS+'width: 16px;height:12px;display:block}' +
    '.by_l_by a::after,.by_l a::after{width: 16px;height:9px;display:block;content:"";'+ reflectionDownCSS +'}'
  }
];
// END dzieShto


/**
 * Return flag as a CSS background-image property
 * @param params
 * @param important boolean Appends !important to the rule if it is true
 * @returns {string}
 */
function flagBGI(params, important) {
  var imp = '';
  if (important) {
    imp = ' !important';
  }
  return 'background-image: url("'+ flagURL(params) +'")'+ imp +';';
}
/**
 *
 * @param params
 *   Parameters for the generated image. If it's a string - it will be passed on as the URL of new image.
 *   If params is an object it will be passed to getSVGFlagURL to generate a necessary image.
 * @returns {string}
 */
function flagURL (params) {
  var newImg = '';

  if (params && params.replacer) {
    newImg = params.replacer;
  }
  else {
    newImg = getSVGFlagURL(params);
  }

  return newImg;
}
/**
 * @param img Object Parameters for the replacer image
 *
 * img properties:
 *
 * @property {number} img.w
 * @property {number} img.h
 * @property {number} img.r
 * @property {number} img.canvasW
 * @property {number} img.canvasH
 * @property {number|string} img.contour
 * @property {boolean} img.gradient
 * @property {boolean|number} img.emboss
 * @property {string} img.red
 *
 * @returns {string}
 */
function getSVGFlagURL (img) {
  img = img || { w: 'auto'};
  img.w = img.w || 32; // default image width
  img.h = img.h || 16; // default image height

  var flagTpl = '\n\
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">\n\
      <clipPath id="clip">\n\
        <rect id="clipRect" class="shape" fill="none" width="100%" height="100%" rx="0"/>\n\
      </clipPath>\n\
      <radialGradient id="gradient" fx="22%" fy="17%" r="60%" gradientUnits="objectBoundingBox">\
      <stop  offset="0" style="stop-color:#000;stop-opacity:0"/>\
      <stop  offset="1" style="stop-color:#000;stop-opacity:0.14"/>\
      </radialGradient>\
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">\n\
        <feGaussianBlur id="shadowBlur" result="blurOut" in="offOut" stdDeviation="30"/>\n\
        <feOffset id="shadowOffset" result="offOut" in="SourceAlpha" dx="10" dy="20"/>\n\
        <feBlend in="SourceAlpha" in2="blurOut" mode="normal"/>\n\
        <feFlood id="shadowColor" flood-color="#000" flood-opacity="100"/>\n\
        <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>\n\
      </filter>\n\
      <rect id="canvasBg" width="100%" height="100%" fill="none"></rect>\n\
      <g id="flag">\n\
        <g id="flagBase" clip-path="url(#clip)">\n\
          <rect id="white" class="shape" fill="#fff" width="100%" height="100%"/>\n\
          <rect id="red" fill="#E21313" y="33.3333333%" width="100%" height="33.3333333%"/>\n\
          <line id="emboss" opacity="0.18" stroke-width="4" stroke="#fff" x1="0" y1="0" x2="0" y2="100%" vector-effect="non-scaling-stroke"/>\n\
          <rect id="contour" class="shape" opacity="0.1" stroke-width="2" stroke="#000" fill="none" width="100%" height="100%" vector-effect="non-scaling-stroke"/>\n\
          <rect id="overlayGradient" class="shape"></rect>\
        </g>\n\
      </g>\n\
    </svg>\n\
    ';

  var SVGNS = 'http://www.w3.org/2000/svg';
  var SVGParent = window.document.createElement('div');
      SVGParent.innerHTML = flagTpl;
  var SVG = SVGParent.firstElementChild;
  var clipRect = SVG.querySelector('#clipRect');
  var flag = SVG.querySelector('#flag');
  var flagBase = SVG.querySelector('#flagBase');
  var canvasBg = SVG.querySelector('#canvasBg');
  var shadowOffset = SVG.querySelector('#shadowOffset');
  var shadowBlur = SVG.querySelector('#shadowBlur');
  var white = SVG.querySelector('#white');
  var red = SVG.querySelector('#red');
  var emboss = SVG.querySelector('#emboss');
  var gradient = SVG.querySelector('#gradient');
  var contour = SVG.querySelector('#contour');
  var overlayGradient = SVG.querySelector('#overlayGradient');
  var shape = SVG.getElementsByClassName('shape');

  // Set size
  // --------
  if (img.w == 'auto') {
    // stretch to full width
    SVG.setAttribute('viewBox', '0 0 32 16');
    SVG.setAttribute('width', '100%');
  }
  else {
    // set dimensions if needed
    SVG.setAttribute('viewBox', '0 0 ' + img.w + ' ' + img.h);
    SVG.setAttribute( 'width', img.w);
    SVG.setAttribute( 'height', img.h);
  }

  // Offset flag on canvas
  // ---------------------
  if (img.canvasW && img.canvasH && img.w && img.h) {

    [].forEach.call(shape, function(el){
      el.setAttribute( 'width', img.w);
      el.setAttribute( 'height', img.h);
    });

    red.setAttribute('width', img.w);
    red.setAttribute('height', img.h / 3);
    red.setAttribute('y', img.h / 3);

    // center flag on canvas
    flag.setAttribute('transform', 'translate(' + (img.canvasW - img.w) / 2  + ',' + (img.canvasH - img.h) / 2  + ')');

    SVG.setAttribute('viewBox', '0 0 ' + img.canvasW + ' ' + img.canvasH);
  }

  // Set flag drop shadow
  // ------------------------
  //if (img.shadowX || img.shadowY || img.shadowBlur) {
  //
  //  //if (img.shadowX !== undefined) {
  //  //  shadowOffset.setAttribute('dx', img.shadowX);
  //  //}
  //  //if (img.shadowY !== undefined) {
  //  //  shadowOffset.setAttribute('dy', img.shadowY);
  //  //}
  //  if (img.shadowBlur !== undefined) {
  //    shadowBlur.setAttribute('stdDeviation', img.shadowBlur);
  //  }
  //  flag.setAttribute('filter', 'url("#shadow")');
  //}
  //else {
  //  // remove filter from DOM
  //}

  // Set flag radius
  // ---------------
  if (img.r) {
    [].forEach.call(shape, function(el){
      el.setAttribute('rx', img.r);
    });
  }

  // Set contour darkness
  // --------------------
  if (img.hasOwnProperty('contour')) {
    if (img.contour == 'none') {
      contour.style.display = 'none';
    }
    if (typeof img.contour === 'number') {
      contour.setAttribute('opacity', img.contour);
    }
  }

  // Show/hide gradient
  // ------------------
  if (img.gradient) {
    overlayGradient.setAttribute('fill', 'url(#gradient)');}
  else {
    SVG.removeChild(gradient);
  }

  // Emboss effect
  // -------------
  if (img.emboss === false || img.emboss === 0) {
    emboss.setAttribute('opacity', 0);
  }
  else if (typeof img.emboss == 'number') {
    emboss.setAttribute('opacity', img.emboss);
  }

  // Set red color
  // -------------
  if (img.red) {
    red.setAttribute('fill', img.red);
  }
  if (img.white) {
    white.setAttribute('fill', img.white);
  }

//  console.log(SVG.outerHTML);

  var url = 'data:image/svg+xml,' + encodeURIComponent(SVG.outerHTML);
  return url;
}

function setupFilters (){

  var il = dzieShto.length;
  for (var i = 0, site; i < il, site = dzieShto[i]; i++ ) {
    if (site.images) {
      site.images.forEach(function (img) {

        // turn image into URL pattern if it's not a URL already
        img.globs = [];

        // if it's filename without protocol
        if (img.i.indexOf('://') == -1) {
          img.globs.push('*://'+ site.addr +'/*' + img.i + '*');
          img.globs.push('*://*.'+ site.addr +'/*' + img.i + '*'); // www and subdomains
        }
        // if it's a glob or url
        else {
          img.globs.push(img.i);
        }

        //onBeforeRequest || onBeforeSendHeaders
        chrome.webRequest.onBeforeRequest.addListener(
          function() {
            var url = flagURL(img);
            //console.log('replacing img with ', url);
            return {redirectUrl: url}
          },
          {types: ['image'], urls: img.globs },
          ['blocking']
        );
      });
    }
  }
}

function serveFixes () {
  // Listen for CSS requests
  chrome.runtime.onMessage.addListener(
      function(message, sender, cb) {

        // message.domain - from tab URL
        // site.addr - from dzieShto

        var css = '';
        var favicon = '';
        dzieShto.forEach(function (site) {
          if (message.domain.match(urlToRegex(site.addr))) {
            css += site.css + '\n\n';
            favicon = site.favicon;
          }
        });

        if (css || favicon) {
          cb({css: css, favicon: favicon});
        }
      }
  );
}
function urlToRegex (url) {

  // if it doesn't contain \ * ( | then it's simple url
  if (!url.match(new RegExp('[\\\*\(\|]'))) {
    // escape dots
    url = url.replace(/\./g, '\\.');
  }
  return url;
}

setupFilters();
serveFixes();

// function setup (){}
// This is triggered when the extension is installed or updated.
// chrome.runtime.onInstalled.addListener(function () {
//   setupFilters ();
//   serveFixes();
// });