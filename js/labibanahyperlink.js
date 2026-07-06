
function AutoTermLink() {
    $.getJSON("https://seicing.com/js/noun.json", function (terms) {
        terms = terms
            .filter(term => term.link)
            .sort((a, b) => b.cn.length - a.cn.length);
        function walk(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                let text = node.nodeValue;
                for (const term of terms) {
                    if (!text.includes(term.cn))
                        continue;
                    const frag = document.createDocumentFragment();
                    let lastIndex = 0;
                    text.split(term.cn).forEach((part, index, arr) => {
                        if (part.length)
                            frag.appendChild(document.createTextNode(part));
                        if (index < arr.length - 1) {
                            const a = document.createElement("a");
                            a.href = term.link;
                            a.textContent = term.cn;
                            frag.appendChild(a);
                        }
                    });
                    node.parentNode.replaceChild(frag, node);
                    return;
                }
                return;
            }
            if (node.nodeType !== Node.ELEMENT_NODE)
                return;
            const tag = node.tagName.toLowerCase();
            if ([
                "a",
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