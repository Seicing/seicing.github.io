new Skill("lightsword_deal", 10, 0, {
    "lightsword_deal1": function(element, level, ex) {
        element.textContent = (0 + level * 1).toFixed(0) + "%";
    },
    "lightsword_deal2": function(element, level, ex) {
        element.textContent = (0 + level * 1.5).toFixed(1) + "%";
    }
})

new Skill("lightsword_mastery", 29, 0, {
    "lightsword_mastery1": function(element, level, ex) {
        element.textContent = (10.386 + level * 1.414).toFixed(1) + "%";
    },
    "lightsword_mastery2": function(element, level, ex) {
        element.textContent = (1.24 + level * 1.26).toFixed(1) + "%";
    },
    "lightsword_mastery3": function(element, level, ex) {
        element.textContent = (0.3 + level * 0.3).toFixed(1) + "%";
    }
})

new Skill("auto_guard", 10, 0, {
    "auto_guard1": function(element, level, ex) {
        element.textContent = (0 + level * 5).toFixed(0) + "%";
    }
})

new Skill("overdrive", 10, 0, {
    "overdrive1": function(element, level, ex) {
        element.textContent = (6 + level * 2).toFixed(1) + "%";
    },
    "overdrive2": function(element, level, ex) {
        element.textContent = (5 + level * 1).toFixed(1) + "%";
    }
})

