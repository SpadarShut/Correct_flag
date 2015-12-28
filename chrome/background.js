
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

var sciahSphereSrc = chrome.extension.getURL('res/sciahSphere.svg') ;

var gradientCSS = '\
		background:\
        linear-gradient(transparent, transparent 32%, rgba(204,18,18,.95) 32%,  rgba(204,18,18,.95) 68%, transparent 68%, transparent),\
        linear-gradient(-45deg, rgba(198,198,198,0.43) 0%, rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%) !important;\
		background-color:#fff !important;';

var reflectionDownCSS = '\
			background:\
 			linear-gradient(top, rgba(255,255,255,1) 0%,rgba(255,255,255,0.67) 33%,rgba(204,18,18,0.66) 34%,rgba(204,18,18,0.32) 68%,rgba(255,255,255,0.31) 69%,rgba(255,255,255,0) 100%); ';

var flagCSS = '\
        content:"";\
        display:inline-block;\
        border-radius:1px;\
        '+ boxShadow() +'\
		'+ gradientCSS;

var dzieShto = [
  {
    addr: 'theprintful.com',
    css: '.flag.by { background-image: url("' + flagURL() + '") !important ;}',
    sample: [{url: 'https://www.theprintful.com/', notes: 'From Belarusian IP' }],
  },
  {
    addr: 'behance.net|adobe.com',
    css: '.iti-flag.by {'+ flagCSS+ ' box-shadow:none; border-radius: 0; }'
  },
  {
    addr: 'paypal.com',
    css: '' +
    'img[src *="icon/icon_BY_22x14.gif"],.fffx{'+ flagCSS+'width: 22px;height: 16px;padding:0 !important;margin:3px 3px 1px 10px }' +
    '.country-selector .belarus, .country-selector .BY {background: none;}'+
    '.country-selector .belarus:before, .country-selector .BY:before {' + flagCSS +'width: 22px;height:16px;margin: 3px 0 0 5px;display: block}'
  },
  {
    addr: 'pressball.by',
    css: '' +
    'img[src *="online_games/teams/th_belarus.jpg"],.fffx {'+ flagCSS+'width: 200px; height: 130px } '+
    'img[src *="online_games/teams/th_blr1.jpg"],img[src *="online_games/teams/th_blr2.jpg"],img[src *="online_games/teams/th_blr4.jpg"] {'+ flagCSS+' } '+
    '#rbl_onl a img[src *="online_games/teams/th_blr"], #rbl_onl span img {height: 130px}'+
    'img[src *="images/countries/belarus.png"] {'+ flagCSS+'  height:14px; width: 14px}' +
    '.euro-football .country img[src *="images/countries/belarus.png"] { height:12px}'
  },
  {
    addr: 'iihfworlds2014.com',
    css: '' +
    'img[src *="images/umbraco/by.png"],img[src *="flags/16x11/BLR.png"] {  width: 16px; height: 12px;'+ flagCSS+' } '+
    'img[src *="flags/30x22/BLR.png"], img[src *="/media/182946/belarus.png"] { width: 30px; height: 22px;'+ flagCSS +'} ' +
    '#teams .team-overview h1 img[src *="/media/182946/belarus.png"], #teams .team-overview h1 img.fff {border: 0; margin-top: 2px}'
  },
  {
    addr: 'mail.ru',
    css: '.phonePrefix[style *="country_icons/by.png"], ' +
    '.form__phone-prefix__prefix[style *="country_icons/by.png"] { background: none !important;}'+
    '.phonePrefix[style *="country_icons/by.png"]:before, ' +
    '.form__phone-prefix__prefix[style *="country_icons/by.png"]:before { ' +
    'width: 16px; height: 12px;position: absolute; left: 0; top: 2px; '+  flagCSS   +'}' +
    'img[src *="/img/country/flag16x11/by.png"] {height: 12px;'+ flagCSS+'}' +
    '[style *="background-image: url(/res120/pic/sport/team/d1/600.png#120x120)"] { background-image: url("'+ sciahSphereSrc +'") !important; -moz-background-size: 94px 94px; background-size: 94px 94px;}'
  },
  {
    addr: 'tribuna.com',
    css: '.flag-1302 { '+ flagCSS + boxShadow('inset 0 0 1px rgba(0,0,0,1), inset 0 0 0 2px rgba(255,265,255,.25)') +'; border-radius: 2px}'
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
    addr: 'google.com',
    css:'.talk-flag[style *="background-position: 0px -1100px"], .i18n-phone-flag[style *="background-position: 0px -1100px"]{ '+
    flagCSS +' background-position: 0 0; height: 12px; }' +
    '.aYU-aYX-aD2[style *="background-position"][style *="-1100px"] { '+ flagCSS +' height: 12px; }' +
    '._GAf-_countryFlag-_BY {'+ flagCSS +'; height: 12px}'
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
    addr: 'timeanddate.com',
    css:'img[src *= "gfx/fl/"][src *= "/by.png"], .fffx { '+ flagCSS + '}'
  },
  {
    addr: 'myjob.by',
    css:'img[src *= "flags/15x10/by.gif"], .fffx { '+ flagCSS + ' width: 15px; height: 12px;}'
  },
  {
    addr: 'football.by',
    css:'img[src *= "stat/getimage.php?flagid=1"], .fffx { '+ flagCSS + ' width: 19px; height: 12px;}'
  },
  {
    addr: 'telegraf.by',
    css:'.flag-BYR { '+ flagCSS + 'height: 12px !important}'
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
  {
    addr: 'ibbhotel.by',
    css:'img[src *="/images/flag_by.gif"], .fffx{ '+ flagCSS + boxShadow(0.28) +'}'
  },
  {
    addr: 'ibb.by',
    css:'img[src $="icons/russian.gif"],.fffx{ '+ flagCSS +'; width: 16px; height: 12px; vertical-align: top; '+ boxShadow(0.18) +'}'
  },
  {
    addr: 'pbliga.com',
    css:'img[src *="flags/flag_17.png"],.fffx{ '+ flagCSS +'; width: 22px; height: 18px; vertical-align: middle; '+ boxShadow("inset 0 0 0 1px rgba(0,0,0,0.25), inset -5px 0 10px rgba(255,255,255,.4)") +'}' +
    'img[src *="flags/blr.gif"][title],.fffx[title]{ '+ flagCSS +'width: 16px; height: 12px;'+ boxShadow("inset 0 0 0 1px rgba(0,0,0,0.25), inset -5px 0 10px rgba(255,255,255,.4)") + '}'
  },
  {
    addr: 'tamby.info',
    css:'img[src $="images/strany/belarus.png"],.fffx{ '+ flagCSS +'; '+ boxShadow(0.15) +'}'
  },
  {
    addr: 'belpost.by',
    css:'img[src $="/i/blr.jpg"],.fffx{ '+ flagCSS +';width:24px;height: 15px !important;margin-top:-1px; '+ boxShadow(0.2) +'}'
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
    addr: 'myscore.ru',
    css:'.flag.fl_31,.fffx{ ' +
    flagCSS +
    'content: normal; ' +
    'background-position: 0 50%, 0 50% !important; ' +
    'background-size: 16px 12px,  16px 12px !important; ' +
    'background-repeat: no-repeat, no-repeat !important;' +
    '}' +
    '.header .flag.fl_31 { background: none !important; box-shadow: none !important;vertical-align: middle}'+
    '.header .flag.fl_31:before { ' +
    flagCSS +
    'width: 16px;' +
    'height: 12px;' +
    'margin: 0 8px -1px -24px;'+
    '}'+
    '#fs .flag, #fsmenu .flag, #main .flag.fl_31 { height: 12px !important }' +
    'img[src *="/res/image/data/rN9xhjRc-I7KbpC8c.png"], .fffx {'+ flagCSS +' height: 25px; margin-top: 12px}'
  },
  {
    addr: 'championat.com',
    css:'img[src $="cflags/by.gif"],.fffx{ '+ flagCSS +'; display: inline-block !important; width: 16px; height: 12px;}'
  },
  {
    addr: 'dinamo-minsk.by',
    css:'img[src $="_8_0x0.jpg"][title="Беларусь"], ' +
    'img[src $="/51/~568_8_0x0.jpg"],.fffx {'+ flagCSS +'; display: inline-block !important; width: 33px; height: 18px; '+ boxShadow(0.2) +'}'
  },
  {
    addr: 'exist.by',
    css:'img[src $="/flags/by.gif"],.fffx{ '+ flagCSS +'; display: inline-block !important; width: 16px; height: 11px; '+ boxShadow(0.99) +'}'
  },
  {
    addr: 'sportpanorama.by',
    css:'img[src $="/flags/1.jpg"],.fffx{ '+ flagCSS +'; display: inline-block !important; width: 16px; height: 11px; '+ boxShadow(0.3) +'}'
  },
  {
    addr: 'pefl.ru',
    css:'img[src $="/flags/18.gif"],.fffx{ '+ flagCSS +'; display: inline-block !important } ' +
    'img[src $="/flags/18.gif"][width="30"]{ height: 20px; vertical-align: middle}'
  },
  {
    addr: 'sports.ru',
    css:'.flag-s.flag-1302,.fffx{ '+ flagCSS +' }' +
    '.flag-circle.f-belarus {'+ flagCSS +' border-radius: 50%; '+ boxShadow("inset 0 0 9px rgba(0,0,0,.2)")+'}' +
    'img[src *="73017810/1317751561.637227_34.jpg"]{' + boxShadow('inset 0 0 6px rgba(0,0,0,.4)') +'content:"";background:50% no-repeat url("'+sciahSphereSrc+'"); background-size: 48px 48px; border-radius: 50%;}'
  },
  {
    addr: 'busuu.com',
    css:'img.flag[src $="/flags/by.gif"],.fffx{ '+ flagCSS +'; display: inline-block !important }'
  },
  {
    addr: 'vk.com|vkontakte.ru',
    css:'.lang_box_row {position: relative;} .lang_box_row[style *="images/lang_flags/2.gif"]{ background-image: none !important}' +
    '.lang_box_row[style *="images/lang_flags/2.gif"]:before {'+ flagCSS +
    'width: 34px;' +
    'height: 26px;' +
    'position: absolute; left: 10px; top: 50%; margin-top: -13px;'+
    ' }'
  },
  {
    addr: 'gismeteo.(by|ru|ua|lt|com)',
    css:  'body #menu li.sprite .flag span.by {'+ flagCSS + boxShadow(0.25) +' height: 12px; background-position: 0 0, 0 0 !important; position: relative; top: 1px;}'
  },
  {
    addr: 'slando.by',
    css:  'img[src $="flags/by.png"],.fffx {'+ flagCSS +'; height: 12px; width: 16px;}'
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
  { addr: '.*',
    css: ' html body .skype_pnh_container span[style *="background-position: -909px"], \
				 html body .skype_pnh_container span[style ="background-position:-909px 1px !important;"] {background:none !important;position:relative !important;} \
				 html body .skype_pnh_container span[style *="background-position: -909px"]::after, \
				 html body .skype_pnh_container span[style ="background-position:-909px 1px !important;"]::after \
				 {'+flagCSS+'height:12px; width: 16px; position:absolute; left:0; top:0;}'
  },
  { addr: '(my\.)?opera.com',
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
  { addr: 'un.org',
    css: 'img[src $="belarus.gif"],.fffx{'+ flagCSS +'width:22px;height:13px;border:0 !important;}'
  },
  { addr: 'yandex\..*',
    css:  '.b-country-flag_size-16_by, .country-flag_size-16_by {'+ flagCSS +'} \
				 img[src $="b-foot__lang__by.png"],\
				 .b-langs__flag_lang_by, .langs__flag_lang_by, \
				 .b-mail-icon_lang-be, .mail-icon_lang-be { \
				    position:relative; \
				    top:1px;\
				    '+ flagCSS +'\
				    width: 16px;\
				    height:12px !important;\
				    padding: 0 ! important; \
				} \
				.b-mail-dropdown__item_with-icon .b-mail-icon.b-mail-icon_lang-be {\
                    background:'+  gradientCSS +'\
                    margin: -6px 0 0 7px ;\
                }\
				.b-keyboard__lang-by .b-keyboard__lang-ic { \
						' + gradientCSS +'\
						width:14px;\
						border:0;\
						position:relative;\
						height:11px;\
						margin-right:3px\
				}\
				.b-keyboard__lang-by .b-keyboard__lang-ic, \
				img[src *="b-country-flag_size-16_by.png"] {'+ flagCSS +'width: 16px;height:12px;} ' +
    '.b-country-flag_size-16_by,' +
    '.b-country-flag_size-24_by, ' +
    '.b-country-flag_size-32_by, ' +
    '.b-country-flag_size-48_by {'+ flagCSS +'}' +
    '.b-country-flag_size-16_by { padding: 12px 0 0 16px; }' +

    '.b-country-flag_size-48_by.event__rival_pos_l, ' +
    '.b-country-flag_size-48_by.event__rival_pos_r {height:37px; width:48px; top: 40px; bottom: auto; padding: 0 }'+

    '.b-country-flag_size-24_by.event__rival_pos_l, ' +
    '.b-country-flag_size-24_by.event__rival_pos_r {background-size: 24px 18px; width: 24px;height: 18px; top: 22px; bottom: auto; padding: 0}'
  },
  { addr: 'godaddy.com',
    css: 'div[style *="/country_flags_sml/by.gif"],.ffi_by{'+ flagCSS+'}\
				.ffi_by {height:13px;margin-top: 1px;}'
  },
  { addr: 'rutracker.org',
    images: [
      {i: 'flags/by.gif', contour: 1, w: 24, h: 15 },
      {i: 'flags/17.gif', contour: 1, w: 32, h: 20 },
      {i: 'flags/lang_by.png', w: 40, h: 20, contour: 0 },
      {i: 'logo_new_by.gif', replacer: chrome.extension.getURL('res/rutracker_logo_by.png') },
    ],
    sample: [
      {url: 'http://rutracker.org/forum/profile.php?mode=viewprofile&u=21923338', notes: 'See user flag. You must be logged in'},
      {url: 'https://by.rutracker.org/forum/index.php', notes: 'Logo must be white-red-white'},
      {url: 'https://ua.rutracker.org/forum/', notes: 'In footer'},
    ]
  },
  { addr: 'eventot.com',
    css:'.flag.flag-by {'+flagCSS+'}'
  },
  { addr: 'skyscanner\.*',
    css:'img[src $="flag/small/by.png"], .fffx {'+flagCSS+';width: 16px; height:12px;}' +
    '#culture-info #current-user-country img[title=Belarus]{margin-top: 2px }'
  },
  { addr: 'tb.by',
    css:'img[src $="img/bel.png"], .fffx {'+flagCSS+';width: 15px; height:10px} '
  },
  { addr: 'ecolines.by',
    css:'img[src $="flag-by.gif"], .fffx {'+flagCSS+';} '
  },
  { addr: 'kvitki.by',
    images: [
      { i: 'lang_by.gif', w: 16, h: 12 },
      { i: 'lang_by_ov.gif', w: 16, h: 12, red: '#888' },
    ],
    sample: [{ url: 'http://www.kvitki.by/', 'notes': 'In header icon + hover'}]
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
  { addr: 'kinopoisk.ru',
    css:'.flag69 * {'+flagCSS+'; height:12px}\
		       .flag.flag69 {height: 12px} \
		       .tenItems .flags {height: auto !important}\
		       .movieFlags .flag69 * {height: 10px}\
			   .country_flag[style *="/by.png"] {background-image: url("'+sciahSphereSrc+'") !important; opacity:.5;}'
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
 -o-repeating-linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, rgba(255,255,255,.25) 1px,rgba(255,255,255,.25) 2px), \
 -o-linear-gradient(-45deg,transparent, transparent 30%, rgba(204,18,18,.95) 30%,  rgba(204,18,18,.95) 70%, transparent 70%, transparent), \
 -o-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%,rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%); \
	background:\
 -moz-repeating-linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, rgba(255,255,255,.25) 1px,rgba(255,255,255,.25) 2px), \
 -moz-linear-gradient(-45deg,transparent, transparent 30%, rgba(204,18,18,.95) 30%,  rgba(204,18,18,.95) 70%, transparent 70%, transparent), \
 -moz-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%,rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%); \
	background:\
 -webkit-repeating-linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, rgba(255,255,255,.25) 1px,rgba(255,255,255,.25) 2px), \
 -webkit-linear-gradient(-45deg,transparent, transparent 30%, rgba(204,18,18,.95) 30%,  rgba(204,18,18,.95) 70%, transparent 70%, transparent), \
 -webkit-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%,rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%); \
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
  { addr: 'adsl.by',
    css: 'img[src $="flags/Belarus.png"],.fffx{'
    + flagCSS +
    'width:14px;' +
    'height:12px;'+
    'box-shadow:inset 0 0 0 1px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.1);}'
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
  { addr: 'pac.by',
    css: '.by_l_by,.by_l {width: 16px} .by_l_by img,.by_l img{display:none;}' +
    '.by_l_by a::before, .by_l a::before{'+flagCSS+'width: 16px;height:12px;display:block}' +
    '.by_l_by a::after,.by_l a::after{width: 16px;height:9px;display:block;content:"";'+ reflectionDownCSS +'}'
  },
  { addr: 'postcrossing.com',
    css: '.flag.flag-BY {'+ flagCSS +'width: 16px;height:12px;}'
  },
  { addr: 'localhost',
    css: 'body {background: #eee000}',
    images: [
      { i:'zachod-nad-balotam.png' }
    ]
  }
];
// END dzieShto

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
 * img.w
 * img.h
 * img.rx
 * img.contour
 * img.gradient
 * img.emboss
 * img.red
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
        <rect id="cliprect" fill="none" width="100%" height="100%" rx="0"/>\n\
      </clipPath>\n\
      <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0.0898" y1="-2.271" x2="25.0163" y2="19.2252">\n\
        <stop offset="0.1484" stop-color="#F1F0EC"/>\n\
        <stop offset="0.2196" stop-color="#FEFDF9"/>\n\
        <stop offset="0.3429" stop-color="#FCFBF7"/>\n\
        <stop offset="0.3872" stop-color="#f5f4f0"/>\n\
        <stop offset="0.4116" stop-color="#f2f1ed"/>\n\
        <stop offset="0.4662" stop-color="#FEFDF9"/>\n\
        <stop offset="0.6008" stop-color="#FBFAF6"/>\n\
        <stop offset="0.6929" stop-color="#F2F1ED"/>\n\
        <stop offset="0.7722" stop-color="#E3E2DE"/>\n\
        <stop offset="0.8439" stop-color="#CDCCC9"/>\n\
        <stop offset="0.8739" stop-color="#c9c8c5"/>\n\
      </linearGradient>\n\
      <g clip-path="url(#clip)">\n\
        <rect id="base" fill="#fff" width="100%" height="100%"/>\n\
        <rect id="red" fill="#E21313" y="33.3333333%" width="100%" height="33.3333333%"/>\n\
        <line id="emboss" opacity="0.18" stroke-width="4" stroke="#fff" x1="0" y1="0" x2="0" y2="100%" vector-effect="non-scaling-stroke"/>\n\
        <rect id="contour" opacity="0.1" stroke-width="2" stroke="#000" fill="none" width="100%" height="100%" vector-effect="non-scaling-stroke"/>\n\
      </g>\n\
    </svg>\n\
    ';

  var SVGNS = 'http://www.w3.org/2000/svg';
  var SVGParent = window.document.createElement('div');
      SVGParent.innerHTML = flagTpl;
  var SVG = SVGParent.firstElementChild;
  var cliprect = SVG.querySelector('#cliprect');
  var base = SVG.querySelector('#base');
  var red = SVG.querySelector('#red');
  var emboss = SVG.querySelector('#emboss');
  var gradient = SVG.querySelector('#gradient');
  var contour = SVG.querySelector('#contour');


  // Set size
  if (img.w == 'auto') {
    // stretch to full width
    SVG.setAttribute('viewBox', '0 0 32 16');
    SVG.setAttributeNS(SVGNS, 'width', '100%')
  }
  else {
    // set dimensions if needed
    SVG.setAttribute('viewBox', '0 0 ' + img.w + ' ' + img.h);
    SVG.setAttribute( 'width', img.w);
    SVG.setAttribute( 'height', img.h);
  }

  // set img radius
  if (img.rx) {
    cliprect.setAttribute('rx', img.rx);
    base.setAttribute('rx', img.rx);
    contour.setAttribute('rx', img.rx);
  }

  if (img.hasOwnProperty('contour')) {
    if (img.contour == 'none') {
      contour.style.display = 'none';
    }
    if (typeof img.contour === 'number') {
      contour.setAttribute('opacity', img.contour);
    }
  }

  // Show/hide gradient
  if (img.gradient) {
    base.setAttribute('fill', 'url(#gradient)');}
  else {
    SVG.removeChild(gradient);
  }

  // Emboss effect
  if (img.emboss === false || img.emboss === 0) {
    emboss.setAttribute('opacity', 0);
  }

  if (img.red) {
    red.setAttribute('fill', img.red);
  }

  var url = 'data:image/svg+xml,' + encodeURIComponent(SVG.outerHTML);
  //console.log(SVG.outerHTML);
  return url;
}

