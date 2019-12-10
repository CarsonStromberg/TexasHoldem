// Declares Card class and the function to generate deck and shuffle the deck
class Card {
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }

    getSuit(){
        return this.suit;
    }

    getValue(){
        return this.value;
    }
}

function cardFactory(){
    let suitList = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];
    let valueList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let deck = [];

    for(suit = 0; suit < suitList.length; suit++){
        for(value = 0; value < valueList.length; value++){
            newCard = new Card(suitList[suit], valueList[value]);
            deck.push(newCard);
        }
    }
    
    return deck
}

function shuffleDeck(generatedDeck = cardFactory()) {
    for(count = 0; count < generatedDeck.length; count++){
        randomCardIndex = Math.floor(Math.random() * generatedDeck.length);
        currentCard = generatedDeck[randomCardIndex];
        generatedDeck[randomCardIndex] = generatedDeck[count];
        generatedDeck[count] = currentCard;
    }

    return generatedDeck
}

//--------------------------------------------------------------------------
// Game Functionality
gameDeck = shuffleDeck();
discardPile = [];

function dealCard() {
    if (gameDeck.length >= 2){
        discardPile.push(gameDeck.shift());
        return gameDeck[0];
    };

    if (gameDeck.length < 2){
        discardPile.push(gameDeck.shift());
        while(discardPile.length != 0){
            gameDeck.push(discardPile.shift());
        }
        dealCard();
    }
}

//--------------------------------------------------------------------------
// Interface Testing
for(i=1; i<6; i++){
    currentDraw = dealCard();
    cardImgSrc = 'Images/' + currentDraw.getValue() + '_of_' + currentDraw.getSuit() + '.png';
    (document.getElementById('card_slot' + i)).setAttribute('src', cardImgSrc)
}

for (i=1; i<3; i++) {
    currentDraw = dealCard();
    cardImgSrc = 'Images/' + currentDraw.getValue() + '_of_' + currentDraw.getSuit() + '.png';
    (document.getElementById('player_card' + i)).setAttribute('src', cardImgSrc)
}

