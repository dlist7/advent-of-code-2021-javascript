#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

async function main() {
    let inputStream = fs.createReadStream(process.argv[2]);
    let lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity,
    });

    let increaseCount = 0;
    let frame = []
    for await (let line of lines) {
        let value = parseInt(line)
        let previous;
        let current

        if (frame.length >= 3) {

            if (previous === undefined) {
                previous = 0;
                frame.forEach((v) => {
                    previous += v;
                });
            } else {
                previous = current;
            }

            frame.shift();
            frame.push(value)

            let current = 0;
            frame.forEach((v) => {
                current += v;
            });

            if (current > previous) {
                increaseCount++;
            }

        } else {
            frame.push(value);
        }

    }

    console.log(increaseCount);

}

main();