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
    let fishCounts = Array(9).fill(0n,0,9);
    for await (let line of lines) {
        fish = line.split(',').map(s => parseInt(s));
    }
    for (f of fish) {
        fishCounts[f]++;
    }

    for (let i=0; i<256; i++) {
        let zero = fishCounts[0];
        for (let j=0; j<8; j++) {
            fishCounts[j] = fishCounts[j+1];
        }
        fishCounts[8] = zero;
        fishCounts[6] += zero;
    }

    console.log(fishCounts.reduce((c0,c1) => c0 + c1));

}

main();