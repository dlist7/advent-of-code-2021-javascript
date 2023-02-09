#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

async function main() {
    let inputStream = fs.createReadStream(process.argv[2]);
    let lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity,
    });

    let hpos = 0;
    let vpos = 0;
    for await (let line of lines) {
        let match = line.match(/(forward|up|down) (\d+)/);
        if (match) {
            let op = match[1];
            let mag = parseInt(match[2]);

            if (op === 'forward') {
                hpos += mag;
            } else if (op === 'up') {
                vpos -= mag;
            } else {
                // op === 'down'
                vpos += mag;
            }

        } else {
            console.error('Parse error: ' + line);
        }
    }

    console.log(hpos*vpos)

}

main();