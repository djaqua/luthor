const fs = require('fs');

const proxyPush = (handle, arrayName, arrayElement) => {
    if (!handle[arrayName]) {
        handle[arrayName] = [];
    }
    handle[arrayName].push(arrayElement);
};

const ENCODING_DEFAULT = 'utf-8';
const NEWLINE_DEFAULT = '\n';

module.exports = (filename, options) => {

    options = options || {};    // by definition, options are optional

    const fileData = fs.readFileSync(filename, options.encoding || ENCODING_DEFAULT);

    const allWords = fileData.split(options.newline || NEWLINE_DEFAULT);

    const wordsByLength = allWords.reduce((wordsByLength, currentWord) => {
        const formattedWord = currentWord.trim().toLowerCase();    // 9 out of 10 times this is going to be unnecessary, but worth preventing 1 out of 10
        proxyPush(wordsByLength, formattedWord.length, formattedWord);
        return wordsByLength;
    }, {});

    return {
        isWord: (str) => {
            const formattedStr = str.trim().toLowerCase();
            return wordsByLength[formattedStr.length].includes(formattedStr);
        },
    };
};
