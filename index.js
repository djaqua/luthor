#!/usr/bin/env node
const argv = require('yargs').argv;

const wordbase = require('./lib/words')('./wordbase.txt');
const anagrams = require('./lib/anagrams')(wordbase);
const caesar = require('./lib/caesar')(wordbase);

const word = argv._[0];

if (argv.anagrams) {
    console.log('anagrams: ', anagrams.fromWord(word));
}
if (argv.caesar) {
    console.log('caesar shifts: ', caesar.decodeWord(word));
}
