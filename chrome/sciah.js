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
// @include     */*
// ==/UserScript==

(function(){
	// Add CSS, don't wait for DOMContentLoaded
	var sciahSphereSrc = 'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%2212.65%2025.65%2050%2050%22%3E%0D%0A%3Cfilter%20id%3D%22AI_GaussianBlur_2%22%3E%0D%0A%09%3CfeGaussianBlur%20%20stdDeviation%3D%222%22%3E%3C%2FfeGaussianBlur%3E%0D%0A%3C%2Ffilter%3E%0D%0A%3Cfilter%20id%3D%22AI_GaussianBlur_1%22%3E%0D%0A%09%3CfeGaussianBlur%20%20stdDeviation%3D%221%22%3E%3C%2FfeGaussianBlur%3E%0D%0A%3C%2Ffilter%3E%0D%0A%3Cdefs%3E%0D%0A%09%3Ccircle%20id%3D%22e2_%22%20cx%3D%2237.65%22%20cy%3D%2250.65%22%20r%3D%2225%22%2F%3E%0D%0A%3C%2Fdefs%3E%0D%0A%3CclipPath%20id%3D%22e3_%22%3E%0D%0A%09%3Cuse%20xlink%3Ahref%3D%22%23e2_%22%20%20overflow%3D%22visible%22%2F%3E%0D%0A%3C%2FclipPath%3E%0D%0A%3Crect%20x%3D%220.275%22%20y%3D%2225.15%22%20clip-path%3D%22url(%23e3_)%22%20fill%3D%22%23FFF%22%20width%3D%2272.25%22%20height%3D%2251.125%22%2F%3E%0D%0A%3Crect%20x%3D%220.275%22%20y%3D%2240.4%22%20clip-path%3D%22url(%23e3_)%22%20fill%3D%22%23E21313%22%20width%3D%2272.25%22%20height%3D%2220.625%22%2F%3E%0D%0A%3CradialGradient%20id%3D%22e6_%22%20cx%3D%2237.6499%22%20cy%3D%2250.6499%22%20r%3D%2225%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0D%0A%09%3Cstop%20%20offset%3D%220.897%22%20style%3D%22stop-color%3A%23FFF%3Bstop-opacity%3A0%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9124%22%20style%3D%22stop-color%3A%23FCFCFC%3Bstop-opacity%3A0.0238%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9243%22%20style%3D%22stop-color%3A%23F2F2F2%3Bstop-opacity%3A0.0421%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9351%22%20style%3D%22stop-color%3A%23E2E2E2%3Bstop-opacity%3A0.0587%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9452%22%20style%3D%22stop-color%3A%23CACACA%3Bstop-opacity%3A0.0743%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9548%22%20style%3D%22stop-color%3A%23ACACAC%3Bstop-opacity%3A0.0891%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.964%22%20style%3D%22stop-color%3A%23878787%3Bstop-opacity%3A0.1033%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.973%22%20style%3D%22stop-color%3A%235B5B5B%3Bstop-opacity%3A0.1171%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9815%22%20style%3D%22stop-color%3A%232A2A2A%3Bstop-opacity%3A0.1302%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9879%22%20style%3D%22stop-color%3A%23000%3Bstop-opacity%3A0.14%22%2F%3E%0D%0A%3C%2FradialGradient%3E%0D%0A%3Ccircle%20clip-path%3D%22url(%23e3_)%22%20fill%3D%22url(%23e6_)%22%20cx%3D%2237.65%22%20cy%3D%2250.65%22%20r%3D%2225%22%2F%3E%0D%0A%3Cg%20opacity%3D%220.44%22%20clip-path%3D%22url(%23e3_)%22%20filter%3D%22url(%23AI_GaussianBlur_2)%22%3E%0D%0A%09%3Cellipse%20fill%3D%22none%22%20stroke%3D%22%237FBED9%22%20stroke-width%3D%222%22%20stroke-miterlimit%3D%2210%22%20cx%3D%2237.65%22%20cy%3D%2248.9%22%20rx%3D%2225%22%20ry%3D%2223.25%22%2F%3E%0D%0A%3C%2Fg%3E%0D%0A%3Cg%20opacity%3D%220.2%22%20clip-path%3D%22url(%23e3_)%22%20filter%3D%22url(%23AI_GaussianBlur_2)%22%3E%0D%0A%09%3Ccircle%20fill%3D%22none%22%20stroke%3D%22%23000%22%20stroke-width%3D%222%22%20stroke-miterlimit%3D%2210%22%20cx%3D%2237.65%22%20cy%3D%2237.65%22%20r%3D%2230.375%22%2F%3E%0D%0A%3C%2Fg%3E%0D%0A%3Cg%20clip-path%3D%22url(%23e3_)%22%20filter%3D%22url(%23AI_GaussianBlur_1)%22%3E%0D%0A%09%3CradialGradient%20id%3D%22e10_%22%20cx%3D%2237.6499%22%20cy%3D%2263.5249%22%20r%3D%2237.8758%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0D%0A%09%09%3Cstop%20%20offset%3D%220.1916%22%20style%3D%22stop-color%3A%23FFF%3Bstop-opacity%3A0%22%2F%3E%0D%0A%09%09%3Cstop%20%20offset%3D%221%22%20style%3D%22stop-color%3A%23FFF%22%2F%3E%0D%0A%09%3C%2FradialGradient%3E%0D%0A%09%3Cellipse%20fill%3D%22url(%23e10_)%22%20cx%3D%2237.9%22%20cy%3D%2239.025%22%20rx%3D%2217.125%22%20ry%3D%2211.75%22%2F%3E%0D%0A%3C%2Fg%3E%0D%0A%3CradialGradient%20id%3D%22e12_%22%20cx%3D%2269.9272%22%20cy%3D%2238.165%22%20r%3D%2214.1967%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0D%0A%09%3Cstop%20%20offset%3D%220.1916%22%20style%3D%22stop-color%3A%23FFF%3Bstop-opacity%3A0%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%221%22%20style%3D%22stop-color%3A%23FFF%3Bstop-opacity%3A0.45%22%2F%3E%0D%0A%3C%2FradialGradient%3E%0D%0A%3Cpath%20clip-path%3D%22url(%23e3_)%22%20fill%3D%22url(%23e12_)%22%20d%3D%22M60.525%2C49.431c-0.037%2C3.375%2C1.445%2C2.885%2C1.625%2C0.219%0D%0A%09c0.5-7.406-4.292-12.333-4.292-12.333S60.619%2C40.9%2C60.525%2C49.431z%22%2F%3E%0D%0A%3C%2Fsvg%3E';
	var gradientCSS = '\
		background:\
     -o-linear-gradient(transparent, transparent 32%, rgba(204,18,18,.95) 32%,  rgba(204,18,18,.95) 68%, transparent 68%, transparent),\
     -o-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%, rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%) !important;\
		background:-moz-linear-gradient(transparent, transparent 32%, rgba(204,18,18,.95) 32%,  rgba(204,18,18,.95) 67%, transparent 67%, transparent),\
   -moz-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%, rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%) !important;\
		background:\
-webkit-linear-gradient(transparent, transparent 32%, rgba(204,18,18,.95) 32%,  rgba(204,18,18,.95) 68%, transparent 68%, transparent),\
-webkit-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%, rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%) !important;\
		background:\
        linear-gradient(transparent, transparent 32%, rgba(204,18,18,.95) 32%,  rgba(204,18,18,.95) 68%, transparent 68%, transparent),\
        linear-gradient(-45deg, rgba(198,198,198,0.43) 0%, rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%) !important;\
		background-color:#fff !important;';

	var reflectionDownCSS = '\
			background: \
		-moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.67) 33%, rgba(204,18,18,0.66) 34%, rgba(204,18,18,0.32) 68%, rgba(255,255,255,0.31) 69%, rgba(255,255,255,0) 100%); \
			background:\
		-webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(255,255,255,0.67) 33%,rgba(204,18,18,0.66) 34%,rgba(204,18,18,0.32) 68%,rgba(255,255,255,0.31) 69%,rgba(255,255,255,0) 100%);\
			background:\
 		-o-linear-gradient(top, rgba(255,255,255,.5) 0%,rgba(255,255,255,0.25) 30%,rgba(204,18,18,0.25) 30%,rgba(204,18,18,0.15) 62%,rgba(255,255,255,0.23) 62%,rgba(255,255,255,0) 100%); \
			background:\
 			linear-gradient(top, rgba(255,255,255,1) 0%,rgba(255,255,255,0.67) 33%,rgba(204,18,18,0.66) 34%,rgba(204,18,18,0.32) 68%,rgba(255,255,255,0.31) 69%,rgba(255,255,255,0) 100%); ';

	var flagCSS = '\
		content:"";\
		display:inline-block;\
		border-radius:1px;\
-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.15);\
   -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.15);\
		box-shadow:inset 0 0 0 1px rgba(0,0,0,.15);\
		'+ gradientCSS;

	var dzieShto = [
        {
            addr: "go.hrw.com",
            css: 'img[src $="flags/belarus.gif"] {'+ flagCSS +'; \
             -webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.9);\
                -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.9);\
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.9);\
                      width: 200px; height: 100px;}'
        },
        {
            addr: "internetworldstats.com",
            css: 'img[src $="images/belarusia.jpg"] {'+ flagCSS +'; \
             -webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.9);\
                -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.9);\
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.9)}'
        },
        {
            addr: "flagcounter.com",
            css: 'img[src $="flags/by.png"] {'+ flagCSS +';padding:1px 0 0; \
             -webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.4);\
                -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.4);\
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.4)}'
        },
        {
            addr: "(active.by|active.am|activecloud.az|activecloud.ge|activecloud.com|activecloud.ru|active.uz)",
            css: '.by > img, .ru-by > img, .content .selector .selBar .cont ul.flags li.by a i  {'+ flagCSS +'}'
        },
        {
            addr: "(free-torrents.org|nnm-club.ru)",
            css: 'img[src $="images/flags/belarus.gif"]{'+ flagCSS +'; width:32px; height:20px;\
             -webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.6);\
                -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.6);\
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.6)}'
        },
        {
            addr: "1c-bitrix.ru",
            css: 'img[src $="icons/Flag_Belarus.png"]{'+ flagCSS +';\
             -webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.2), 0 0 3px rgba(0,0,0,.2);\
                -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.2), 0 0 3px rgba(0,0,0,.2);\
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.2), 0 0 3px rgba(0,0,0,.2)}\
            img[src $="icons/belarus.jpg"]{'+ flagCSS +'; border:0; padding:0px; margin-left:.4em}'
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
				 {'+flagCSS+'height:12px; width:16px; position:absolute; left:0; top:0;}'
		},
		{ addr: '(my\.)?opera.com',
		  css: '[style *= "flags/BY.png"]::before, img[src $= "flags/BY.png"], .f-BY::before{ '+ flagCSS +';height:12px}\
		  [style *= "flags/BY.png"]{background-image:none !important;position:relative;}\
		  [style *= "flags/BY.png"]::before{' +
				  'width:16px;height:12px;position:absolute;top:6px;right:3px;content:"";' +
				  '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.3);' +
				  '-moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.3);' +
				  'box-shadow:inset 0 0 0 1px rgba(0,0,0,.3);}\
		  a[href="/community/members/location/Belarus"]{margin-left:.5em;}'
		},
		{ addr: 'sovrep.gov.by',
		  css: 'img[src $="top_01.jpg"]{'+flagCSS+';width:190px;height:108px;margin:0;border-left:1px solid #c24621}'
		},
		{ addr: 'wikipedia.org',
		  files: [
			{ src:'*Coat_of_arms_of_Belarus.svg(.png)?',
			  newSrc: 'http://upload.wikimedia.org/wikipedia/commons/9/9c/Coat_of_Arms_of_Belarus_(1991).svg'
			}
		  ],
		  css:'img[src $="data:image/svg+xml"].thumbborder{border:0 !important;}\
				img[src *="Flag_of_Belarus.svg"]{border:0 !important;'+ flagCSS+'}  \
				img[src *="Coat_of_Arms_of_Belarus_(1991).svg"][width ="80"]{width:70px}  \
		  '
		},
		{ addr: 'un.org',
		  css: 'img[src $="belarus.gif"]{'+ flagCSS +'width:22px;height:13px;border:0 !important;}'
		},
		{ addr: 'yandex\..*',
		  css:  '.b-country-flag_size-16_by {'+ flagCSS +'} \
				 img[src $="b-foot__lang__by.png"] {position:relative; top:1px;'+ flagCSS +' width:16px;height:12px !important; } \
				.b-keyboard__lang-by .b-keyboard__lang-ic { \
						' +gradientCSS+'\
						width:14px;border:0;position:relative;height:11px;margin-right:3px\
				}\
				.b-keyboard__lang-by .b-keyboard__lang-ic{'+ flagCSS +'width:16px;height:12px;} '
		},
		{ addr: 'godaddy.com',
		  css: 'div[style *="/country_flags_sml/by.gif"],.ffi_by{'+ flagCSS+'}\
				.ffi_by {height:13px;margin-top: 1px;}'
		},
		{ addr: 'rutracker.org',
		  css: 'img[src $="flags/17.gif"]{'+
				  flagCSS+';height:22px;width:32px;' +
				  '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
				  '-moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
				  'box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);}'
		},
		{ addr: 'kvitki.by',
		  css:'img[src $="lang_by.gif"] {'+flagCSS+';width:16px;height:12px;}'
		},
		{ addr: 'cybergames.by',
		  css:'img[src $="flags/by.gif"] {'+flagCSS+'width:18px;height:12px;}' +
				  ' img[src $="flags/by_large.png"] {'+flagCSS+'width:180px;height:90px;' +
				  '-moz-box-shadow:inset 0 0 1px 1px rgba(0,0,0,.3);-webkit-box-shadow:inset 0 0 1px 1px rgba(0,0,0,.3);box-shadow:inset 0 0 1px 1px rgba(0,0,0,.3);}'
		},
		{ addr: 'audience.by',
		  css:'img[src $="flags/by.gif"] {'+flagCSS+'width:23px;height:15px;}'
		},
		{ addr: 'paei.by',
		  css:'img[src $="by.gif"] {'+flagCSS+'width:39px;height:26px;}'
		},
		{ addr: 'advocates.by',
		  css:'img[src $="langs/by.gif"] {'+flagCSS+'width:22px;height:16px;}'
		},

		{ addr: 'barsu.by',
		  css:'img[src $="Images/by.gif"] {'+flagCSS+'width:28px;height:21px;margin-bottom:5px}'
		},
		{ addr: 'prazdnik.?by(\.ru)?',
		  files : [{
				src: 'flagblr.gif',
				newSrc : 'data:image/gif;base64,R0lGODlhFAAZAOZvAPDw8Pz8/McREdUSEuvr6/b29vLy8t8TE+rq6uHh4d3d3ezR0eDg4Ojo6PX19eAzM8ezkdgxMfj4+NYSEqCQdd/f38MREdASEsYREc4REc8REbOhguITE/T09OXl5ePj49nZ2c0REenp6eLi4tsSEt4TE9oSEskREeAYGORPT/f3993ExPXExPjf3+fn59vb28ouLubMzNEvL/////v7++fNzfTc3OTk5OMvL8ctLdMwMMktLdzCwtoxMeZLS8suLtra2uzs7NQwMNzDw+TKytfX1+7T09nBwf39/dwXF+Gzs94uLt/JyfDAwPTDw9sXF9NFRfjGxuFJSc0rK/vi4uMYGPn5+dArK84WFuYwMPv29uJKSuPNzfPb2/fe3uIvL+fi4t8uLt7e3t8YGMoVFelMTN2wsPfy8u+/v+VLS/La2s9ERP/6+jw5MVpVSv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAG8ALAAAAAAUABkAAAf/gG4GAG+Fhm8KHiJBh4VuElYAIiMvIEBiHgQADgUdh480BQANCRUMHy6aKgFIBQQ3RW42XqKkph9cNQtdATMBBggKbilpaAtEKzxDZlBCEVssVL/Bbg9jSxEyPzswU1gXA0k4ZSxGMUfVJSYDGQIYAich4CQHVTg9Ojnp6+3v8fMHOByYoMHCPnbu4MkbQE8gQYMpvjxB+I7MFWdhUDgsKMuJlGzbYKxRoquJjywoHj7SouZYsiFMwGg60yKKD3z6JIQaVepUKgCr2LQwh86Agw48TSUY4QGBg17ThLV5Q2BSJSAgDAUpgCSqm6mNwr7p4OBVLLBi0775qlYt27ZiH9/CbSR3rqG6dteizauXr6E2bSgIprCh8AYIiCGEDQQAOw=='
			},{
				src: 'flagby_off.gif',
				newSrc : 'data:image/gif;base64,R0lGODlhCwAZAPeFAOLi4vj4+PLy8vT09PHx8f39/cgREdzc3N3d3f///+vr69kPD/b29vr6+uITE9kSEswlJdQODuDj4+Ti4twODuHh4dIREefn5+2bm9wTE+bm5t0YGO7x8fvk5N4cHOXl5eLj4+rq6vCtreTk5Pf399IUFNvBmp2McmxqZPn8/N0WFv7+/vn09NwQEPX19fb6+vX09NuQkMwmJuYwMLyoiPr5+dVmZtQSEt/d3ezs7N3AwOtYWO/u7ueBgfDy8uLV1dvb28YPD9pYWOF7e8YODtIPD+3r6+IUFM0yMtWPj+Xm5uDi4uTj48gQEM40NPb5+e7v7/f4+NwREdINDf/+/t0XF88uLssoKMsQEOdiYuMZGc9hYcgSEvXe3uAsLOdxcfXa2ssREfH09OeGhvX29va6uswVFeTl5cYTE8YREezr69QREe3w8KCPdOHIyLGfgd7KyswjI+Ompt++vvv7++Lh4dFLS/75+cUODvj6+ssSEuI4ON/i4uTm5vDz89ISEuKFhdQPD9kTEzw5MVpVSv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIUALAAAAAALABkAAAjnAAkNKESwYEFCJAQYNEioRg4EBAQ0YAhGDAAgAC4EOJjFB4glSqAMSECQkIchcPhMMJJnYyFCKm4gSRJDToACDF5WicAFjZUiGKgQqEBowxoDRPRM8dLhxQhCeyIYSBPmD4UdZPoQEhGoSRAsFqRoGfODEAtAV/CYKdHCgSA7hBrw0LHFhpAMDhbIIOTCTx0cbth8OfIAAiEUCgBI+MChy4wFhgcNOHAAgJoUZR7EITSo0AoNCkJEudPDCeeCBQoRSABjzmmDdAo8YfLaYAABZ2obZIBA90LfDDsvLDho0Ik2b2iYMBgQADs='
			}],
		  css:'img[src $="/img/by.gif"] {content:"";height:50px;width:50px;display:inline-block;background:url("'+ sciahSphereSrc +'") no-repeat} '},
		{ addr:'prazdnik.by',
		  css:'.logo:after {content:"";position:absolute;z-index:10;width:43px;height:43px;left:269px;top:47px;' +
				  'background: url("data:image/png;base64,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") no-repeat}'
		},
		{ addr: 'kinopoisk.ru',
		  css:'img[src $="flags/flag-69.gif"] {'+flagCSS+'width:17px;height:11px}'
		},
		{ addr: 'greencard.by',
		  css:'img[src $="flags/by.gif"] {'+flagCSS+'width:16px;height:12px}'
		},
		{ addr: 'grodnonews.by',
		  css:'img[src $="images/by.gif"] {'+flagCSS+'width:17px;height:13px}'
		},
		{ addr: 'techlabs.by',
		  css:'img[src $="flag-by.gif"] {'+flagCSS+
				  'width:18px;height:12px;' +
				  '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
				  '-moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
				  'box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);}'
		},
		{ addr: 'parta.by',
		  css:'img[src $="icons/flag_by.gif"] {'+flagCSS+'width:18px;height:12px;' +
			'-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.4);' +
			   '-moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.4);' +
				    'box-shadow:inset 0 0 0 1px rgba(0,0,0,.4);}'
		},
		{ addr: 'fotoclub.by',
		  css:'img[src $="icons/flag-by.png"] {'+flagCSS+'width:40px;height:25px}'
		},
		{ addr: 'mypet.by',
		  css:'img[src $="16x12/by.png"] {'+flagCSS+'width:17px;height:12px;}' +
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
				[style *="flags/langs/by.gif"]::before {'+flagCSS+'width:18px;height:13px;position:absolute;left:0;top:3px;}\
				img[src $="flag/flag_by.png"] {'+flagCSS+'width:24px;height:19px}'
		},
		{ addr: 'library.gsu.by',
		  css:'img[src $="img/by.png"] {'+flagCSS+'width:24px;height:14px;margin-bottom:1px}'
		},
		{ addr: '((pl|en)\.)?brestintourist.*',
		  css: 'img[src $="lang/by.png"]{'+flagCSS+'width:25px;height:18px;margin:0 0 3px;' +
				  '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
				  '   -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
				  '        box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);}\
			.item_by a{position:relative}\
		    .item_by a:after{content:"";display:block;position:absolute;left:-34px;top:-3px;' +
				  'width:25px;height:25px;background:url("'+sciahSphereSrc+'") no-repeat}'
		},
		{ addr: 'navitel.*',
		  css:'img[src $="global/by.png"] {'+flagCSS+'width:18px;height:13px;' +
			  '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.15), 1px 1px 2px  rgba(0,0,0,.4);' +
			  '   -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.15), 1px 1px 2px  rgba(0,0,0,.4);' +
			  '        box-shadow:inset 0 0 0 1px rgba(0,0,0,.15), 1px 1px 2px  rgba(0,0,0,.4);}'
		},
		{ addr: 'world-geographics.com',
		  css:'img[src $="flags/BY.png"]{'+flagCSS+'height:18px;border-radius:1.5px;' +
		      '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.04),inset 0 -1px 0  rgba(0,0,0,.15);' +
		      '   -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.04),inset 0 -1px 0  rgba(0,0,0,.15);' +
			  '        box-shadow:inset 0 0 0 1px rgba(0,0,0,.04),inset 0 -1px 0  rgba(0,0,0,.15);}'+
		      'img[src $="flags/BY.png"]:not(".flagsmall") {width:48px;height:42px;}'
		},

		{ addr: 'sportlemon.tv',
		  css:'img[src $="flags/by.gif"]{'+flagCSS+'width:16px;height:12px;}'
		},
		{ addr: 'allsport-live.ru',
		  css: 'td[width="30"][height="20"] img[src $="flags/flag_belarus.png"] {'+flagCSS+'width:16px !important;height:12px !important;}' +
			   '#fsbody .fl_31, .fl_31 { background:none !important;}' +
			   '.fl_31:before{'+flagCSS+'width:16px;height:12px;margin:0 8px -1px -24px;}'
		},
		{ addr: 'livescore.in',
		  css: '#fsbody .fl_31, .fl_31 { background:none !important;} ' +
			   '.fl_31:before{'+flagCSS+'width:16px;height:12px;margin:0 8px -1px -24px;}'
		},
		{ addr: 'livetv.ru',
			css:'img[src $="national/by.gif"],img[src $="img/flags/24.png"]{'+flagCSS+'width:16px;height:12px;}\
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
 				img[src $="teams/18/1392.gif"]\
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
					{width:18px;height:18px;}\
 				img[width="65"]{width:65px !important;height:65px !important;}'
		},
		{ addr: 'fantasy.premierleague.com',
		  css: 'img[src $="static/img/flags/BY.gif"]{'+flagCSS+'width:64px;height32px;}'
		},
		{ addr: 'adsl.by',
		  css: 'img[src $="flags/Belarus.png"]{'+flagCSS+'width:14px;height:12px;'+
		      '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.1), 0 1px 2px  rgba(0,0,0,.1);' +
		      '   -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.1), 0 1px 2px  rgba(0,0,0,.1);' +
			  '        box-shadow:inset 0 0 0 1px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.1);}'
		},
		{ addr: 'goals.by',
		  css: 'img[src *="img/flags/by.png"]{'+flagCSS+'width:16px;height:12px}'
		},
		{ addr: 'pac.by',
		  css: '.by_l_by,.by_l {width:16px} .by_l_by img,.by_l img{display:none;}' +
			   '.by_l_by a::before, .by_l a::before{'+flagCSS+'width:16px;height:12px;display:block}' +
			   '.by_l_by a::after,.by_l a::after{width:16px;height:9px;display:block;content:"";'+ reflectionDownCSS +'}'
		},
		{ addr: 'postcrossing.com',
		  css: '.flag.flag-BY {'+ flagCSS +'width:16px;height:12px;}'
		}
	];

	var addCSS = function(CSS) {
		var styleEl = window.document.createElement('style');
		var styles  = window.document.createTextNode(CSS);
		styleEl.setAttribute('class', 'Zyvie Bielarus');
		styleEl.appendChild(styles);
		window.document.head.appendChild(styleEl);
	};

	var FixForFireFox = function(css){
		var transparentGIF = "data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==";

		return css.replace(/(\[src\s\$=\s?(["']))([^"'\]]*)(\2\])(?!\:not\(dontfixinFF\))/gi,
			function(){
				var theimages = window.document.querySelectorAll('img[src $="'+ arguments[3] +'"]');
				for(var i=0;i<theimages.length;i++){
					theimages[i].src = transparentGIF;
				}
				return arguments[1]+transparentGIF+arguments[4]
			}
		);
		// replace img.src

	};
	
	window.correctflagext = {};
	window.correctflagext.CSSAdded = false;
	window.correctflagext.dzieShto = dzieShto;
	window.correctflagext.addCSS = addCSS;
	
	if (document.head) {
		for (var i = 0, il = dzieShto.length, site; i < il, site = dzieShto[i]; i++ ) {
			if (new RegExp(site.addr + '$','i').test(document.location.host)){
				if (site.css){
					if (window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('Firefox') != -1){
						site.css = FixForFireFox(site.css)
					}
					addCSS(site.css);
					window.correctflagext.CSSAdded = true;
				}
			}
		}
	}
	
})();

window.addEventListener('DOMContentLoaded', function() {
	var dzieShto = window.correctflagext && window.correctflagext.dzieShto;
	for (var i = 0, il = dzieShto.length, site; i < il, site = dzieShto[i]; i++ ) {
		if (new RegExp(site.addr + '$','i').test(document.location.host)){
			if (site.css && !window.correctflagext.CSSAdded){
				if (window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('Firefox') != -1){
					site.css = FixForFireFox(site.css)
				}
				window.correctflagext.addCSS(site.css)
			}
			if (site.files){
				for (var k=0,newPic; k < site.files.length, newPic = site.files[k]; k++) {
					var orig = window.document.images;
					origL = orig.length;
					for (var j = 0, origPic; j<origL, origPic = orig[j]; j++){
						if (new RegExp( '\/'+newPic.src + '$').test(origPic.src)){
							origPic.src = newPic.newSrc;
							if (newPic.width)  {origPic.width = newPic.width}
							if (newPic.height) {origPic.height = newPic.height}
							if (newPic.css)    {origPic.setAttribute("style", newPic.css)}
						}
					}
				}
			}
		}
	}
	//delete window.correctflagext;
}, false);