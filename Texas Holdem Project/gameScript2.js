// Declares Card class and associated Functions
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

// Function to generate an unsorted Deck
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
    
    return deck;
}

// Declares Deck Class and associated Functions
class Deck {
    constructor(deck){
        this.deck = deck;
    }

    shuffleDeck() {
        var count, randomCardIndex, currentCard;
        for(count = 0; count < this.deck.length; count++){
            randomCardIndex = Math.floor(Math.random() * this.deck.length);
            currentCard = this.deck[randomCardIndex];
            this.deck[randomCardIndex] = this.deck[count];
            this.deck[count] = currentCard;
        }
    
        return this.deck.length;
    }

    burnCard() {
        DiscardPile.discardCard(this.deck.pop())
    }

    dealCard() {
        return this.deck.pop();
    }

    showDeck(){
        return this.deck.length;
    }

}

// Declares DiscardPile Class and associated Functions
class DiscardPile {
    constructor(discardPile){
        this.discardPile = discardPile;
    }

    discardCard(card){
        this.discardPile.push(card);
    }

    showDiscardPile(){
        return this.discardPile.length;
    }
}

// Declares Table Class and associated Functions
class Table {
    constructor(tableCards){
        this.tableCards = tableCards;
    }

    addCard(deck){
        this.tableCards.push(deck.dealCard());
    }

    getCard(cardIndex){
        return this.tableCards[cardIndex];
    }

    tableCardCount() {
        return this.tableCards.length;
    }

    showTableCards(){
        var count;
        for(count = 0; count < this.tableCards.length; count++){
            console.log(this.tableCards[count]);
        }
    }

    roundEnd(discardPile){
        var cardIndex;
        for(cardIndex = 0; cardIndex < this.tableCards.length; cardIndex++){
            discardPile.discardCard(this.tableCards[cardIndex]);
        }
    }
}

// Declares PlayerHand Class and associated functions
class PlayerHand {
    constructor(playerHand){
        this.playerHand = playerHand;
    }

    addCard(deck){
        this.playerHand.push(deck.dealCard());
    }

    getCard(cardIndex){
        return this.playerHand[cardIndex];
    }

    showHand(){
        var count;
        for(count = 0; count < this.playerHand.length; count++){
            console.log(this.playerHand[count]);
        }
    }

    roundEnd(discardPile){
        var cardIndex;
        for(cardIndex = 0; cardIndex < this.playerHand.length; cardIndex++){
            discardPile.discardCard(this.playerHand[cardIndex]);
        }
    }
}

// Dealer Class Functions
class Dealer {
    initialDeal(deck, playerHand){
        playerHand.addCard(deck);
        playerHand.addCard(deck);
    }
    
    flop(deck, table) {
        deck.burnCard();
        table.addCard(deck);
        table.addCard(deck);
        table.addCard(deck);
    }

    turn(deck, table) {
        deck.burnCard();
        table.addCard(deck);
    }
    
    roundEnd(playerHand, table, discardPile){
        playerHand.roundEnd(discardPile);
        table.roundEnd(discardPile);
    }

}

// Visuals class and associated functions
class Visuals {
    playerHandInterface(playerHand){
        var cardIndex = 0;
        while(cardIndex != 2){
            var cardImgSrc = 'Images/' + playerHand.getCard(cardIndex).getValue() + '_of_' + playerHand.getCard(cardIndex).getSuit() + '.png';
            (document.getElementById('player_card' + cardIndex)).setAttribute('src', cardImgSrc)
            cardIndex++;
        }
    }

    tableInterface(tableCards){
        var cardIndex = 0;
        while(cardIndex != tableCards.tableCardCount()){
            var cardImgSrc = 'Images/' + tableCards.getCard(cardIndex).getValue() + '_of_' + tableCards.getCard(cardIndex).getSuit() + '.png';
            (document.getElementById('card_slot' + cardIndex)).setAttribute('src', cardImgSrc)
            cardIndex++;
        }
    }
}

// Interactive functions
function continueGame() {
    PlayDeck = new Deck(cardFactory());
    DiscardPile = new DiscardPile(discardPile = []);
    Table = new Table(tableCards = []);
    PlayerHand = new PlayerHand(playerHand = []);
    Dealer = new Dealer();
    Visuals = new Visuals();

    PlayDeck.shuffleDeck();
    Dealer.initialDeal(PlayDeck, PlayerHand);
    Visuals.playerHandInterface(PlayerHand);
    PlayerHand.showHand();

    Dealer.flop(PlayDeck, Table);
    Dealer.turn(PlayDeck, Table);
    Dealer.turn(PlayDeck, Table);
    Visuals.tableInterface(Table);
}

function main() {
    PlayDeck = new Deck(cardFactory());
    DiscardPile = new DiscardPile(discardPile = []);
    Table = new Table(tableCards = []);
    PlayerHand = new PlayerHand(playerHand = []);
    Dealer = new Dealer();

    PlayDeck.shuffleDeck();
    Dealer.initialDeal(PlayDeck, PlayerHand);
    Dealer.flop(PlayDeck, Table);

    // Checks
    console.log(PlayDeck.showDeck());
    console.log(DiscardPile.showDiscardPile());
    console.log('This is the Table Cards');
    Table.showTableCards();

    console.log("This is the Player's Hand");
    PlayerHand.showHand();

    Dealer.roundEnd(PlayerHand, Table, DiscardPile);
    console.log(PlayDeck.showDeck());
    console.log(DiscardPile.showDiscardPile());
}

function mainTest2() {
    PlayDeck = new Deck(cardFactory());
    DiscardPile = new DiscardPile(discardPile = []);
    Table = new Table(tableCards = []);
    PlayerHand = new PlayerHand(playerHand = []);
    Dealer = new Dealer();
    Visuals = new Visuals();

    PlayDeck.shuffleDeck();
    Dealer.initialDeal(PlayDeck, PlayerHand);
    Visuals.playerHandInterface(PlayerHand);
    PlayerHand.showHand();

    Dealer.flop(PlayDeck, Table);
    Visuals.tableInterface(Table);
}

mainTest2()
