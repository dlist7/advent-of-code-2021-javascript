#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

async function main() {
    let inputStream = fs.createReadStream(process.argv[2]);
    let lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity,
    });

    let previous = null;
    let increaseCount = 0;
    for await (let line of lines) {
        let value = parseInt(line)
        if (previous != null && previous < value) {
            increaseCount++;
        }
        previous = value;
    }

    console.log(increaseCount);

}

main();