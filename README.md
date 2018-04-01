= Браўзернае пашырэнне, якое замяняе на сайтах бералускія сцягі на бел-чырвлна-белыя

= Як замяняць сцягі
Можна дадаць свой CSS aбо падмяніць кантэнт карцінак па імені файла

== Структура дадзеных
На кожны сайт у sciah-data.json дадаецца запіс фармату
```
{
    "addr": regex,
    "images": [<image>],
    "css": <string> | [<strings>],
    "cssReplace": [<replacementPattern>]
}
```

== Замена CSS
Для замен ў CSS ёсць дапаможныя функцыі Sciah.cssHelpers:
```
    res: res,
    pahoniaURL: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Coat_of_arms_of_Belarus_%281918%2C_1991-1995%29.svg',
    flagCSS: flagBGI() + '\nbackground-position: 0 0 !important; \nbackground-size: cover;',
    flagBGI: flagBGI,
    flagURL: flagURL
```

У CSS можна выкарыстоўваць затычкі, якія заменяцца на код карцінкі.
Ёсць перадвызначаныя затычкі, гэта %pahoniaURL% і %flagCSS%

== Замена кантэнта карцінкі па імені файла