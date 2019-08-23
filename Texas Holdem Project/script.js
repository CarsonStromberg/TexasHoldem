// Intialize Suits, Value, and Deck 
const suits = ['Hearts', 'Spades', 'Clubs', 'Diamond'];
let value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

/* // Initializes Deck of Cards and Shuffles the cards
function shuffleDeck() {
    let deck = [];
    let tempValue = [];
    let suitController = 0;
    let tempDeck = [];
    // Mixes up the values according to suits
    for (c = 0; c < suits.length; c++) {
        for(i = 0; i < 13; i++) {
            let randomNum = Math.floor(Math.random() * value.length);
            let randomValue = value[randomNum];
            tempValue.push(randomValue);
            value.splice(randomNum, 1);
            deck.push(suits[suitController],tempValue[i]);
        }
        suitController++;
    }

    // Mix up the suits with matched value (evens = suit, odds = number)
    do {
        let randomCard = Math.floor(Math.random() * 104);
        if (randomCard % 2 === 0 || randomCard === 0) {
            if (deck[randomCard] != undefined){
                tempDeck.push(deck[randomCard], deck[randomCard + 1]);
                deck.splice(randomCard, 2)
            }
        }
    }
    while (deck.length != 0);
    
    deck = tempDeck;
    return deck;
} 

function getPlayerCards() {
    let shuffledDeck = shuffleDeck();

    // Dealer gives Player 2 cards 
    for (i = 0; i < 2; i++){
    let randomDraw = Math.floor(Math.random() * 104);
    if (randomDraw % 2 == 0){
        let playerHand = [shuffledDeck[randomDraw]]
    }

}

console.log(dealCards());
*/

// Attempt #2 with Objects
function shuffleDeck() {
    let deck = [];
    let tempDeck = [];
    let tempValue = [];
    function Card (suit, value) {
        this.suitName = suit;
        this.cardValue = value;
    }
    let suitControl = 0;
    let deckIndex = 0;
    // Create the card objects and save to the deck array
    for (s = 0; s < suits.length; s++){
        for(i = 0; i < 13; i++) {
            // Randomizes Values which card will pull from
            let randomNum = Math.floor(Math.random() * value.length);
            tempValue.push(value[randomNum]);
            value.splice(randomNum, 1);
            
            // Card pulls from suits and newly randomized values and saves card value to deck
            let tempCard = new Card();
            tempCard.suitName = suits[suitControl];
            tempCard.cardValue = tempValue[i];
            deck[deckIndex] = tempCard;
            deckIndex++;
        }
        suitControl++;
        value = tempValue;
    }

    //Shuffles the suits
    for (a = 0; a < 52; a++){
        let randomCard = Math.floor(Math.random() * deck.length);
        tempDeck.push(deck[randomCard]);
        deck.splice(randomCard, 1);
    }

    deck = tempDeck;
    return deck;
}

function dealCards() {
    let faceUp = [];
    let playDeck = shuffleDeck();
    // 3 cards to the front
    for(i = 0; i < 3; i++){
        let randomDraw = Math.floor(Math.random() * playDeck.length);
        faceUp.push(playDeck[randomDraw]);
        playDeck.splice(randomDraw, 1);
        console.log(faceUp[i]);
    }

    return faceUp;
}