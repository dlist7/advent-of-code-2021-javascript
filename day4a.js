#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

function callNumber(n, cards) {
    for (let card of cards) {
        for (let row of card) {
            for (let square of row) {
                if (square.num === n) {
                    square.called = true;
                }
            }
        }
    }
}

function printCards(cards) {
    for (let card of cards) {
        for (let row of card) {
            for (let square of row) {
                if (square.called) {
                    process.stdout.write('X');
                } else {
                    process.stdout.write('.');
                }
            }
            console.log('');
        }
        console.log('');
    }
}

function hasBingo(card) {
    for (let i=0; i<card.length; i++) {
        let bingo = true;
        for (let j=0; j<card[i].length; j++) {
            if (!card[i][j].called) {
                bingo = false;
                break;
            }
        }
        if (bingo) {
            return true;
        }
    }
    for (let j=0; j<card[0].length; j++) {
        let bingo = true;
        for (let i=0; i<card.length; i++) {
            if (!card[i][j].called) {
                bingo = false;
                break;
            }
        }
        if (bingo) {
            return true;
        }
    }
}

function checkBingo(cards) {
    for (let card of cards) {
        if (hasBingo(card)) {
            return card;
        }
    }
}

function score(n, card) {
    let sum = 0;
    for (let i=0; i<card.length; i++) {
        for (let j=0; j<card[i].length; j++) {
            if (!card[i][j].called) {
                sum += card[i][j].num;
            }
        }
    }

    return n*sum;
}

async function main() {
    let inputStream = fs.createReadStream(process.argv[2]);
    let lines = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity,
    });

    let numbers;
    let cards = [];
    let i, card;
    for await (let line of lines) {
        if (line.indexOf(',') >= 0) {
            numbers = line.split(',').map(s => parseInt(s));
        } else {
            let match = line.match(/(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/);
            if (match) {
                card.push(match.splice(1,5).map(s => ({num: parseInt(s), called: false})));
            } else {
                if (card) {
                    cards.push(card);
                }
                i = 0;
                card = [];
            }
        }
    }
    cards.push(card);

    let n;
    for (n of numbers) {
        //console.log(n)
        callNumber(n, cards);
        //printCards(cards);
        if (card = checkBingo(cards)) {
            break;
        }
    }

    console.log(score(n, card));

}

main();