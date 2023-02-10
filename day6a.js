#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

async function main() {
    let inputStream = fs.createReadStream(process.argv[2]);
    let lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity,
    });

    let fish;
    for await (let line of lines) {
        fish = line.split(',').map(s => parseInt(s));
    }

    for (let i=0; i<80; i++) {
        let len = fish.length;
        for (let j=0; j<len; j++) {
            if (fish[j] === 0) {
                fish[j] = 6;
                fish.push(8);
            } else {
                fish[j]--;
            }
        }
    }

    console.log(fish.length);

}

main();