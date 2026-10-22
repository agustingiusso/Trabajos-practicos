/**
 * Resaltador de sintaxis para lenguaje C (Estilo VS Code Dark)
 * Compatible con copy.js y navegación por slides/partes.
 */
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre code.language-c');

    const KEYWORDS = new Set([
        'int', 'float', 'double', 'char', 'void', 'long', 'short',
        'unsigned', 'signed', 'const', 'struct', 'typedef', 'enum',
        'if', 'else', 'switch', 'case', 'default', 'for', 'while',
        'do', 'return', 'break', 'continue', 'sizeof', 'static', 'NULL'
    ]);

    const escapeHTML = (str) =>
        str.replace(/&/g, '&amp;')
           .replace(/</g, '&lt;')
           .replace(/>/g, '&gt;');

    // Resalta especificadores (%d, %f, %.2f, %s, %c) y escapes (\n, \t) dentro de strings
    const highlightStringContent = (rawStr) => {
        const escaped = escapeHTML(rawStr);
        return escaped.replace(
            /(%(?:\.\d+)?[dfscuxXegp%]|\\[ntrvba'"\\0])/g,
            '<span class="hl-format">$1</span>'
        );
    };

    const highlightCCode = (rawCode) => {
        let bracketDepth = 0;
        const bracketClasses = ['hl-bracket-1', 'hl-bracket-2', 'hl-bracket-3'];

        // Expresión regular maestra de una sola pasada
        const tokenRegex = new RegExp([
            '(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*)',                       // 1: Comentarios
            '(^[ \\t]*#\\s*include\\b|[ \\t]*#\\s*define\\b)',         // 2: Directivas (#include, #define)
            '(<[a-zA-Z0-9_\\.]+>)',                                    // 3: Librerías (<stdio.h>)
            '("(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\')',        // 4: Strings y chars
            '\\b(\\d+(?:\\.\\d+)?f?)\\b',                              // 5: Números
            '\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b(?=\\s*\\[)',               // 6: Identificador de arreglo (ej: nombre[50])
            '\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b(?=\\s*\\()',               // 7: Funciones (main, printf, scanf)
            '\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b',                          // 8: Keywords o variables normales
            '([{}()\\[\\]])',                                          // 9: Llaves, paréntesis y corchetes
            '(&&|\\|\\||==|!=|<=|>=|\\+\\+|--|[&*+\\-\\/%<>=!])'       // 10: Operadores (&, =, +, etc.)
        ].join('|'), 'gm');

        let lastTokenWasType = false;

        return rawCode.replace(tokenRegex, (
            match,
            comment,
            directive,
            headerLib,
            stringLit,
            number,
            arrayIdent,
            funcIdent,
            word,
            bracket,
            operator
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
                // Si viene precedido de un tipo (ej: int main) o es main, usa naranja (.hl-def)
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
                    const cls = bracketClasses[bracketDepth % 3];
                    bracketDepth++;
                    return `<span class="${cls}">${escapeHTML(bracket)}</span>`;
                } else {
                    bracketDepth = Math.max(0, bracketDepth - 1);
                    const cls = bracketClasses[bracketDepth % 3];
                    return `<span class="${cls}">${escapeHTML(bracket)}</span>`;
                }
            }
            if (operator) {
                lastTokenWasType = false;
                return `<span class="hl-operator">${escapeHTML(operator)}</span>`;
            }
            return escapeHTML(match);
        });
    };

    codeBlocks.forEach((block) => {
        const rawText = block.textContent;
        block.innerHTML = highlightCCode(rawText);
    });
});