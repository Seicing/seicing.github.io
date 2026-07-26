// 定义 ID 前缀列表 (对应你 HTML 中的 a, b, c ... u)
// 这样你就不用写两个长长的数组了
var listPrefix = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u'];

function tipsg(targetTextId, targetButtonId, suffix) {
    // 1. 重置：隐藏所有内容，变灰所有按钮
    for (var i = 0; i < listPrefix.length; i++) {
        var prefix = listPrefix[i];
        // 拼接ID，例如 'atext' + '0' -> 'atext0'
        var tempTextId = prefix + 'text' + suffix;
        var tempBtnId = prefix + 'button' + suffix;

        var elText = document.getElementById(tempTextId);
        var elBtn = document.getElementById(tempBtnId);

        if (elText) elText.style.display = "none";
        if (elBtn) elBtn.classList.add("special-text-link"); // 去掉 class
        if (elBtn) elBtn.classList.remove("special-link"); // 去掉 class
    }

    // 2. 激活：显示当前点击的内容
    var currentText = document.getElementById(targetTextId);
    var currentBtn = document.getElementById(targetButtonId);

    if (currentText) currentText.style.display = "block";
    if (currentBtn) currentBtn.classList.add("special-link");
    if (currentBtn) currentBtn.classList.remove("special-text-link");

    // 3. 加载图片：只处理当前显示区域内的图片
    // 这里的选择器只找当前 div 下的 img
    document
        .querySelectorAll("#" + targetTextId + " img")
        .forEach(function (img) {
            var realSrc = img.getAttribute("data-mysrc");
            if (realSrc && img.getAttribute("src") !== realSrc) {
                img.setAttribute("src", realSrc);
                img.removeAttribute("data-mysrc");
            }
        });
}

