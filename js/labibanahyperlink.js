function AutoTermLink() {

    $.getJSON("https://seicing.com/js/noun.json", function (terms) {

        // ---------- 构建词库 ----------
        const words = [];

        terms.forEach(term => {

            if (!term.link) return;

            // priority 为 0，完全禁用自动链接
            if ((term.priority ?? 5) === 0) return;

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
                    priority: term.priority ?? 5
                });

            });

        });

        // ---------- 排序 ----------
        words.sort((a, b) => {

            if (a.priority !== b.priority)
                return b.priority - a.priority;

            return b.word.length - a.word.length;

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

                    const a = document.createElement("a");

                    a.href = item.link;
                    a.textContent = item.word;
                    a.style.color = "blue";

                    frag.appendChild(a);

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