new Skill("evil_curiosity", 10, 0, {
    "evil_curiosity1": function(element, level, ex) {
        element.textContent = (10 + level * 1.5).toFixed(1) + "%";
    },
    "evil_curiosity2": function(element, level, ex) {
        element.textContent = (0 + level * 2).toFixed(1) + "%";
    }
})

new Skill("puppeteer", 29, 0, {
    "puppeteer1": function(element, level, ex) {
        element.textContent = (0.136 * level * level + 3.2018 * level + 65.917).toFixed(0);
    }
})

new Skill("careful_repair", 29, 5, {
    "careful_repair1": function(element, level, ex, inputs) {
        element.textContent = ((169.56 + (level - 1) * 47.44 * 1.1) * (ex * 0.1 + 1)).toFixed(0) + "(" + ((169.56 + level * 47.44 * 1.1) * (ex * 0.1 + 1) * (inputs[0] / 275 + 1)).toFixed(0) + ")";
    },
    "careful_repair2": function(element, level, ex, inputs) {
        element.textContent = ((37.45 + (level - 1) * 10.55 * 1.1) * (ex * 0.1 + 1)).toFixed(0) + "(" + ((37.45 + level * 10.55 * 1.1) * (ex * 0.1 + 1) * (inputs[0] / 275 + 1)).toFixed(0) + ")";
    },
    "careful_repair3": function(element, level, ex) {
        element.textContent = "Lv" + (19 + (level - 1) * 4);
    }
})

new Skill("favor", 10, 0, {
    "favor1": function(element, level, ex, inputs) {
        element.textContent = (0.5758 * level * level + 32.861 * level + 442.8).toFixed(0) + "(" + ((0.5758 * level * level + 32.861 * level + 442.8) * (inputs[0] / 880 + 1)).toFixed(0) + ")";
    },
    "favor2": function(element, level, ex, inputs) {
        element.textContent = (0.5758 * level * level + 32.861 * level + 442.8).toFixed(0) + "(" + ((0.5758 * level * level + 32.861 * level + 442.8) * (inputs[0] / 880 + 1)).toFixed(0) + ")";
    },
    "favor3": function(element, level, ex, inputs) {
        element.textContent = (3.7728 * (level - 1) * (level - 1) + 156.7864 * (level - 1) + 3350).toFixed(0) + "(" + ((3.7728 * (level - 1) * (level - 1) + 156.7864 * (level - 1) + 3350) * (inputs[0] / 880 + 1) / 1.027).toFixed(0) + ")";
    },
    "favor4": function(element, level, ex, inputs) {
        element.textContent = (3.7728 * (level - 1) * (level - 1) + 156.7864 * (level - 1) + 3350).toFixed(0) + "(" + ((3.7728 * (level - 1) * (level - 1) + 156.7864 * (level - 1) + 3350) * (inputs[0] / 880 + 1) / 1.027).toFixed(0) + ")";
    },
    "favor5": function(element, level, ex) {
        element.textContent = (0.2122 * (level - 2) * (level - 2) + 2.2425 * (level - 2) + 88).toFixed(0);
    },
    "favor6": function(element, level, ex) {
        element.textContent = (0.2122 * (level - 2) * (level - 2) + 2.2425 * (level - 2) + 88).toFixed(0);
    },
})


new Skill("forbidden_curse", 10, 0, {
    "forbidden_curse1": function(element, level, ex) {
        if (level < 21) element.textContent = (10 + level * 3) + "%";
        if (level > 21) element.textContent = 70 + "%";
    },
    "forbidden_curse2": function(element, level, ex, inputs) {
        element.textContent = (32.6545 + level * 1.3455).toFixed(0) + "(" + ((32.6545 + level * 1.3455) * (inputs[0] / 665 + 1)).toFixed(0) + ")";
    },
    "forbidden_curse3": function(element, level, ex, inputs) {
        element.textContent = (32.6545 + level * 1.3455).toFixed(0) + "(" + ((32.6545 + level * 1.3455) * (inputs[0] / 665 + 1)).toFixed(0) + ")";
    },
    "forbidden_curse4": function(element, level, ex, inputs) {
        element.textContent = (32.6545 + level * 1.3455).toFixed(0) + "(" + ((32.6545 + level * 1.3455) * (inputs[0] / 665 + 1)).toFixed(0) + ")";
    },
    "forbidden_curse5": function(element, level, ex, inputs) {

        element.textContent = (122.1515 + level * 8.8485).toFixed(0) + "(" + ((122.1515 + level * 8.8485) * (inputs[0] / 665 + 1)).toFixed(0) + ")";
    },
    "forbidden_curse6": function(element, level, ex, inputs) {
        element.textContent = (122.1515 + level * 8.8485).toFixed(0) + "(" + ((122.1515 + level * 8.8485) * (inputs[0] / 665 + 1)).toFixed(0) + ")";
    },
    "forbidden_curse7": function(element, level, ex) {
        element.textContent = (14.53 + level * 0.87).toFixed(1) + "%";
    }
})

