#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

async function main() {
    let inputStream = fs.createReadStream(process.argv[2]);
    let lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity,
    });

    let ogr = []
    let csr = []
    for await (let line of lines) {
        ogr.push(line);
        csr.push(line);
    }

    for (let i=0;i<ogr[0].length;i++) {
        let count = 0;
        let onesCount = 0;

        for (let j=0;j<ogr.length;j++) {
            if (ogr[j][i] === '1') {
                onesCount++;
            }
            count++;
        }

        let nogr = [];
        for (let j=0;j<ogr.length;j++) {
            if (onesCount/count >= 0.5) {
                if (ogr[j][i] === '1') {
                    nogr.push(ogr[j]);
                }
            } else {
                if (ogr[j][i] === '0') {
                    nogr.push(ogr[j]);
                }
            }
        }

        ogr = nogr;
        if (ogr.length === 1) {
            break;
        }

    }

    for (let i=0;i<csr[0].length;i++) {
        let count = 0;
        let onesCount = 0;

        for (let j=0;j<csr.length;j++) {
            if (csr[j][i] === '1') {
                onesCount++;
            }
            count++;
        }

        let ncsr = [];
        for (let j=0;j<csr.length;j++) {
            if (onesCount/count < 0.5) {
                if (csr[j][i] === '1') {
                    ncsr.push(csr[j]);
                }
            } else {
                if (csr[j][i] === '0') {
                    ncsr.push(csr[j]);
                }
            }
        }

        csr = ncsr;
        if (csr.length === 1) {
            break;
        }

    }

    console.log(parseInt(ogr,2)*parseInt(csr,2));

}

main();