new Skill("counter_attack", 20, 5, {
    "counter_attack1": function(element, level, ex) {
        element.textContent = ((946 + level * 62) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("secret_ghost_swordart", 6, 0, {
    "secret_ghost_swordart1": function(element, level, ex) {
        element.textContent = (-10 + level * 10).toFixed(1) + "%";
    }
})

new Skill("flow_mind_charge", 41, 5, {
    "flow_mind_charge1": function(element, level, ex) {
        element.textContent = ((673 + level * 76) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("flow_mind_fast", 38, 5, {
    "flow_mind_fast1": function(element, level, ex) {
        element.textContent = ((2230 + level * 252) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "flow_mind_fast2": function(element, level, ex) {
        element.textContent = ((997 + level * 112) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("flow_mind_raise", 36, 5, {
    "flow_mind_raise1": function(element, level, ex) {
        element.textContent = ((1546 + level * 174) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("flow_mind_strength", 10, 0, {
    "flow_mind_strength1": function(element, level, ex) {
        element.textContent = ((20 + level * 2)).toFixed(0) + "%";
    },
    "flow_mind_strength2": function(element, level, ex) {
        element.textContent = ((4 + level * 1)).toFixed(0) + "%";
    }
})

new Skill("charge_crash", 36, 5, {
    "charge_crash1": function(element, level, ex) {
        element.textContent = ((706 + level * 80) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "charge_crash2": function(element, level, ex) {
        element.textContent = ((1092 + level * 122) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("drawsword", 33, 5, {
    "drawsword1": function(element, level, ex) {
        element.textContent = ((3862 + level * 437) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("dragon_charge", 31, 5, {
    "dragon_charge1": function(element, level, ex) {
        element.textContent = ((1293 + level * 147) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "dragon_charge2": function(element, level, ex) {
        element.textContent = ((1900 + level * 216) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("charge_burst", 31, 5, {
    "charge_burst1": function(element, level, ex) {
        element.textContent = ((1689 + level * 191) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "charge_burst2": function(element, level, ex) {
        element.textContent = ((2028 + level * 229) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "charge_burst3": function(element, level, ex) {
        element.textContent = ((3043 + level * 343) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "charge_burst4": function(element, level, ex) {
        element.textContent = ((45 + level * 5)).toFixed(1) + "%";
    },
    "charge_burst5": function(element, level, ex) {
        element.textContent = ((38 + level * 2)).toFixed(1) + "%";
    }
})

new Skill("illusion_slash", 28, 5, {
    "illusion_slash1": function(element, level, ex) {
        element.textContent = ((417 + level * 47) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "illusion_slash2": function(element, level, ex) {
        element.textContent = ((1701.6 + level * 151.2) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "illusion_slash3": function(element, level, ex) {

        element.textContent = ((2005 + level * 225) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "illusion_slash4": function(element, level, ex) {
        element.textContent = ((7011 + level * 792) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "illusion_slash5": function(element, level, ex) {
        element.textContent = ((1670 + level * 188) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})


new Skill("ironslasher", 18, 0, {
    "ironslasher1": function(element, level, ex) {
        element.textContent = ((7.5 + level * 1.5)).toFixed(0) + "%";
    }
})

new Skill("stormstyle", 11, 0, {
    "stormstyle1": function(element, level, ex) {
        element.textContent = ((2016 + level * 608)).toFixed(0) + "%";
    },
    "stormstyle2": function(element, level, ex) {
        element.textContent = ((947 + level * 291)).toFixed(0) + "%";
    },
    "stormstyle3": function(element, level, ex) {
        element.textContent = ((3754 + level * 1128)).toFixed(0) + "%";
    }
})


new Skill("meteor_sword", 21, 5, {
    "meteor_sword1": function(element, level, ex) {
        element.textContent = ((1481 + level * 168) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "meteor_sword2": function(element, level, ex) {
        element.textContent = ((272 + level * 31) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "meteor_sword3": function(element, level, ex) {
        element.textContent = ((2962 + level * 336) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("gyeochuubaldo", 16, 5, {
    "gyeochuubaldo1": function(element, level, ex) {
        element.textContent = ((13001 + level * 1467) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "gyeochuubaldo2": function(element, level, ex) {
        element.textContent = ((16251 + level * 1834) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("hypervigilance", 9, 0, {
    "hypervigilance1": function(element, level, ex) {
        element.textContent = ((674.4 + level * 69.6)).toFixed(0) + "%";
    },
    "hypervigilance2": function(element, level, ex) {
        element.textContent = "破军升龙击上挑攻击力的40%+" + ((-4 + level * 4)).toFixed(0) + "%";
    },
    "hypervigilance3": function(element, level, ex) {
        element.textContent = "猛龙断空斩突进斩击攻击力的21%+" + ((-2 + level * 2)).toFixed(0) + "%";
    },
    "hypervigilance4": function(element, level, ex) {
        element.textContent = "幻影剑舞的斩击和剑气攻击力的55%+" + ((-5 + level * 5)).toFixed(0) + "%";
    },
    "hypervigilance5": function(element, level, ex) {
        element.textContent = "幻影剑舞钝器最后一击攻击力的41%+" + ((-5 + level * 5)).toFixed(0) + "%";
    },
    "hypervigilance6": function(element, level, ex) {
        element.textContent = "破空斩最后爆炸攻击力的60%+" + ((-6 + level * 6)).toFixed(0) + "%";
    },
    "hypervigilance7": function(element, level, ex) {
        element.textContent = ((1628 + level * 148)).toFixed(0) + "%";
    },
    "hypervigilance8": function(element, level, ex) {
        element.textContent = ((10 + level * 1)).toFixed(0) + "%";
    },
    "hypervigilance9": function(element, level, ex) {
        element.textContent = ((1007.2 + level * 92.8)).toFixed(0) + "%";
    },
    "hypervigilance10": function(element, level, ex) {
        element.textContent = ((624.8 + level * 112)).toFixed(0) + "%";
    },
    "hypervigilance11": function(element, level, ex) {
        element.textContent = ((22 + level * 2)).toFixed(0) + "%";
    },



    "mind_sword2": function(element, level, ex) {
        element.textContent = ((9187 + level * 1037)).toFixed(0) + "%";
    }
})


new Skill("mind_sword", 13, 0, {
    "mind_sword1": function(element, level, ex) {
        element.textContent = ((2756 + level * 311)).toFixed(0) + "%";
    },
    "mind_sword2": function(element, level, ex) {
        element.textContent = ((9187 + level * 1037)).toFixed(0) + "%";
    }
})

new Skill("flash_cut", 11, 0, {
    "flash_cut1": function(element, level, ex) {
        element.textContent = ((8415 + level * 950)).toFixed(0) + "%";
    },
    "flash_cut2": function(element, level, ex) {
        element.textContent = ((1376 + level * 156)).toFixed(0) + "%";
    },
    "flash_cut3": function(element, level, ex) {
        element.textContent = ((22950 + level * 2591)).toFixed(0) + "%";
    }
})

new Skill("control_blade", 4, 0, {
    "control_blade1": function(element, level, ex) {
        element.textContent = ((546 + level * 164)).toFixed(0) + "%";
    },
    "control_blade2": function(element, level, ex) {
        element.textContent = ((2137 + level * 649)).toFixed(0) + "%";
    },
    "control_blade3": function(element, level, ex) {
        element.textContent = ((8552 + level * 2583)).toFixed(0) + "%";
    }
})



/* 
<table id="ghost_chain_slash" frame="box" width="750px">
<tr>
<td align="center" style="background-color:#F5F8FA" colspan="8">技能数据一览</td>

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



*/