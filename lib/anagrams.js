const combinatorics = require('js-combinatorics');

module.exports = (wordbase) => {

    return {

        fromWord: (str) => {
            const permutations = combinatorics.permutation(str.split('')).map((permutation) => {
                return permutation.join('');
            });

            const anagrams = permutations.reduce((words, permutation) => {
                if (wordbase.isWord(permutation)) {
                    words.push(permutation);
                }
                return words;
            }, []);

             // remove duplicates (this is more readable than "[...new Set(anagrams)]")
            return Array.from(new Set(anagrams));
        },
    };
};
