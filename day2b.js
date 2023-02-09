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
    let aim = 0;
    for await (let line of lines) {
        let match = line.match(/(forward|up|down) (\d+)/);
        if (match) {
            let op = match[1];
            let mag = parseInt(match[2]);

            if (op === 'forward') {
                hpos += mag;
                vpos += mag*aim;
            } else if (op === 'up') {
                aim -= mag;
            } else {
                // op === 'down'
                aim += mag;
            }

        } else {
            console.error('Parse error: ' + line);
        }
    }

    console.log(hpos*vpos)

}

main();