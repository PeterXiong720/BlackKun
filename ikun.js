// ==UserScript==
// @name         小黑子
// @namespace    https://github.com/PeterXiong720/BlackKun/
// @require      https://unpkg.com/cnchar/cnchar.min.js
// @version      114.514.1
// @license      MIT
// @description  小黑子，露出鸡脚了吧！
// @author       PeterXiong720
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

// 是否开启调试模式
const Debug = false;

// 调试输出函数
function debug(...args)
{
    if (!Debug)
    {
        return;
    }

    for (let str of args)
    {
        try
        {
            console.log((str));
        }
        catch (e)
        {
            console.log(JSON.stringify(str));
        }
    }
}

// 是否开启无差别模式
const enablePlusMode = false;
// 警告：开启后会替换所有读音为“ji”的汉字，可能会严重影响阅读，请谨慎开启！！！

let body = document.getElementsByTagName('body')[0];

// iKun语录词典
const dic = {
    '鸡': '只因',
    '机': '只因',
    '基': '只因',

    '是不是想吃牢饭': '食不食香翅捞饭',
    '想吃牢饭是不是': '香翅捞饭食不食',

    '是不是有病': '食不食油饼',
    '有病是不是': '油饼食不食',

    '是不是想踩缝纫机': '食不食香菜凤仁鸡',
    '想踩缝纫机是不是': '香菜凤仁鸡食不食',

    '想吃牢饭': '香翅捞饭',
    '想进监狱': '香精煎鱼',
    '想踩缝纫机': '香菜凤仁鸡',
    '真没有素质': '蒸梅油酥汁',
    '没有素质': '梅油酥汁',
    '素质真高': '树枝蒸糕',
    '露出鸡脚': '卤出鸡脚',
    '无语真下头': '乌鱼蒸虾头',

    '速删': '苏珊',
    '有病': '油饼',
    '缝纫机': '凤仁鸡',
    '监狱': '煎鱼',
    '牢饭': '捞饭',
    '素质': '树枝',
    '理智': '荔枝',
    '普信男': '蒲杏楠',
    '真下头': '蒸虾头',
    '下头': '虾头'
};

function checkWord(str)
{
    debug(dic);
    for (let word of Object.keys(dic))
    {
        debug(word);
        if (str.indexOf(word) != -1)
        {
            debug('已发现可替换词汇');
            return true;
        }
    }

    return false;
}

function changeWord(str)
{
    let retStr = str;
    for (let key in dic)
    {
        debug(key);
        debug(dic[key]);
        retStr = retStr.replaceAll(key, dic[key]);
    }

    return retStr;
}

function getChinese(strValue)
{
    if (strValue !== null && strValue !== '')
    {
        const reg = /[\u4e00-\u9fa5]/g;
        return strValue.match(reg).join('');
    }
    return '';
}

function chicken()
{
    if (checkWord(body.innerHTML))
    {
        body.innerHTML = changeWord(body.innerHTML);

        console.log('小黑子，露出鸡脚了吧！');
    }

    setTimeout(chicken, 10000);
}

function chickenPlus()
{
    let chi = getChinese(body.innerHTML);
    debug(chi);

    for (let char of chi)
    {
        debug(char);
        let pingyin = cnchar.spell(char, 'tone', 'low');
        if (pingyin == 'jī')
        {
            body.innerHTML = body.innerHTML.replaceAll(char, '只因');
        }
    }

    setTimeout(chickenPlus, 12000);
}

setTimeout(chicken, 100);

if (enablePlusMode)
{
    setTimeout(chickenPlus, 100);
}
