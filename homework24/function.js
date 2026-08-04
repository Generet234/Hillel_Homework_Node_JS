"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (typeof document !== 'undefined') {
    const inputWordsForbidden = document.getElementsByClassName("forbiddenWords")[1];
    const inputString = document.getElementsByClassName("string")[1];
    let text = inputWordsForbidden ? inputWordsForbidden.value : "This is a test sentence with some bad words.";
    let forbiddenWords = inputString ? inputString.value.split(",") : ['bad', 'test'];
    function highlightForbiddenWords(text, forbiddenWords) {
        const foundWords = forbiddenWords.filter((element) => text.includes(element));
        console.log(foundWords);
        if (foundWords.length > 0) {
            for (let word of foundWords) {
                text = text.replace(word, `<del>${word}</del> `);
            }
        }
        return text;
    }
    console.log(highlightForbiddenWords(text, forbiddenWords));
}
//# sourceMappingURL=function.js.map