// ===== 自动头像页面生成系统 =====
// 由原 index-avatar.html 数据结构自动生成
const avatarData = [
    {
        "id": "a",
        "year": "2008年",
        "sets": [
            {
                "title": "国庆绝版套装",
                "path": "sunseeker"
            }
        ]
    },
    {
        "id": "b",
        "year": "2009年",
        "sets": [
            {
                "title": "导师",
                "path": "09spring"
            },
            {
                "title": "草原之幻想",
                "path": "wildpower"
            },
            {
                "title": "海之勇者",
                "path": "seawarrior"
            },
            {
                "title": "国庆狂欢",
                "path": "cos1"
            }
        ]
    },
    {
        "id": "c",
        "year": "2010年",
        "sets": [
            {
                "title": "庚寅年新春",
                "path": "10spring"
            },
            {
                "title": "童话",
                "path": "fairytales"
            },
            {
                "title": "暑期",
                "path": "seabody"
            },
            {
                "title": "国庆盛典",
                "path": "10101"
            }
        ]
    },
    {
        "id": "d",
        "year": "2011年",
        "sets": [
            {
                "title": "金兔赐福",
                "path": "npccos"
            },
            {
                "title": "勇士功勋",
                "path": "empire"
            },
            {
                "title": "沙漠风情",
                "path": "arabia"
            },
            {
                "title": "国庆祥云",
                "path": "boss"
            }
        ]
    },
    {
        "id": "e",
        "year": "2012年",
        "sets": [
            {
                "title": "龙腾新春",
                "path": "2012spring"
            },
            {
                "title": "梦幻童话",
                "path": "alice"
            },
            {
                "title": "激情酷夏",
                "path": "sea3"
            },
            {
                "title": "皇室",
                "path": "imperial"
            }
        ]
    },
    {
        "id": "f",
        "year": "2013年",
        "sets": [
            {
                "title": "宫廷遗风",
                "path": "tenkai"
            },
            {
                "title": "天使与恶魔",
                "path": "angeldemon"
            },
            {
                "title": "Fate/Zero",
                "path": "fatezero"
            },
            {
                "title": "内衣",
                "path": "buttom"
            },
            {
                "title": "龙族",
                "path": "dragonian"
            }
        ]
    },
    {
        "id": "g",
        "year": "2014年",
        "sets": [
            {
                "title": "策马来袭",
                "path": "2014spring"
            },
            {
                "title": "蒸汽朋克",
                "path": "steampunk"
            },
            {
                "title": "梦幻骑士",
                "path": "dreamknight"
            },
            {
                "title": "海之勇者",
                "path": "seayongsa"
            },
            {
                "title": "魔笛",
                "path": "magi"
            },
            {
                "title": "梦幻来袭",
                "path": "phantom"
            },
            {
                "title": "SAO",
                "path": "sao"
            },
            {
                "title": "ALO",
                "path": "alo"
            },
            {
                "title": "圣诞节",
                "path": "xmas2014"
            }
        ]
    },
    {
        "id": "h",
        "year": "2015年",
        "sets": [
            {
                "title": "生肖之灵",
                "path": "2015spring"
            },
            {
                "title": "哥特萝莉派对",
                "path": "gothloli"
            },
            {
                "title": "萌萌动物园",
                "path": "zoo"
            },
            {
                "title": "夏日海岸",
                "path": "beach"
            },
            {
                "title": "百鬼夜行",
                "path": "ghost"
            },
            {
                "title": "云端众神",
                "path": "olympic"
            },
            {
                "title": "奇妙之旅",
                "path": "yuuhei"
            },
            {
                "title": "雪人",
                "path": "fatsnowman"
            }
        ]
    },
    {
        "id": "i",
        "year": "2016年",
        "sets": [
            {
                "title": "问鼎天下",
                "path": "3kingdom"
            },
            {
                "title": "梦幻贵族",
                "path": "noble"
            },
            {
                "title": "夏日泳装",
                "path": "summercoast"
            },
            {
                "title": "热辣桑巴",
                "path": "samba"
            },
            {
                "title": "骑士归来",
                "path": "artu"
            },
            {
                "title": "极速暴风",
                "path": "senfuu"
            }
        ]
    },
    {
        "id": "j",
        "year": "2017年",
        "sets": [
            {
                "title": "猎龙者",
                "path": "dragonslayer"
            },
            {
                "title": "阿尔比恩悬案",
                "path": "albion"
            },
            {
                "title": "海上夏日",
                "path": "onsea"
            },
            {
                "title": "海军提督",
                "path": "captain"
            }
        ]
    },
    {
        "id": "k",
        "year": "2018年",
        "sets": [
            {
                "title": "兽人族英雄",
                "path": "wereman"
            },
            {
                "title": "荒野在召唤",
                "path": "west"
            },
            {
                "title": "绮幻坐骑多彩童梦",
                "path": "rideon"
            },
            {
                "title": "热舞一夏",
                "path": "gaimou"
            },
            {
                "title": "深渊征服者",
                "path": "hell"
            },
            {
                "title": "漫沙神祇物语",
                "path": "agpt"
            },
            {
                "title": "圣诞欢歌",
                "path": "satan"
            }
        ]
    },
    {
        "id": "l",
        "year": "2019年",
        "sets": [
            {
                "title": "遗忘英雄传说",
                "path": "2019spring"
            },
            {
                "title": "初音未来",
                "path": "hatsune"
            },
            {
                "title": "狂撩之夜",
                "path": "sexy"
            },
            {
                "title": "Re:zero从零开始的异世界生活",
                "path": "re0"
            },
            {
                "title": "东之国度幻游纪(游牧之国)",
                "path": "asian1"
            },
            {
                "title": "东之国度幻游纪(绯樱之舞)",
                "path": "asian2"
            },
            {
                "title": "东之国度幻游纪(腾龙之颂)",
                "path": "asian3"
            },
            {
                "title": "东之国度幻游纪(槿花物语)",
                "path": "asian4"
            },
            {
                "title": "夏日阿拉德化装舞会",
                "path": "cosmass"
            },
            {
                "title": "空域之怒海霸主",
                "path": "pirate"
            },
            {
                "title": "阿拉德小当家",
                "path": "restaurant"
            },
            {
                "title": "白色兽语",
                "path": "whitebeast"
            },
            {
                "title": "未来时空",
                "path": "suit"
            }
        ]
    },
    {
        "id": "m",
        "year": "2020年",
        "sets": [
            {
                "title": "使徒降临",
                "path": "sado2"
            },
            {
                "title": "阿拉德雾隐",
                "path": "ninja"
            },
            {
                "title": "瓦尔哈拉",
                "path": "val"
            },
            {
                "title": "欢乐阿拉德动物园",
                "path": "safiri2"
            },
            {
                "title": "那些年陪伴我的npc",
                "path": "cosplayer"
            },
            {
                "title": "阿拉德冲浪",
                "path": "2019summer"
            },
            {
                "title": "阿拉德高校",
                "path": "wangli"
            },
            {
                "title": "眷属的恩赐",
                "path": "2020monster"
            }
        ]
    },
    {
        "id": "n",
        "year": "国服未发售",
        "sets": [
            {
                "title": "アラドの勇者",
                "path": "aradyuusha"
            },
            {
                "title": "浴衣",
                "path": "kimono"
            },
            {
                "title": "드림 파이터",
                "path": "lunaby"
            },
            {
                "title": "新撰組",
                "path": "sinsengumi"
            },
            {
                "title": "고스트 헌터",
                "path": "dmc"
            },
            {
                "title": "아라드의 유생",
                "path": "yusoeng"
            },
            {
                "title": "퀴즈탐험 던파의 세계",
                "path": "kimyo"
            },
            {
                "title": "鋼の錬金術師",
                "path": "ganglian"
            },
            {
                "title": "사도의 후예 패키지",
                "path": "sado"
            },
            {
                "title": "애프터 크리스마스",
                "path": "rabbit"
            },
            {
                "title": "디멘션 아라드",
                "path": "dimension"
            },
            {
                "title": "초원의 영혼",
                "path": "indian"
            },
            {
                "title": "프로스트 킹덤",
                "path": "frostkingdom"
            },
            {
                "title": "공모전",
                "path": "gongmu"
            }
        ]
    },
    {
        "id": "o",
        "year": "特殊",
        "sets": [
            {
                "title": "대박기원 아라드협객단",
                "path": "xia"
            },
            {
                "title": "5월의 신부",
                "path": "bride"
            },
            {
                "title": "파워 아라드 레인저",
                "path": "ranja"
            },
            {
                "title": "쇼콜라",
                "path": "chocolate"
            },
            {
                "title": "크리스마스의 동물 패키지",
                "path": "animals"
            }
        ]
    },
    {
        "id": "p",
        "year": "2021年",
        "sets": [
            {
                "title": "永恒的探索",
                "path": "21spring"
            },
            {
                "title": "九霄骑士",
                "path": "heavenknight"
            },
            {
                "title": "浪漫阿拉德",
                "path": "romantic"
            },
            {
                "title": "仲夏晴天派对",
                "path": "2021summer"
            },
            {
                "title": "永恒的辉煌圣启1",
                "path": "2021saint"
            },
            {
                "title": "永恒的辉煌圣启2",
                "path": "2021saint"
            },
            {
                "title": "哈林之影",
                "path": "harlem"
            }
        ]
    },
    {
        "id": "q",
        "year": "2022年",
        "sets": [
            {
                "title": "永恒的浩瀚之时空",
                "path": "22spring"
            },
            {
                "title": "精灵咏叹调",
                "path": "elven"
            },
            {
                "title": "胖萌熊猫",
                "path": "fatpanda"
            },
            {
                "title": "幻梦蝶舞",
                "path": "nabi"
            }
        ]
    },
    {
        "id": "r",
        "year": "2023年",
        "sets": [
            {
                "title": "名门猫咪",
                "path": "furry"
            },
            {
                "title": "缘定永恒",
                "path": "wed2"
            },
            {
                "title": "阳光岛屿假期",
                "path": "2023summer"
            },
            {
                "title": "次元星梦",
                "path": "2023seongye"
            },
            {
                "title": "奥特曼联动",
                "path": "ultraman1"
            },
            {
                "title": "奥特曼联动",
                "path": "ultraman2"
            }
        ]
    },
    {
        "id": "s",
        "year": "2024年",
        "sets": [
            {
                "title": "晴空之岚",
                "path": "2024spring"
            },
            {
                "title": "snk联动",
                "path": "kof2024"
            },
            {
                "title": "阿拉德治安官",
                "path": "police"
            },
            {
                "title": "夏日瑰幻深海",
                "path": "hayat"
            },
            {
                "title": "不良人",
                "path": "furyoujin"
            }
        ]
    },
    {
        "id": "t",
        "year": "2025年",
        "sets": [
            {
                "title": "墨染丹青",
                "path": "2025spring"
            },
            {
                "title": "兔女郎",
                "path": "bunnygirl"
            },
            {
                "title": "犬夜叉",
                "path": "inuyasha"
            },
            {
                "title": "海上救援队",
                "path": "2025summer"
            },
            {
                "title": "虚幻之城",
                "path": "phantomcity"
            }
        ]
    },
    {
        "id": "u",
        "year": "2026年",
        "sets": [
            {
                "title": "命运序列",
                "path": "2026spring"
            },
            {
                "title": "银河系漫游",
                "path": "2026labor"
            },
            {
                "title": "NBA",
                "path": "nba"
            },
            {
                "title": "果味一整夏",
                "path": "2026summer"
            }
        ]
    }
];

