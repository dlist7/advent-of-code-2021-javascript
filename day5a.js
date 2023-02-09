#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

async function main() {
    let inputStream = fs.createReadStream(process.argv[2]);
    let lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity,
    });

    let ventMap = {};
    for await (let line of lines) {
        let match = line.match(/(\d+),(\d+) -> (\d+),(\d+)/);
        if (match) {
            let [x0,y0,x1,y1] = match.slice(1).map(s => parseInt(s));
            if (x0 === x1) {
                if (y0 < y1) {
                    for (let i=y0; i<=y1; i++) {
                        let key = x0 + ',' + i;
                        if (ventMap[key]) {
                            ventMap[key]++;
                        } else {
                            ventMap[key] = 1;
                        }
                    }
                } else {
                    for (let i=y1; i<=y0; i++) {
                        let key = x0 + ',' + i;
                        if (ventMap[key]) {
                            ventMap[key]++;
                        } else {
                            ventMap[key] = 1;
                        }
                    }
                }
            }
            if (y0 === y1) {
                if (x0 < x1) {
                    for (let i=x0; i<=x1; i++) {
                        let key = i + ',' + y0;
                        if (ventMap[key]) {
                            ventMap[key]++;
                        } else {
                            ventMap[key] = 1;
                        }
                    }
                } else {
                    for (let i=x1; i<=x0; i++) {
                        let key = i + ',' + y0;
                        if (ventMap[key]) {
                            ventMap[key]++;
                        } else {
                            ventMap[key] = 1;
                        }
                    }
                }
            }
        } else {
            console.error('Parse error: ' + line);
        }
    }

    let count = 0;
    for (let [k,v] of Object.entries(ventMap)) {
        //console.log(k + ',' + v);
        if (v > 1) {
            count++;
        }
    }

    console.log(count);

}

main();