function setupFilters (){

  var il = dzieShto.length;
  for (var i = 0, site; i < il, site = dzieShto[i]; i++ ) {
    if (site.images) {
      site.images.forEach(function (img) {

        // todo: handle case when images are from domain another than the site
        // turn image into URL pattern if it's not a URL already
        img.globs = [];

        if (img.i.indexOf('://') == -1) {
          img.globs.push('*://'+ site.addr +'/*' + img.i + '*');
          img.globs.push('*://*.'+ site.addr +'/*' + img.i + '*'); // www and subdomains
        }
        else {
          img.globs.push(img.i);
        }

        //onBeforeRequest || onBeforeSendHeaders
        chrome.webRequest.onBeforeRequest.addListener(
          function() {
            var url = flagURL(img);
            return {redirectUrl: url}
          },
          {types: ['image'], urls: img.globs },
          ['blocking']
        );
      });
    }
  }
}

function serveCSS () {
  // Listen for CSS requests
  chrome.runtime.onMessage.addListener(
      function(message, sender, cb) {

        // message.domain - from tab URL
        // site.addr - from dzieShto
        var css = '';
        dzieShto.forEach(function (site) {
          if (message.domain.match(urlToRegex(site.addr))) {
            css += site.css + '\n\n';
          }
        });

        css && cb(css);
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
serveCSS();

// function setup (){}
// This is triggered when the extension is installed or updated.
// chrome.runtime.onInstalled.addListener(function () {
//   setupFilters ();
//   serveCSS();
// });