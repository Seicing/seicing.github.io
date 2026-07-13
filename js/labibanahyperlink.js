function AutoTermLink() {

    $.getJSON("https://seicing.com/js/noun.json", function (terms) {

        // ---------- 构建词库 ----------
        const words = [];

        terms.forEach(term => {

            const priority = term.priority ?? 5;

            // priority 为 0，完全忽略
            if (priority === 0) return;

            // 既没有 link，也不是 block，就跳过
            if (!term.link && !term.block) return;

            let list = [];

            if (term.linkword) {

                if (Array.isArray(term.linkword))
                    list = term.linkword;

                else
                    list = term.linkword.split(",").map(v => v.trim());

            } else {

                list = [term.cn];

            }

            list.forEach(word => {

                words.push({
                    word: word,
                    link: term.link,
                    block: term.block === true,
                    priority: term.priority ?? 5
                });

            });

        });

        // ---------- 排序 ----------
        words.sort((a, b) => {

            if (a.priority !== b.priority)
                return b.priority - a.priority;

            if (a.word.length !== b.word.length)
                return b.word.length - a.word.length;

            // 相同词时，block 永远优先
            return (b.block === true) - (a.block === true);

        });

        // ---------- 构建 Regex ----------
        const escapeRegExp = s =>
            s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex = new RegExp(
            words.map(v => escapeRegExp(v.word)).join("|"),
            "g"
        );

        const wordMap = new Map();

        words.forEach(v => {

            if (!wordMap.has(v.word))
                wordMap.set(v.word, v);

        });

        // ---------- 遍历 ----------
        function walk(node) {

            if (node.nodeType === Node.TEXT_NODE) {

                const text = node.nodeValue;

                regex.lastIndex = 0;

                let match;

                let last = 0;

                let found = false;

                const frag = document.createDocumentFragment();

                while ((match = regex.exec(text)) !== null) {

                    found = true;

                    if (match.index > last) {

                        frag.appendChild(
                            document.createTextNode(
                                text.substring(last, match.index)
                            )
                        );

                    }

                    const item = wordMap.get(match[0]);

                    if (item.block) {

                        // block：直接输出文字，不生成链接
                        frag.appendChild(
                            document.createTextNode(item.word)
                        );

                    } else {

                        const a = document.createElement("a");

                        a.href = item.link;
                        a.textContent = item.word;
                        a.class = "var(--special-link-color)";

                        frag.appendChild(a);

                    }

                    last = regex.lastIndex;

                }

                if (!found)
                    return;

                if (last < text.length) {

                    frag.appendChild(
                        document.createTextNode(
                            text.substring(last)
                        )
                    );

                }

                node.parentNode.replaceChild(frag, node);

                return;

            }

            if (node.nodeType !== Node.ELEMENT_NODE)
                return;

            const tag = node.tagName.toLowerCase();

            if ([
                "a",
                "b",
                "script",
                "style",
                "code",
                "pre",
                "textarea"
            ].includes(tag))
                return;

            [...node.childNodes].forEach(walk);

        }

        walk(document.body);

    });

}