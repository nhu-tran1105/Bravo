document.addEventListener("DOMContentLoaded", () => {
    console.log("document succesfully loaded, baby");

    const randomDeckOfCards = makeDeckOfCards();
    console.log("random Deck: ", randomDeckOfCards);

    //todo: make 'em random 

    console.log(Math.floor(Math.random()*52)); 


    randomDeckOfCards.forEach((card) =>
        // document.getElementById('stackOfCards').append("index of the array = " + j + " & " + "avlue of the array =" + card + "<br>")
        document.getElementById('stackOfCards').append(card )
    
    );



    // document.getElementById('btnClicky').addEventListener('click', btnClicky); 
  }
 );

function makeDeckOfCards() {

    //make 52 cards, 4 suits, 13 per. 

    // var = ... let or const 
    // hard code array const deck = [[Kheart, qheart, jheark], [kspades, ... ]]

    const suits = ["♥️", "♠️", "♣️"];
    let deckOfCards = [];

    for (i = 1; i <= 13; i++) {

        //ex: fruits.forEach((fruit) => console.log(fruit));
        suits.forEach((suit) => {
            // console.log(suit, i);
            deckOfCards.push(suit + i);
        });

    }

    return deckOfCards;

}