new Skill("love_rescue", 1, 0, {
    "love_rescue1": function(element, level, ex) {
        element.textContent = (45 + level * 5).toFixed(0) + "%";
    }
})

new Skill("burning_love", 26, 5, {
    "burning_love1": function(element, level, ex) {
        element.textContent = (13 + 0.5 * level).toFixed(1) + "%";
    },
    "burning_love2": function(element, level, ex) {
        element.textContent = (13 + 0.5 * level).toFixed(1) + "%";
    },
    "burning_love3": function(element, level, ex) {
        element.textContent = (13 + 0.5 * level).toFixed(1) + "%";
    },
    "burning_love4": function(element, level, ex, inputs) {
        element.textContent = ((7.381237525 +
            1.399201597 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})



new Skill("destiny_puppet", 21, 5, {
    "destiny_puppet1": function(element, level, ex, inputs) {
        element.textContent = ((104.9311377 +
            19.8992016 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})



new Skill("black_spine_area", 1, 0, {
    "black_spine_area1": function(element, level, ex, inputs) {
        element.textContent = ((12.03093812 +
            2.899201597 *
            level) * inputs[0]).toFixed(0);
    },
})

new Skill("mad_mad_slash", 43, 5, {
    "mad_mad_slash1": function(element, level, ex, inputs) {
        element.textContent = ((6.510978044 +
            0.739520958 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})

new Skill("mad_straight", 41, 5, {
    "mad_straight1": function(element, level, ex, inputs) {
        element.textContent = ((24.06087824 +
            2.719560878 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})

new Skill("maddy_guard", 36, 5, {
    "maddy_guard1": function(element, level, ex, inputs) {
        element.textContent = ((33.57085828 +
            3.799401198 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})

new Skill("jumping_bear_press", 33, 5, {
    "jumping_bear_press1": function(element, level, ex, inputs) {
        element.textContent = ((61.1497006 +
            6.900199601 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})

new Skill("mad_the_big", 28, 5, {
    "mad_the_big1": function(element, level, ex, inputs) {
        element.textContent = ((20.51696607 +
            2.319361277 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
    "mad_the_big2": function(element, level, ex, inputs) {
        element.textContent = ((82.11177645 +
            9.266467066 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})

new Skill("rose_vine", 46, 5, {
    "rose_vine1": function(element, level, ex, inputs) {
        element.textContent = ((4.552894212 +
            0.508982036 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
    "rose_vine2": function(element, level, ex, inputs) {
        element.textContent = ((0.671656687 +
            0.075848303 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})



new Skill("harvesting", 26, 5, {
    "harvesting1": function(element, level, ex, inputs) {
        element.textContent = ((17.56087824 +
            3.329341317 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
    "harvesting2": function(element, level, ex, inputs) {
        element.textContent = ((17.56087824 +
            3.329341317 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})

new Skill("binding_spine_area", 31, 5, {
    "binding_spine_area1": function(element, level, ex, inputs) {
        element.textContent = ((6.058882236 +
            0.680638723 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
    "binding_spine_area2": function(element, level, ex, inputs) {
        element.textContent = ((45.4500998 +
            5.129740519 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
    "binding_spine_area3": function(element, level, ex, inputs) {
        element.textContent = ((0.877245509 +
            0.108782435 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})

new Skill("little_demon", 18, 0, {
    "little_demon1": function(element, level, ex, inputs) {
        element.textContent = (3.78 + 0.42 * level).toFixed(1);
    },
    "little_demon2": function(element, level, ex, inputs) {
        element.textContent = (3.78 + 0.42 * level).toFixed(1);
    },
    "little_demon3": function(element, level, ex, inputs) {
        element.textContent = (-8.53 + 22.53 * level).toFixed(0);
    },
    "little_demon4": function(element, level, ex, inputs) {
        element.textContent = (3.71 + 8.29 * level).toFixed(0);
    },
})

new Skill("marionette", 11, 0, {
    "marionette1": function(element, level, ex, inputs) {
        element.textContent = ((0.7056 * level * level) + (12.7614 * level) + 29.128).toFixed(0) + "(" + (((0.7056 * level * level) + (12.7614 * level) + 29.128).toFixed(0) * (inputs[0] / 750 + 1)).toFixed(0) + ")";
    },
    "marionette2": function(element, level, ex, inputs) {
        element.textContent = ((0.7056 * level * level) + (12.7614 * level) + 29.128).toFixed(0) + "(" + (((0.7056 * level * level) + (12.7614 * level) + 29.128).toFixed(0) * (inputs[0] / 750 + 1)).toFixed(0) + ")";
    },
    "marionette3": function(element, level, ex) {
        element.textContent = (5 + 1.32 * (level - 1)).toFixed(1) + "%";
    },
    "marionette4": function(element, level, ex) {
        element.textContent = (5 + 1.32 * (level - 1)).toFixed(1) + "%";
    },
    "marionette5": function(element, level, ex, inputs) {
        element.textContent = (10.35 * level * level + 168.85 * level + 669.21).toFixed(0) + "(" + ((10.35 * level * level + 168.85 * level + 669.21) * (inputs[0] / 750 + 1)).toFixed(0) + ")";
    },
    "marionette6": function(element, level, ex, inputs) {
        element.textContent = (10.35 * level * level + 168.85 * level + 669.21).toFixed(0) + "(" + ((10.35 * level * level + 168.85 * level + 669.21) * (inputs[0] / 750 + 1)).toFixed(0) + ")";
    },
    "marionette7": function(element, level, ex, inputs) {
        element.textContent = ((398.53 + 120.2944112 *
            level) * inputs[1]).toFixed(0);
    },
})

new Skill("thaumcraft", 21, 5, {
    "thaumcraft1": function(element, level, ex, inputs) {
        element.textContent = ((11.15369261 +
            1.256487026 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
    "thaumcraft2": function(element, level, ex, inputs) {
        element.textContent = ((44.5998004 +
            5.03992016 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})

new Skill("eternity_possession", 1, 0, {
    "eternity_possession1": function(element, level, ex) {
        element.textContent = (15 + 5 * level).toFixed(0) + "%";
    }
})

new Skill("terrible_roar", 16, 5, {
    "terrible_roar1": function(element, level, ex, inputs) {
        element.textContent = ((24.65768463 +
            2.785429142 *
            level) * (1 + (0.1 * ex)) * inputs[0]).toFixed(0);
    },
})

new Skill("rose_bloom_in_dark", 9, 0, {
    "rose_bloom_in_dark1": function(element, level, ex, inputs) {
        element.textContent = (22 + 2 * level).toFixed(0) + "%";
    },
    "rose_bloom_in_dark2": function(element, level, ex, inputs) {
        element.textContent = (140 + 10 * level).toFixed(0);
    },
})

new Skill("pain_garden", 13, 0, {
    "pain_garden1": function(element, level, ex, inputs) {
        element.textContent = ((21.95808383 +
            2.482035928 *
            level) * inputs[0]).toFixed(0);
    },
    "pain_garden2": function(element, level, ex, inputs) {
        element.textContent = ((197.6906188 +
            22.32734531 *
            level) * inputs[0]).toFixed(0);
    },
    "pain_garden3": function(element, level, ex, inputs) {
        element.textContent = ((4.877245509 +
            0.552894212 *
            level) * inputs[0]).toFixed(0);
    },
})

new Skill("curse_of_terror_bear", 11, 0, {
    "curse_of_terror_bear1": function(element, level, ex, inputs) {
        element.textContent = ((20.39820359 +
            2.29740519 *
            level) * inputs[0]).toFixed(0);
    },
})

new Skill("doll_forest", 5, 0, {
    "doll_forest1": function(element, level, ex, inputs) {
        element.textContent = ((51.16866267 +
            15.44411178 *
            level) * inputs[0]).toFixed(0);
    },
    "doll_forest2": function(element, level, ex, inputs) {
        element.textContent = ((179.1027944 +
            54.06187625 *
            level) * inputs[0]).toFixed(0);
    },
    "doll_forest3": function(element, level, ex, inputs) {
        element.textContent = ((477.5918164 +
            144.1816367 *
            level) * inputs[0]).toFixed(0);
    },
})


/* 
<table id="ghost_chain_slash" frame="box" width="750px">
<tr>
<td align="center" style="background-color:#F5F8FA" colspan="8">技能数据一览</td>
</tr>
        <tr>
            <td align="center" style="background-color:#F5F8FA">角色智力值</td>
            <td align="center" colspan="7"><input type="text" id="burning_love_input1" value="5000" oninput="value=value.replace(/[^\d]/g,'')"></td>
        </tr>
        <tr>
            <td align="center" style="background-color:#F5F8FA">角色独立攻击力</td>
            <td align="center" colspan="7"><input type="text" id="burning_love_input2" value="2500" oninput="value=value.replace(/[^\d]/g,'')"></td>
        </tr>
<tr>
<td align="center" style="background-color:#F5F8FA">技能等级</td>
<td align="center" id="ghost_chain_slash_lv"></td>
<td align="center"><input type="button" value="+" id="ghost_chain_slash_lv+"></td>
<td align="center"><input type="button" value="-" id="ghost_chain_slash_lv-"></td>
<td align="center" style="background-color:#F5F8FA">EX等级</td>
<td align="center" id="ghost_chain_slash_ex"></td>
<td align="center"><input type="button" value="+" id="ghost_chain_slash_ex+"></td>
<td align="center"><input type="button" value="-" id="ghost_chain_slash_ex-"></td>
</tr>
<tr>
<td align="center" style="background-color:#F5F8FA">第一斩攻击力</td>
<td align="center" colspan="7" id="ghost_chain_slash1"></td>
</tr>
<tr>
<td align="center" style="background-color:#F5F8FA">第二斩攻击力</td>
<td align="center" colspan="7" id="ghost_chain_slash2"></td>
</tr>
<tr>
<td align="center" style="background-color:#F5F8FA">第三斩攻击力</td>
<td align="center" colspan="7" id="ghost_chain_slash3"></td>
</tr>
</table>   


    <table id="sword_ghost_blade_mastery" frame="box" width="750px">
        <tr>
            <td align="center" style="background-color:#F5F8FA" colspan="4">技能数据一览</td>

        </tr>
        <tr>
            <td align="center" style="background-color:#F5F8FA">角色智力值</td>
            <td align="center" colspan="7"><input type="text" id="burning_love_input1" value="5000" oninput="value=value.replace(/[^\d]/g,'')"></td>
        </tr>
        <tr>
            <td align="center" style="background-color:#F5F8FA">角色独立攻击力</td>
            <td align="center" colspan="7"><input type="text" id="burning_love_input2" value="2500" oninput="value=value.replace(/[^\d]/g,'')"></td>
        </tr>

        <tr>
            <td align="center" style="background-color:#F5F8FA">技能等级</td>
            <td align="center" id="sword_ghost_blade_mastery_lv"></td>
            <td align="center"><input type="button" value="+" id="sword_ghost_blade_mastery_lv+"></td>
            <td align="center"><input type="button" value="-" id="sword_ghost_blade_mastery_lv-"></td>
        </tr>
        <tr>
            <td align="center" style="background-color:#F5F8FA">第一斩攻击力</td>
            <td align="center" colspan="3" id="sword_ghost_blade_mastery1"></td>
        </tr>
        <tr>
            <td align="center" style="background-color:#F5F8FA">第二斩攻击力</td>
            <td align="center" colspan="3" id="sword_ghost_blade_mastery2"></td>
        </tr>
    </table>

 <a href="https://seicing.com/res/dnfclass/skillgif/女巫/偏爱.gif" onmouseout="hiddenPic();" onmousemove="showPic(event,'https://seicing.com/res/dnfclass/skillgif/女巫/偏爱.gif');">这里输入文字</a>

                <img src="http://47.236.171.173/seicingdepot/icon/skill/魔法攻击.png" title="魔法攻击"><img src="http://47.236.171.173/seicingdepot/icon/skill/攻击.png" title="攻击"><img src="http://47.236.171.173/seicingdepot/icon/skill/抓取.png" title="抓取"><img src="http://47.236.171.173/seicingdepot/icon/skill/固定伤害.png" title="固定伤害"><img src="http://47.236.171.173/seicingdepot/icon/skill/BUFF.png" title="BUFF">
  <img src="http://47.236.171.173/seicingdepot/icon/skill/魔法攻击.png" title="魔法攻击"><img src="http://47.236.171.173/seicingdepot/icon/skill/攻击.png" title="攻击"><img src="http://47.236.171.173/seicingdepot/icon/skill/固定伤害.png" title="固定伤害"><img src="http://47.236.171.173/seicingdepot/icon/skill/BUFF.png" title="BUFF"><img src="http://47.236.171.173/seicingdepot/icon/skill/无色技能.png" title="无色技能">
  <img src="http://47.236.171.173/seicingdepot/icon/skill/魔法攻击.png" title="魔法攻击"><img src="http://47.236.171.173/seicingdepot/icon/skill/攻击.png" title="攻击"><img src="http://47.236.171.173/seicingdepot/icon/skill/固定伤害.png" title="固定伤害"><img src="http://47.236.171.173/seicingdepot/icon/skill/无色技能.png" title="无色技能">

*/