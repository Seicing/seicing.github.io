new Skill("counting", 10, 0, {

    "counting1": function(element, level, ex, input) {
        element.textContent = (((input[6] * input[8] / 100 + input[7] * input[9] / 100 + input[10]) * ((100 - input[12]) / 100) * (1 + input[5] / 10) + input[11])).toFixed(0)

    },

    "counting2": function(element, level, ex, input) {
        element.textContent = (((input[6] * input[8] / 100 + input[7] * input[9] / 100 + input[10]) * ((100 - input[12]) / 100) * (1 + input[5] / 10) + input[11]) * (2 + input[4] / 10)).toFixed(0)
    },

    "counting3": function(element, level, ex, input) {
        element.textContent = (input[13] / (input[3] / 10)).toFixed(2) + "秒";
    },

    "counting4": function(element, level, ex, input) {
        element.textContent = (input[1] / input[2] / 10).toFixed(2) + "秒";
    },



})