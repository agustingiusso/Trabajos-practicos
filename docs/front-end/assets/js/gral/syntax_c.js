document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre code.language-c');
    if (codeBlocks.length === 0) return;

    const KEYWORDS = new Set([
        'int', 'float', 'double', 'char', 'void', 'long', 'short',
        'unsigned', 'signed', 'const', 'struct', 'typedef', 'enum',
        'if', 'else', 'switch', 'case', 'default', 'for', 'while',
        'do', 'return', 'break', 'continue', 'sizeof', 'static', 'NULL'
    ]);

    const BRACKET_CLASSES = ['hl-bracket-1', 'hl-bracket-2', 'hl-bracket-3'];
    const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
    const escapeHTML = (str) => str.replace(/[&<>]/g, ch => ESCAPE_MAP[ch]);

    const FORMAT_REGEX = /(%(?:\.\d+)?[dfscuxXegp%]|\\[ntrvba'"\\0])/g;
    const highlightStringContent = (rawStr) =>
        escapeHTML(rawStr).replace(FORMAT_REGEX, '<span class="hl-format">$1</span>');

    const TOKEN_REGEX = new RegExp([
        '(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*)',
        '(^[ \\t]*#\\s*include\\b|[ \\t]*#\\s*define\\b)',
        '(<[a-zA-Z0-9_\\.]+>)',
        '("(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\')',
        '\\b(\\d+(?:\\.\\d+)?f?)\\b',
        '\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b(?=\\s*\\[)',
        '\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b(?=\\s*\\()',
        '\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b',
        '([{}()\\[\\]])',
        '(&&|\\|\\||==|!=|<=|>=|\\+\\+|--|[&*+\\-\\/%<>=!])'
    ].join('|'), 'gm');

    const highlightCCode = (rawCode) => {
        let bracketDepth = 0;
        let lastTokenWasType = false;

        return rawCode.replace(TOKEN_REGEX, (
            match, comment, directive, headerLib, stringLit,
            number, arrayIdent, funcIdent, word, bracket, operator
        ) => {
            if (comment) {
                lastTokenWasType = false;
                return `<span class="hl-comment">${escapeHTML(comment)}</span>`;
            }
            if (directive) {
                lastTokenWasType = false;
                return `<span class="hl-macro">${escapeHTML(directive)}</span>`;
            }
            if (headerLib) {
                lastTokenWasType = false;
                return `<span class="hl-header">${escapeHTML(headerLib)}</span>`;
            }
            if (stringLit) {
                lastTokenWasType = false;
                return `<span class="hl-string">${highlightStringContent(stringLit)}</span>`;
            }
            if (number) {
                lastTokenWasType = false;
                return `<span class="hl-number">${escapeHTML(number)}</span>`;
            }
            if (arrayIdent) {
                if (KEYWORDS.has(arrayIdent)) {
                    return `<span class="hl-keyword">${escapeHTML(arrayIdent)}</span>`;
                }
                lastTokenWasType = false;
                return `<span class="hl-def">${escapeHTML(arrayIdent)}</span>`;
            }
            if (funcIdent) {
                if (KEYWORDS.has(funcIdent)) {
                    lastTokenWasType = false;
                    return `<span class="hl-keyword">${escapeHTML(funcIdent)}</span>`;
                }
                const cls = (lastTokenWasType || funcIdent === 'main') ? 'hl-def' : 'hl-func';
                lastTokenWasType = false;
                return `<span class="${cls}">${escapeHTML(funcIdent)}</span>`;
            }
            if (word) {
                if (KEYWORDS.has(word)) {
                    lastTokenWasType = true;
                    return `<span class="hl-keyword">${escapeHTML(word)}</span>`;
                }
                lastTokenWasType = false;
                return `<span class="hl-var">${escapeHTML(word)}</span>`;
            }
            if (bracket) {
                lastTokenWasType = false;
                if (bracket === '(' || bracket === '{' || bracket === '[') {
                    const cls = BRACKET_CLASSES[bracketDepth % 3];
                    bracketDepth++;
                    return `<span class="${cls}">${escapeHTML(bracket)}</span>`;
                }
                bracketDepth = Math.max(0, bracketDepth - 1);
                return `<span class="${BRACKET_CLASSES[bracketDepth % 3]}">${escapeHTML(bracket)}</span>`;
            }
            if (operator) {
                lastTokenWasType = false;
                return `<span class="hl-operator">${escapeHTML(operator)}</span>`;
            }
            return escapeHTML(match);
        });
    };

    codeBlocks.forEach(block => {
        block.innerHTML = highlightCCode(block.textContent);
    });
});