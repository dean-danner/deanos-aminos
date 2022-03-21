var myCard = document.getElementById("card");
var myNumber = document.getElementById("number");

var buttonNext = document.getElementById("next");
var buttonPrevious = document.getElementById("previous");
var buttonShuffle = document.getElementById("shuffle");

const aminos = [["alanine", "A", "Ala", "-"], ["glycine", "G", "Gly", "-"], ["isoleucine", "I", "Ile", "-"],
["leucine", "L", "Leu", "-"], ["proline", "P", "Pro", "-"], ["valine", "V", "Val", "-"],
["phenylalanine", "F", "Phe", "-"], ["tryptophan", "W", "Trp", "-"], ["tyrosine", "Y", "Tyr", "pKa=10.9"],
["aspartic_acid", "D", "Asp", "pKa=4.1"], ["glutamic_acid", "E", "Glu", "pKa=4.1"], ["arginine", "R", "Arg", "pKa=12.5"],
["histidine", "H", "His", "pKa=6.0"], ["lysine", "K", "Lys", "pKa=10.8"], ["serine", "S", "Ser", "-"],
["threonine", "T", "Thr", "-"], ["cysteine", "C", "Cys", "pKa=8.3"], ["methionine", "M", "Met", "-"],
["asparagine", "N", "Asn", "-"], ["glutamine", "Q", "Gln", "-"]];
var displayStr = false, displayName = false;
var cnum = 0;
var cards = [];
var curCard = "";

function generateCards() {
    let card = 0;

    while (cards.length < aminos.length) {
        card = Math.round(Math.random() * (aminos.length-1));
        if (cards.includes(aminos[card])) {
            continue;
        } else {
            cards.push(aminos[card]);
        }
    }
}

function nextCard() {
    curCard = cards[cnum];
    displayStr = true;
    displayName = false;

    displayCard();
    displayNumber();
    checkButtons();
}

function displayCard() {
    if (displayStr) {
        myCard.innerHTML = "<img src='assets\\" + curCard[0] + ".png' />";
    } else if (displayName) {
        myCard.innerHTML = "<p>" + curCard[0].replace("_", " ") + "<br>" +
        curCard[2] + " (" + curCard[1] + ")<br>" + curCard[3] + "</p>";
    }
}

function displayNumber() {
    if ((cnum + 1) < 10) {
        myNumber.innerHTML = "Card 0";
    } else {
        myNumber.innerHTML = "Card ";
    }
    myNumber.innerHTML += (cnum + 1);
}

function checkButtons() {
    if (cnum < 1) {
        buttonPrevious.className = "nes-btn is-disabled";
    } else {
        buttonPrevious.className = "nes-btn";
    }
    if (cnum > cards.length - 2) {
        buttonNext.className = "nes-btn is-disabled";
    } else {
        buttonNext.className = "nes-btn";
    }
}

myCard.addEventListener("click", function() {
    if (displayStr) {
        displayStr = false;
        displayName = true;
    } else if (displayName) {
        displayName = false;
        displayStr = true;
    }
    displayCard();
});

buttonNext.addEventListener("click", function() {
    if (cnum < cards.length - 1) {
        cnum++;
        nextCard();
    }
});

buttonPrevious.addEventListener("click", function() {
    if (cnum > 0) {
        cnum--;
        nextCard();
    }
});

buttonShuffle.addEventListener("click", function() {
    cnum = 0;
    cards = [];
    generateCards();
    nextCard();
});

generateCards();
nextCard();