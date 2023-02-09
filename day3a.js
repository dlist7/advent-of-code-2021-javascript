#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

async function main() {
    let inputStream = fs.createReadStream(process.argv[2]);
    let lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity,
    });

    let count = 0;
    let bitCount = [];
    for await (let line of lines) {
        count++;
        for (let i=0;i<line.length;i++) {
            if (line[i] == '1') {
                bitCount[i] = bitCount[i] ? bitCount[i] + 1 : 1;
            }
        }
    }

    let gamma = 0;
    let epsilon = 0;
    for (let i=0;i<bitCount.length;i++) {
        if (bitCount[i]/count > 0.5) {
            gamma = (gamma<<1) + 1;
            epsilon = epsilon<<1;
        } else {
            gamma = gamma<<1;
            epsilon = (epsilon<<1) + 1;
        }
    }

    console.log(gamma*epsilon);

}

main();