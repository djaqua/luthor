
const ALPHABET_DEFAULT = 'abcdefghijklmnopqrstuvwxyz';

module.exports = (wordbase, options) => {

    options = options || {};

    const alphabet = (options.alphabet || ALPHABET_DEFAULT).split('');
    const allCaesars = {[alphabet[0]]: alphabet}; // typically, this will be {'a':['a','b','c',...,'z']}
    const alphabetLength = alphabet.length;

    for (let i = 1; i < alphabetLength; i++) {

        const currentShift = allCaesars[alphabet[i-1]].slice(); // copy previous cipher shift

        currentShift.push(currentShift.shift());                // send first letter to the end
        allCaesars[alphabet[i]] = currentShift;                 // make it a cipher
    }

    return {

        decodeWord: (encodedStr) => {

            const decodedWords = [];

            for (let i = 0; i < alphabetLength; i++) {

                const encodedChars = encodedStr.split('');
                const decodedStr = encodedChars.map((char) => {
                    return allCaesars[char][i];
                }).join('');

                if (wordbase.isWord(decodedStr)) {
                    decodedWords.push({
                        decoded: decodedStr,
                        shifted: alphabetLength - i,
                    });
                }
            }

            return decodedWords;
        },

    };
};