(function () {
    const menu = document.getElementById('avatar-year-menu');
    const content = document.getElementById('avatar-content');
    if (!menu || !content) return;

    const rows = [['sm', 'ft', 'gn', 'mg', 'pr'], ['sg', 'mf', 'gg', 'mm', 'pg'], ['th', 'kn', 'dl', 'gb', 'ar']];
    const names = [['鬼剑士男', '格斗家女', '神枪手男', '魔法师女', '圣职者男'], ['鬼剑士女', '格斗家男', '神枪手女', '魔法师男', '圣职者女'], ['暗夜使者', '守护者', '魔枪士', '枪剑士', '弓箭手']];

    function makeRows(path) {
        let h = '';
        rows.forEach((r, i) => {
            h += '<tr>';
            r.forEach(x => h += `<td><div class="textce"><img data-mysrc="https://data.seicing.com/seicingdepot/3fatcatpool/avatar/${path}/${x}.gif"></div></td>`);
            h += '</tr><tr class="avatbg">';
            names[i].forEach(x => h += `<td><div class="textce"><span class="avat"><b>${x}</b></span></div></td>`);
            h += '</tr>';
        });
        return h;
    }

    avatarData.forEach((y, i) => {
        let a = document.createElement('a');
        a.id = y.id + 'button0';
        a.href = 'javascript:void(0);';
        a.className = i === 0 ? 'special-link' : 'special-text-link';
        a.innerHTML = y.year;
        a.onclick = () => tipsg(y.id + 'text0', y.id + 'button0', '0');
        menu.appendChild(a);
        menu.append(' ');

        let div = document.createElement('div');
        div.id = y.id + 'text0';
        div.style = 'display:' + (i === 0 ? 'block' : 'none') + ';text-align:center';
        y.sets.forEach(s => {
            div.innerHTML += `<table id="customers" width="100%"><tr class="avatbg"><td colspan="5"><span style="font-size:18px"><span class="avat"><b>${s.title}</b></span></span></td></tr>${makeRows(s.path)}</table><br><br>`;
        });
        content.appendChild(div);
    });
})();
