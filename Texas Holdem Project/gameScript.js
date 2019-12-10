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
        discardPile.push(gameDeck.shift())
        return gameDeck[0]
    };

    if (gameDeck.length < 2){
        discardPile.push(gameDeck.shift())
        while(discardPile.length != 0){
            gameDeck.push(discardPile.shift())
        }
        dealCard()
    }
}

for(i=0; i<50000; i++){
    dealCard()
}

/*deck = shuffleDeck()

for(i=0; i<5; i++){
    randomNum = Math.floor(Math.random() * deck.length);
    card = deck[randomNum];
    console.log('Images/' + card.getValue() + '_' + card.getSuit() + '.png');
    //currentCardSlot = 'card_slot' + (i + 1);
    //let temp = document.getElementById(currentCardSlot);
    //temp.setAttribute('src', 'Images/' + card.getValue() + '_' + card.getSuit() + '.png');
};*/