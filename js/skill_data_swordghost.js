new Skill("sword_ghost_blade_mastery", 10, 0, {
    "sword_ghost_blade_mastery1": function(element, level, ex) {
        element.textContent = (10 + level * 1).toFixed(0) + "%";
    },
    "sword_ghost_blade_mastery2": function(element, level, ex) {
        element.textContent = (3 + level * 0.5).toFixed(1) + "%";
    }
})

new Skill("blue_blood_fighting_ghost", 10, 0, {
    "blue_blood_fighting_ghost1": function(element, level, ex) {
        element.textContent = (5 + level * 1).toFixed(0) + "%";
    },
    "blue_blood_fighting_ghost2": function(element, level, ex) {
        element.textContent = (5 + level * 1).toFixed(1) + "%";
    },
    "blue_blood_fighting_ghost3": function(element, level, ex) {
        element.textContent = (5 + level * 0.5).toFixed(1) + "%";
    },
    "blue_blood_fighting_ghost4": function(element, level, ex) {
        element.textContent = (20 + level * 1).toFixed(1) + "%";
    }
})

new Skill("soul_resonance", 10, 0, {
    "soul_resonance1": function(element, level, ex) {
        element.textContent = (20 + level * 2).toFixed(0) + "%";
    }
})

new Skill("phantom_stance", 43, 5, {
    "phantom_stance1": function(element, level, ex) {
        element.textContent = (100 * (5.44 + (0.62 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})


new Skill("ghost_chain_slash", 43, 5, {
    "ghost_chain_slash1": function(element, level, ex) {
        element.textContent = (100 * (4.41 + (0.5 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "ghost_chain_slash2": function(element, level, ex) {
        element.textContent = (100 * (5.3 + (0.6 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "ghost_chain_slash3": function(element, level, ex) {
        element.textContent = (100 * (7.95 + (0.9 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("ghost_chainslash_ultimate", 43, 5, {
    "ghost_chainslash_ultimate1": function(element, level, ex) {
        element.textContent = (100 * (6.76 + (0.76 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("chain_fang", 38, 5, {
    "chain_fang1": function(element, level, ex) {
        element.textContent = (100 * (33.05 + (3.73 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("soul_crusher", 33, 5, {
    "soul_crusher1": function(element, level, ex) {
        element.textContent = (100 * (53.15 + (6.02 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("demon_execution", 28, 5, {
    "demon_execution1": function(element, level, ex) {
        element.textContent = (100 * (162.09 + (18.3 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("vengeance_spirit_flash_slash", 41, 5, {
    "vengeance_spirit_flash_slash1": function(element, level, ex) {
        element.textContent = (100 * (18.24 + (2.06 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})


new Skill("vengeance_spirit_chain_slash", 38, 5, {
    "vengeance_spirit_chain_slash1": function(element, level, ex) {
        element.textContent = (100 * (4.51 + (0.51 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "vengeance_spirit_chain_slash2": function(element, level, ex) {
        element.textContent = (100 * (6.01 + (0.68 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "vengeance_spirit_chain_slash3": function(element, level, ex) {
        element.textContent = (100 * (7.52 + (0.85 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "vengeance_spirit_chain_slash4": function(element, level, ex) {
        element.textContent = (100 * (12.03 + (1.36 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})


new Skill("vengeance_spirit_continuous_slash", 31, 5, {
    "vengeance_spirit_continuous_slash1": function(element, level, ex) {
        element.textContent = (100 * (27.45 + (3.1 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "vengeance_spirit_continuous_slash2": function(element, level, ex) {
        element.textContent = (100 * (41.18 + (4.65 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("cooperation_flash_slash", 36, 5, {
    "cooperation_flash_slash1": function(element, level, ex) {
        element.textContent = (100 * (13.91 + 1.57 * level) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "cooperation_flash_slash2": function(element, level, ex) {
        element.textContent = (100 * (32.46 + 3.67 * level) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("cooperation_moon_slash", 33, 5, {
    "cooperation_moon_slash1": function(element, level, ex) {
        element.textContent = (100 * (59.54 + 6.72 * level) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})


new Skill("man_who_named_yaksha", 18, 0, {
    "man_who_named_yaksha1": function(element, level, ex) {
        element.textContent = (11.5 + level * 1.5).toFixed(1) + "%";
    },
    "man_who_named_yaksha2": function(element, level, ex) {
        element.textContent = (2 + level * 0.5).toFixed(1) + "%";
    }
})

new Skill("skyslayer", 11, 0, {
    "skyslayer1": function(element, level, ex) {
        element.textContent = (100 * (92.82 + (28.00 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("vengeance_spirit_overkill", 21, 5, {
    "vengeance_spirit_overkill1": function(element, level, ex) {
        element.textContent = (100 * (90.46 + (10.22 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    }
})

new Skill("cooperation_hell_slash", 16, 5, {
    "cooperation_hell_slash1": function(element, level, ex) {
        element.textContent = (100 * (22.49 + (2.54 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "cooperation_hell_slash2": function(element, level, ex) {
        element.textContent = (100 * (89.99 + (10.16 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "cooperation_hell_slash3": function(element, level, ex) {
        element.textContent = (100 * (112.47 + (12.71 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
})


new Skill("devil_avatar", 9, 0, {
    "devil_avatar1": function(element, level, ex) {
        element.textContent = (22 + level * 2).toFixed(1) + "%";
    }
})

new Skill("vengeance_spirit_wind_slash", 13, 0, {
    "vengeance_spirit_wind_slash1": function(element, level, ex) {
        element.textContent = (100 * (107.99 + (12.2 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
})

new Skill("devil_blade_dance", 11, 0, {
    "devil_blade_dance1": function(element, level, ex) {
        element.textContent = (100 * (22.74 + (2.57 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "devil_blade_dance2": function(element, level, ex) {
        element.textContent = (100 * (68.23 + (7.71 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "devil_blade_dance3": function(element, level, ex) {
        element.textContent = (100 * (90.99 + (10.27 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "devil_blade_dance4": function(element, level, ex) {
        element.textContent = (100 * (56.86 + (6.42 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "devil_blade_dance5": function(element, level, ex) {
        element.textContent = (100 * (159.24 + (17.97 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
})

new Skill("genocide", 4, 0, {
    "genocide1": function(element, level, ex) {
        element.textContent = (100 * (134.68 + (40.66 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "genocide2": function(element, level, ex) {
        element.textContent = (100 * (134.68 + (40.66 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "genocide3": function(element, level, ex) {
        element.textContent = (100 * (134.68 + (40.66 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
    "genocide4": function(element, level, ex) {
        element.textContent = (100 * (493.84 + (149.08 * level)) * (1 + (0.1 * ex))).toFixed(0) + "%";
    },
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