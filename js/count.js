class Skill {
    constructor(id, level, ex, funcMap) {
        this.id = id;
        this.level = level;
        this.ex = ex;
        this.funcMap = funcMap;

        this.element = document.getElementById(id);
        this.levelElement = document.getElementById(id + "_lv");
        this.exElement = document.getElementById(id + "_ex");
        this.inputElements = [];
        var i = 0;

        var skill = this;
        var onKeyPress = function() {
            skill.adjustAttributes();
        }

        while (true) {
            i++;
            var e = document.getElementById(id + "_input" + i);

            if (e) {
                e.onkeypress = onKeyPress;
                this.inputElements.push(e);
            } else {
                break;
            }
        }

        var levelAdd = document.getElementById(id + "_lv+");
        var levelSub = document.getElementById(id + "_lv-");
        var exAdd = document.getElementById(id + "_ex+");
        var exSub = document.getElementById(id + "_ex-");

        if (levelAdd) {
            levelAdd.onclick = function() {
                skill.addLevel();
            }
        }

        if (levelSub) {
            levelSub.onclick = function() {
                skill.subLevel();
            }
        }

        if (exAdd) {
            exAdd.onclick = function() {
                skill.addEx();
            }
        }

        if (exSub) {
            exSub.onclick = function() {
                skill.subEx();
            }
        }

        this.adjustLevel();
        this.adjustEx();
        this.adjustAttributes();
    }

    addLevel() {
        this.level++;
        this.adjustLevel();
        this.adjustAttributes();
    }

    subLevel() {
        this.level--;
        this.adjustLevel();
        this.adjustAttributes();
    }

    addEx() {
        this.ex++;
        this.adjustEx();
        this.adjustAttributes();
    }

    subEx() {
        this.ex--;
        this.adjustEx();
        this.adjustAttributes();
    }

    adjustLevel() {
        if (this.levelElement) {
            this.levelElement.textContent = this.level;
        }
    }

    adjustEx() {
        if (this.exElement) {
            this.exElement.textContent = this.ex;
        }
    }

    adjustAttributes() {
        var inputValues;

        if (this.inputElements.length > 0) {
            inputValues = [];

            for (var i = 0; i < this.inputElements.length; i++) {
                inputValues.push(parseInt(this.inputElements[i].value));
            }
        }

        for (var k in this.funcMap) {
            var e = document.getElementById(k);
            this.funcMap[k](e, this.level, this.ex, inputValues);
        }
    }
}