
/**
 *  Logic:
 *  - BG script knows all domains to work on: it can replace images using
 *   webRequest API and compile css to be injected in pages.
 *  - Injected script on document start sends a msg to BG for css and favicons, and on
 *   DOMContentLoaded injects it
 *
 * BG:
 *  - sets up url filters
 *  - listens for messages from pages
 *  - on message: see domain, pick CSS from dzieShto, send response
 *
 *
 *  INJECTED:
 *  - on doc_start send msg for css
 *  - on DOMContentLoaded inject response
 *
 * */


var Sciah = function() {


  function res (file) {
    if (chrome && chrome.extension && chrome.extension.getURL) {
      return chrome.extension.getURL('res/'+ file );
    }
    else {
      return '../res/' + file;
    }
  }
  var pahoniaURL = 'https://upload.wikimedia.org/wikipedia/commons/1/16/Coat_of_arms_of_Belarus_%281918%2C_1991-1995%29.svg';

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
      '}',
      sample: [{url:'*', notes: 'Skype click to call plugin'}]
    },
    {
      addr: '.*',
      css:
      '.iti-flag.by { \
        background: linear-gradient(to bottom, #fff, #fff 33.333333%, #E21313 33.33333%, #E21313 66.66666%, #fff 66.666%);\
      }',
      sample: [{url:'*', notes: 'Popular lib for phone input https://github.com/jackocnr/intl-tel-input'}]
    },

    // Sites popular in Belarus
    // ------------------------

    { addr: 'vk.com',
      images: [
        { i:'D83CDDE7D83CDDFE_2x.png', replacer: res('D83CDDE7D83CDDFE_2x-bcb.png') },
        { i:'D83CDDE7D83CDDFE.png', replacer: res('D83CDDE7D83CDDFE-bcb.png') },
      ],
      sample: [{ url: 'https://vk.com/im?sel=16073387', notes: 'Must be logged in. Open smiley menu in the comment form and scroll it to the bottom '}]
    },
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
          '+ flagBGI({outline: 0.2, w: 'auto'}) +'\
          background-position: 0 0 !important;\
          background-size: 16px 12px;\
          height:12px;\
      }\
      /* Metrika countries */\
      .icon__country_id_149 {' +
      flagBGI({w: 16, h: 11, gradient: true, outline: 0.05}) +
      '}'
      ,
      sample: [
        {url: 'https://www.yandex.by/', notes: 'Click keyboard in search field, select Belarusian in dropdow kbd'},
        {url: 'https://mail.yandex.by/?uid=225165401&login=sp-shut#setup/other', notes: ' Mail Settins - Language in sidebar, also in footer'},
        {url: 'https://metrika.yandex.ru/stat/geo?selected_rows=Od%2FJ%2F9%2Cz%2BIcaA%2C9nRiZj%2CvkYaDN%2Cd1vFww&id=24050107', notes: 'Metrika, '}
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
        {i: 'flags/by.gif', outline: 1, w: 24, h: 15 },
        {i: 'flags/17.gif', outline: 1, w: 32, h: 20 },
        {i: 'flags/lang_by.png', w: 40, h: 20, outline: 0 },
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
        {i: '*://*/*header/by.png', w: 50, h: 38, outline: 0 },
        {i: '*://*/*header/BY.png', w: 50, h: 38, outline: 0 }
      ],
      sample: [{url: 'http://www.skyscanner.net/', notes: 'In header from BLR IP. Also click it for dialog anf hamburger menu'}]
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
        background-image: url("'+ res('sciahSphere.svg') +'") !important;\
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
      flagBGI({ w: 'auto', outline: 0.04, white: '#F0EFF0' }) +
      'background-position: 0 0 !important;' +
      '}',
      sample: [
        { url:'http://tourism.gismeteo.ru', notes: 'Flags block'},
      ]
    },
    {
      addr: 'vandrouki.',
      images: [{i: '*://*/Belarus.png', w: 17, h: 10}],
      sample: [
        { url:'http://vandrouki.by/', notes: 'In footer'},
      ]
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
      images: [{i: '/flags/18.gif', w: 115, h: 77, outline: 0}],
      sample: [{url: 'http://pefl.ru/index.php', notes: 'Go to Турниры link in sidebar and see Belarus (links are signed)'}]
    },
    {
      addr: 'sports\.ru|tribuna\.com',
      css:
      '.flag-1302, ' +
      '.icon-flag_1302 {'+
      flagBGI({ r: 2, w: 'auto', emboss: 0.3, outline: 0.17, red: '#FF3E00' }) +
      'background-position: 0 0 !important;'+
      '}' +
      '.icon-flag-circle_belarus,' +
      '.icon-flag-circle_tag-id_2682521 {' +
      'background-position: 0 0 !important;' +
      'background-image: url("'+ res('sportsRuBelarusCircle.png') +'") !important' +
      '}',
      sample: [
        {url: 'http://www.sports.ru/', notes: 'On homepage in header language selector'},
        {url: 'http://www.sports.ru/tribuna/statuses/hockey/', notes: 'On inner page in header language selector'},
        {url: 'http://www.sports.ru/ekstraliga/', notes: 'Inner page in page content'},
        {url: 'http://by.tribuna.com/transfers/', notes: 'Circle flags. If there\'s no Belarus, inspect a circle flag, set class icon-flag-circle_tag-id_* to icon-flag-circle_belarus' },
        {url: 'http://by.tribuna.com/premier-league-belarus/', notes: 'All over the place' }
      ]
    },
    {
      addr: 'sportpanorama.by',
      images: [{i: '/flags/1.jpg', w: 16, h: 11, outline: 0.15, emboss: 0.27 }],
      sample: [{url: 'http://sportpanorama.by/themes/49/table/', notes: 'See table'}]
    },
    {
      addr: '(myscore\.ru)|(soccerstand\.com)|(livescore\.in)',
      css:'.flag.fl_31 { ' +
      flagBGI({w: 16, h: 12, canvasW: 16, canvasH: 13, outline: 0.16}) +
      'background-position: 0 0 !important;'+
      '}',
      images: [{i: '/image/data/rN9xhjRc-I7KbpC8c.png', w: 50, h: 25, canvasW: 50, canvasH: 50}],
      sample: [{url: 'http://www.myscore.ru/football/belarus/super-cup/', notes: 'In breadcrumbs'}]
    },
    {
      addr: 'championat.com',
      images: [{i: 'http://st.championat.com/i/flags/18x12/by.png', w: 18, h: 12, outline: 0}],
      sample: [{url: 'http://www.championat.com/tennis/player/208.html', notes: 'See bio "Гражданство"'}]
    },
    {
      addr: 'dinamo-minsk.by',
      images: [
        {i: '/Flags/30x19/Belarus.png', canvasW: 30, canvasH: 19, w: 28, h: 17, outline: 0.2},
        {i: '/Flags/31x24/Belarus.png', canvasW: 31, canvasH: 24, w: 29, h: 22, outline: 0.07, r: 1, white: '#f0f0f0'},
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
        {i: 'flags/blr.gif', w: 16, h: 11, gradient: true, outline: 0.15 }
      ],
      sample: [
        {url: 'http://pbliga.com/mng_roster.php?id=129', notes: 'In header, in table'},
        {url: 'http://pbliga.com/mng_stat_players.php?sid=1&id=7', notes: 'In table'},
        {url: 'http://pbliga.com/mng_tr_table.php#form', notes: 'See next page if there are not BLR flags'},
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
      css:'img[src *="land/by.png"], .fffx { '+ flagCSS + '}',
      images: [{i: '*://*/*land/by.png', w: 18, h: 14}],
      sample: [{url:'http://news.sportbox.ru/Vidy_sporta/Hokkej/world_championship/stats/turnir_11616/game_1380556264'}]
    },
    {
      addr: 'soccer.ru',
      images: [{i:'files/flags/15.gif', w: 21, h: 13, gradient: 'wave', outline: 0.02, emboss: 0}],
      sample: [{url: 'http://www.soccer.ru/teams/teamfixtures/340.shtml'}]
    },
    {
      addr: 'transfermarkt.de',
      //css:'.sprite_land_18{ '+ flagCSS +'; '+ boxShadow(0.28) +' height: 12px}',
      images: [
        {i: '*://*/*flagge/small/18.png*', w: 20, h: 12, outline: 0, white: '#f0f0f0'},
        {i: '*://*/*flagge/verysmall/18.png*', w: 15, h: 9, outline: 0, white: '#f0f0f0'},
        {i: '*://*/*flagge/tiny/18.png*', w: 12, h: 7, outline: 0, white: '#f0f0f0'},
      ],
      sample: [{url: 'http://www.transfermarkt.de/aleksandr-yermakovich/profil/trainer/17196', notes: 'All three sizes here' }]
    },
    { addr: 'allsport-live.ru',
      images: [
        {i: 'flag_fon.gif', replacer: res('allsport-live.ru-flag_fon.gif')},
        {i: 'flag_belarus.png', w: 46, h: 36, gradient: true },
      ],
      css:
      // Legacy,
      '#fsbody .fl_31, ' +
      '.fl_31 { ' +
      flagBGI() +
      'background-size: 16px 12px;'+
      'background-position: 0 0;'+
      '}',
      sample: [{url: 'http://allsport-live.net/bel/', notes: 'In header flag strip & in table'}]
    },
    { addr: 'livetv.',

      sample: [
        {url: 'http://livetv.sx/livescore/', notes: 'Scroll to find Belarus - national/by.gif'},
        {url: 'http://livetv.sx/eventinfo/311107_belarus_russia/', notes: '50x50 livetv-teams-fullsize-1373.gif '},
        {url: 'http://livetv.sx/showvideo/252655_belarus_russia/', notes: '36x36 livetv-teams-1374.gif'},
      ],

      images: [
        {i: '*://cdn.livetvcdn.net/img/national/by.gif', w: 16, h: 11, gradient: true },
        {i: '*://cdn.livetvcdn.net/img/flags/24.png', w: 16, h: 11, gradient: true }, // legacy ?
        {i: '*://*/*/icons/by.gif', replacer: res('livetv-img-icons-by.gif')},

        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1372.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1373.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1374.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1375.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1376.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1377.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1378.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1379.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1380.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1381.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1382.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1383.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1384.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1385.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1386.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1387.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1388.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1389.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1390.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1391.gif', replacer: res('livetv-teams-fullsize-1373.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/fullsize/1392.gif', replacer: res('livetv-teams-fullsize-1373.gif')},

        {i: '*://cdn.livetvcdn.net/img/teams/1372.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1373.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1374.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1375.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1376.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1377.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1378.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1379.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1380.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1381.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1382.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1383.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1384.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1385.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1386.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1387.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1388.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1389.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1390.gif', replacer: res('livetv-teams-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/1391.gif', replacer: res('livetv-teams-1374.gif')},

        {i: '*://cdn.livetvcdn.net/img/teams/18/1372.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1373.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1374.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1375.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1376.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1377.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1378.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1379.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1380.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1381.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1382.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1383.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1384.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1385.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1386.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1387.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1388.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1389.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1390.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1391.gif', replacer: res('livetv-teams-18-1374.gif')},
        {i: '*://cdn.livetvcdn.net/img/teams/18/1392.gif', replacer: res('livetv-teams-18-1374.gif')},
      ],
    },

    { addr: 'wildstat.ru',
      images: [
        { i:'img/flag/BLR.png', w: 20, h: 10, outline: 0 },
        { i:'img/flag/middle/BLR.png', w: 60, h: 30, outline: 0, emboss: 0 },
      ],
      sample: [{ url: 'http://wildstat.ru/p/28', notes: 'Sidebar + page content'}]
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
      css:
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
      images: [
        {i: '*://*/gfx/n/fl/16/by.png', w: 16, h: 11, outline: 0},
        {i: '*://*/gfx/n/fl/32/by.png', w: 32, h: 22, outline: 0},
      ],
      sample: [
        {url: 'http://www.timeanddate.com/worldclock/belarus/minsk'},
      ]
    },
    {
      addr: 'erepublik.com',
      images: [
        {i: '*://*/*/flags/S/Belarus.gif', w: 14, h: 11 }, // 14 12
        {i: '*://*/*/flags/M/Belarus.gif', replacer: res('erepublik-M-Belarus.gif')}, // 22 16
        {i: '*://*/*/flags/L/Belarus.gif', replacer: res('erepublik-L-Belarus.gif')}, // 30 22
        {i: '*://*/*/flags/XL/Belarus.gif', replacer: res('erepublik-XL-Belarus.gif')}, // 46 33

        {i: '*://*/*/flags_png/S/Belarus.png', replacer: res('erepublik-S-Belarus.png')},
        {i: '*://*/*/flags_png/M/Belarus.png', replacer: res('erepublik-M-Belarus.png')},
        {i: '*://*/*/flags_png/L/Belarus.png', replacer: res('erepublik-L-Belarus.png')},
        {i: '*://*/*/flags_png/XL/Belarus.png', replacer: res('erepublik-XL-Belarus.png')},
      ],
      css:
      '.country_flag_elem.flagBelarus,' +
      '#battle_listing li .country_flags.Belarus {' +
      'background-image: url("'+ res('erepublik-L-Belarus.png') + '") !important;'+
      'background-position: 50% 50% !important;' +
      'background-size: contain !important;' +
      '}',
      sample: [
        {url:'http://www.erepublik.com/en/country/society/Belarus', notes: 'XL in head, click arrow under the flag, see '},
        {url:'http://www.erepublik.com/en/economy/market/83/0/1/citizen/0/price_asc/1'},
        {url:'http://www.erepublik.com/en/military/campaigns'},
        {url:'http://www.erepublik.com/en/citizen/profile/4525473'},
        {url:'http://www.erepublik.com/en/military/battlefield-new/69299'},
      ]
    },
    { addr: 'postcrossing.com',
      css:
      '.flag.flag-BY {'+
      flagBGI({w: 16, h: 11, gradient: true}) +
      'background-position: 0 0 !important;' +
      '}',
      sample: [{url:'https://www.postcrossing.com/explore/countries', notes: 'Scroll to Belarus'}]
    },
    { addr: 'wikipedia.org',
      images: [
        {i: '*://*/*Coat_of_arms_of_Belarus.svg*', replacer: pahoniaURL},
        {i: '*://*/*Official_coat_of_arms_of_the_Republic_of_Belarus_%28v%29.svg*', replacer: pahoniaURL},

        {i: '*://*/*Flag_of_Belarus.svg*', w: 'auto', outline: 0},
        {i: '*://*/*Flag_of_Belarus_%281995-2012%29.svg*', w: 'auto', outline: 0},
      ],
      sample: [
        {url:'https://ru.wikipedia.org/wiki/Кондратьев,_Георгий_Петрович', notes: 'In table'},
        {url:'https://ru.wikipedia.org/wiki/Белоруссия', notes: 'Flag and Coat of arms'}
      ]
    },


    // Rest
    // ----
    {
      addr: 'theprintful.com',
      css: '.flag.by { ' + flagBGI(null, true) + '}',
      sample: [{url: 'https://www.theprintful.com/', notes: 'From Belarusian IP' }],
    },

    {
      addr: 'codeforces.com',
      images: [{i: '*://*/*/flags-16/by.png', replacer: res('erepublik-S-Belarus.png')}],
      sample: [{url: 'http://codeforces.com/ratings/countries', notes: 'See Belarus'}]
    },
    {
      addr: 'budist.ru',
      images: [{i: 'img/flags/by.png', w: 16, h: 11, gradient: true}],
      sample: [{url: 'http://budist.ru/user740343/'}]
    },
    {
      addr: 'greyorder.su',
      images: [{i:'flags/by.png', w: 16, h: 11 }],
      sample: [{url: '?', notes: 'Legacy'}]
    },
    {
      addr: 'tamby.info',
      images: [
        {i: 'images/flag/belarus_small_flag.gif', w: 200, h: 100, outline: 0 },
        {i: 'images/strany/belarus.png', replacer: res('erepublik-XL-Belarus.png') },
      ],
      sample: [
        {url: 'http://tamby.info/', notes: 'Flags block'},
        {url: 'http://www.tamby.info/tv-online/tv-belarusi.htm', notes: 'In sidebar, in heading'},
      ]
    },
    {
      addr: 'battlefield.com',
      images: [
        {i: '*://*.battlefield.com/public/common/flags/by.gif', w: 16, h: 11, gradient: true},
        {i: '*://eaassets-a.akamaihd.net/bl-cdn/*/flags/by.gif', w: 16, h: 12, gradient: true}
      ],
      sample: [{url:'http://battlelog.battlefield.com/bf4/ru/forum/threadview/2832654624707075687/', notes: 'See Volozar'}]
    },
    {
      addr: 'joma.by',
      css:
      '.bel i { '+
      flagBGI({w:16, h: 12, gradient: true}) +
      'background-position: 50% 1px;' +
      'background-size: 16px 11px;' +
      'background-repeat: no-repeat;' +
      '}',
      sample: [{url: 'http://joma.by/', notes: 'In header'}]
    },
    {
      addr: 'freeads.by',
      images: [
        { i:'flags/flag_icon_freeads.by.gif', w: 18, h: 12, outline: 1, gradient: true },
        { i:'flag_header_freeads.by.gif', replacer: res('freeads.by-flag_header_freeads.by.png') }
      ],
      sample: [{ url:'http://www.freeads.by/', notes: ''}]
    },
    {
      addr: "internetworldstats.com",
      images: [{ i:'images/belarusia.jpg', w: 164, h: 82, outline: 0 }],
      sample: [{ url:'http://www.internetworldstats.com/europa2.htm#by', notes: 'Scroll to Belarus'}]
    },
    {
      addr: "flagcounter.com",
      images: [
        { i:'*://cdn.boardhost.com/flags/by.png', w: 16, h: 11, gradient: true },
        { i:'*://*/*/flags_128x128/by.png', w: 114, h: 84, gradient: true },
      ],
      sample: [{ url:'http://s03.flagcounter.com/factbook/by/7tv', notes: 'dropdown, and large one'}]
    },
    {
      addr: "(active\.by|active\.am|activecloud\.az|activecloud\.ge|activecloud\.com|activecloud\.ru|active\.uz)",
      css:
      '.by > img, .ru-by > img,' +
      '.content .selector .selBar .cont ul.flags li.by a i,' +
      ' li.lang a.by i,' +
      'i.by  {'+
      flagBGI({w: 16, h:11, gradient: true}, true) +
      'background-position: 0 0 !important; ' +
      '}',
      sample: [
        { url:'http://www.active.am/', notes: 'In menu'},
        { url:'http://www.active.by/', notes: 'In menu'},
        { url:'http://www.activecloud.ge/', notes: 'In menu'},
        { url:'http://www.active.uz/', notes: 'In menu'},
      ]
    },
    {
      addr: "1c-bitrix.ru",
      images: [{ i:'images/fsb_2014_country_ico_21.png', w: 54, h: 54, r: 27  }],
      sample: [{ url:'http://www.1c-bitrix.ru/about/seminars/fc/index.php#city_5990', notes: 'Country selector'}]
    },
    {
      addr: "rfe.by",
      images: [
        { i:'templates/_ares/images/lang_by.gif', w: 16, h: 11, gradient: true },
      ],
      sample: [{ url:'http://www.rfe.by/', notes: 'In menu'}]
    },
    { addr: 'ranking.by',
      images: [
        { i:'img/flags/by_wyb2.gif', w: 28, h: 17, canvasW: 34, canvasH: 25, red: '#E13F63' },
        { i:'img/flags/by_wyb.gif', w: 28, h: 17, canvasW: 34, canvasH: 25 },
      ],
      sample: [{ url:'http://ranking.by/', notes: 'Header + open dropdown menu'}]
    },
    { addr: 'paei.by',
      images: [{ i:'App_Themes/default/images/by.gif', w: 39, h: 26, outline: 0, white: '#D2D2D2' }],
      sample: [{ url:'http://paei.by/be-BY/default.aspx', notes: ''}]
    },
    { addr: 'barsu.by',
      images: [{ i:'img/Belarus-24.png', w: 22, h: 15, canvasW: 24, canvasH: 24, outline: 0 }],
      sample: [{ url:'http://barsu.by/', notes: 'Header'}]
    },
    { addr: 'greencard.by',
      images: [{ i:'flags/by.gif', w: 16, h: 11, gradient: true }],
      sample: [{ url:'http://greencard.by/', notes: ''}]
    },
    { addr: 'techlabs.by',
      images: [{ i:'frontend/images/flag-by.gif', w: 18, h: 12, outline: 1, gradient: true }],
      sample: [{ url:'http://www.techlabs.by/', notes: 'Side menu'}]
    },
    { addr: 'techlabs.ua',
      images: [{ i:'frontend/images/flag_by.gif', w: 18, h: 12, outline: '#868186', gradient: true, red: '#FD4848' }],
      sample: [{ url:'http://www.techlabs.ua/', notes: 'Side menu'}]
    },
    { addr: 'parta.by',
      images: [
        { i:'resources/icons/flag_by.gif', w: 18, h: 12, red: '#C62643', white: '#F9F9F9', gradient: true, outline: 0 },
      ],
      sample: [
        { url:'http://www.parta.by/', notes: ''},
      ]
    },
    { addr: '(portal-)?fotoclub.(ru|org\.ua|kz)',
      images: [
        { i:'*://*/*-images/icons/flag-by.png', w: 40, h: 25, outline: 0.05, emboss: 0 },
      ],
      sample: [
        { url:'http://fotoclub.by/', notes: ''},
        { url:'http://www.portal-fotoclub.ru/', notes: ''},
        { url:'http://www.fotoclub.org.ua/', notes: ''},
        { url:'http://www.photoclub.kz/', notes: ''},
      ]
    },
    { addr: 'mypet.by',
      images: [
        { i:'images/flags/16x12/by.png', w: 16, h: 12, gradient: true},
        { i:'images/flags/50x50/by.png', replacer: res('sciahSphere.svg')},
      ],
      css:'img[src $="50x50/by.png"]{'+
      'width: 50px;' +
      'height: 50px;' +
      'box-sizing: border-box;' +
      'padding: 2px;' +
      '}',
      sample: [
        { url:'http://mypet.by/pitomnik/Yaks-Vonavi', notes: 'Sphere & small'},
      ]
    },
    { addr: 'autoline(-?(eu|ba|nl|bg|arabic|tm|market))?(\.(com|co))?.*',
      images: [
        { i:'*://*/*flags/ids-png/by.png', w: 16, h: 11, gradient: true },
      ],
      css:
      '.spr-fl.spr-fl-by {' +
      flagBGI({w: 16, h: 11, gradient: true}) +
      'background-position: 0 0 !important;' +
      '}',
      sample: [
        { url:'http://autoline.by/', notes: 'Open menu'},
      ]
    },
    { addr: 'brestintourist.by',
      images: [
        { i:'media/mod_languages/images/be.gif', w: 18, h: 12, gradient: true, outline: 0 },
      ],
      sample: [
        { url:'http://brestintourist.by/', notes: ''},
      ]
    },
    { addr: 'utiaconsult.odessa.ua',
      images: [
        { i:'media/mod_languages/images/be.gif', w: 18, h: 12, gradient: true, outline: 0 },
      ],
      sample: [
        { url:'http://brestintourist.by/', notes: ''},
      ]
    },
    { addr: 'yoox.com',
      images: [
        { i:'*://*/*yoox90/layout/flags/BY.jpg', w: 20, h: 13, },
      ],
      css:
      '.spriteNaxBY {' +
      flagBGI({w: 20, h: 13}, true) +
      'background-position: 0 0 !important;'+
      '}',
      sample: [
        { url: 'http://www.yoox.com/by/', notes: 'From Belarusian IP, + open lang menu'},
      ]
    },

    { addr: 'utiaconsult.odessa.ua',
      images: [
        { i:'images/stories/vizi/belarus.jpg', w: 150, h: 76, },
        { i:'belarus-flag.gif', w: 1181, h: 788 },
        { i:'images/stories/vizi/belarus2.jpg', replacer: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Coat_of_arms_of_Belarus_%281918%2C_1991-1995%29.svg' },
      ],
      css: 'img[src *="vizi/belarus2.jpg"] {' +
      'width: 100px;' +
      '}',
      sample: [{ url: 'http://utiaconsult.odessa.ua/?p=96', notes: ''}]
    },

    { addr: 'alfacomponent.com',
      images: [
        { i:'images/flag_by.gif', w: 120, h: 60 },
        { i:'images/where_to_buy.gif', replacer: res('alfacomponent.com-where_to_buy.gif') },
      ],
      sample: [{ url: 'http://www.alfacomponent.com/where_to_buy.php', notes: 'In header and in page content'},]
    },

    { addr: 'oblastyrb.narod.ru',
      images: [
        { i:'Ger.gif', replacer: pahoniaURL },
        { i:'fla.gif', w: 235, h: 120 },
        { i:'images/where_to_buy.gif', replacer: res('alfacomponent.com-where_to_buy.gif') },
      ],
      sample: [{ url: 'http://oblastyrb.narod.ru/vitebsk.htm', notes: 'In header flag & CoA'},]
    },

    { addr: 'vedaj.by',
      images: [{ i:'media/mod_languages/images/be.gif', w: 30, h: 14, red: '#FFA4A4', outline: '#DEDBDE', r: 1 },],
      sample: [{ url: 'http://vedaj.by/', notes: 'In header'},]
    },

    { addr: 'vlib.by',
      images: [{ i:'media/mod_falang/images/by.png', w: 30, h: 24, canvasW: 32, canvasH: 32 , gradient: true, r: 2 },],
      sample: [{ url: 'http://vlib.by/index.php/by/', notes: 'In header'},]
    },

    {addr: 'megogo.net',
      css:
      '.flag.flag-by {' +
      flagBGI({w: 18, h: 12, outline: 0, red: '#D52B1E', emboss: 0}) +
      'background-position: 0 0; '+
      '}',
      sample: [{ url: 'http://megogo.net/by', notes: 'Lang menu'}]
    },

    { addr: 'seorank.by',
      images: [{ i:'*://sypexgeo.net/img/flags/by.png', replacer: res('sypexgeo-by.png') },],
      sample: [{ url: 'http://seorank.by/doorwood.by', notes: 'Scroll down to map'}]
    },

    { addr: 'equatorial.by',
      images: [{ i:'equatorial.by/files/belarus_001.gif', w: 448, h: 299, emboss: 0},],
      sample: [{ url: 'http://equatorial.by/node/55', notes: ''}]
    },

    { addr: 'rp5.by',
      css: '.be.imgflag {' +
      flagBGI({w: 13, h: 9, gradient: true, r: 1}) +
      'background-position: 0 0;' +
      '}',
      sample: [{ url: 'http://rp5.by/', notes: 'Click Language button'}]
    },


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
   * @property {number|string} img.outline
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


//<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">\n\
//<feGaussianBlur id="shadowBlur" result="blurOut" in="offOut" stdDeviation="30"/>\n\
//<feOffset id="shadowOffset" result="offOut" in="SourceAlpha" dx="10" dy="20"/>\n\
//<feBlend in="SourceAlpha" in2="blurOut" mode="normal"/>\n\
//<feFlood id="shadowColor" flood-color="#000" flood-opacity="100"/>\n\
//<feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>\n\
//</filter>\n\

    var flagTpl = '\n\
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">\n\
      <clipPath id="clip">\n\
        <rect id="clipRect" class="shape" fill="none" width="100%" height="100%" rx="0"/>\n\
      </clipPath>\n\
      <radialGradient id="gradient-simple" fx="22%" fy="14%" r="80%">\n\
        <stop offset="0" style="stop-color: #000; stop-opacity:0"/>\n\
        <stop offset="0.2" style="stop-color: #000; stop-opacity:0"/>\n\
        <stop offset="0.6" style="stop-color: #000; stop-opacity:0.06"/>\n\
        <stop offset="1" style="stop-color: #000; stop-opacity:0.10"/>\n\
      </radialGradient>\n\
      <linearGradient id="gradient-wave" gradientUnits="objectBoundingBox" x1="0" y1="0" y2="0">\n\
        <stop offset="0"    style="stop-color: #000; stop-opacity:0.15"/>\n\
        <stop offset="0.21" style="stop-color: #000; stop-opacity:0"/>\n\
        <stop offset="0.26" style="stop-color: #000; stop-opacity:0"/>\n\
        <stop offset="0.48" style="stop-color: #000; stop-opacity:0.15"/>\n\
        <stop offset="0.76" style="stop-color: #000; stop-opacity:0"/>\n\
        <stop offset="0.79" style="stop-color: #000; stop-opacity:0"/>\n\
        <stop offset="0.96"    style="stop-color: #000; stop-opacity:0.15"/>\n\
      </linearGradient>\n\
      <rect id="canvasBg" width="100%" height="100%" fill="none"></rect>\n\
      <g id="flag">\n\
        <g id="flagBase" clip-path="url(#clip)">\n\
          <rect id="white" class="shape" fill="#fff" width="100%" height="100%"/>\n\
          <rect id="red" fill="#E21313" y="33.3333333%" width="100%" height="33.3333333%"/>\n\
          <line id="emboss" opacity="0.18" stroke-width="4" stroke="#fff" x1="0" y1="0" x2="0" y2="100%" vector-effect="non-scaling-stroke"/>\n\
          <rect id="outline" class="shape" opacity="0.1" stroke-width="2" stroke="#000" fill="none" width="100%" height="100%" vector-effect="non-scaling-stroke"/>\n\
          <rect id="overlayGradient" class="shape" fill="none" width="100%" height="100%"></rect>\n\
        </g>\n\
      </g>\n\
    </svg>\n\
    ';

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
    var gradientSimple = SVG.querySelector('#gradient-simple');
    var gradientWave = SVG.querySelector('#gradient-wave');
    var outline = SVG.querySelector('#outline');
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
      SVG.setAttribute( 'width', img.canvasW);
      SVG.setAttribute( 'height', img.canvasH);
    }
    else {
      canvasBg.remove();
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

    // Set outline darkness
    // --------------------
    if (img.hasOwnProperty('outline')) {
      if (img.outline == 'none') {
        outline.style.display = 'none';
      }
      if (typeof img.outline === 'number') {
        outline.setAttribute('opacity', img.outline);
      }
      if (typeof img.outline === 'string') {
        outline.setAttribute('opacity', 1);
        outline.setAttribute('stroke', img.outline);
      }
    }

    // Show/hide gradient
    // ------------------
    if (!img.gradient){
      gradientSimple.remove();
      gradientWave.remove();
    }
    else if (img.gradient === true || img.gradient === 'simple') {
      overlayGradient.setAttribute('fill', 'url(#gradient)');
      gradientWave.remove();
    }
    else if (img.gradient === 'wave'){
      var deg = 25;

      function toRadians (angle) {
        return angle * (Math.PI / 180);
      }
      var gX2 = (Math.cos(toRadians(90 - deg)) * img.h + Math.cos( toRadians(deg) ) * img.w) / img.w;

      console.log(gX2);
      gradientWave.setAttribute('gradientTransform', 'rotate('+ deg +')');
      gradientWave.setAttribute('x2', gX2);
      overlayGradient.setAttribute('fill', 'url(#gradient-wave)');
      gradientSimple.remove();
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

    if ( img.gradient == 'wave' ) {
      console.log(SVG.outerHTML);
    }

    return 'data:image/svg+xml,' + encodeURIComponent(SVG.outerHTML);
  }

  function setupFilters (){

    var il = dzieShto.length;
    var completed = 0;
    for (var i = 0, site; i < il, site = dzieShto[i]; i++ ) {

      if (site.sample) {completed ++ }
      //else {
      //  console.log(site.addr);
      //}

      if (site.images) {

        site.images.forEach(function (img) {

          //console.log(site.addr);
          //console.log(decodeURIComponent(flagURL(img)));

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
                //console.log(img.globs, url);
                return {redirectUrl: url}
              },
              {types: ['image'], urls: img.globs },
              ['blocking']
          );
        });
      }
    }

    //console.log('DONE ' + completed + ' of ' + il +', ' + completed/il*100 + '%');
  }

  function serveFixes () {
    // Listen for CSS requests
    chrome.runtime.onMessage.addListener(
        function(message, sender, cb) {
          if (typeof message == 'object' && message.domain) {
            var css = '';
            var favicon = '';
            dzieShto.forEach(function (site) {
              if (message.domain && message.domain.match(urlToRegex(site.addr))) {
                if (site.css) {
                  css += site.css + '\n\n';
                }
                favicon = site.favicon;
              }
            });

            if (css || favicon) {
              cb({css: css, favicon: favicon});
            }
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

  this.getSiteData = function () {
    return dzieShto;
  };

  this.init = function () {
    setupFilters();
    serveFixes();
  };
};


// function setup (){}
// This is triggered when the extension is installed or updated.
// source.runtime.onInstalled.addListener(function () {
//   setupFilters ();
//   serveFixes();
// });