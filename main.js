const ulDom = document.querySelector("#cards")

let numberOfClicked = 0;
let card1Data = null;
let card2Data = null;
let card1 = null;
let card2 = null;
let cardsArray = []

function handleClick(event) {

    let card = event.target.closest(".card")

    numberOfClicked++
    if (numberOfClicked === 1) {
        // Hvis det er sandt, at det er kort-1 som der blevet klikket på 
        // og at dette kort ikke indeholder klassen "done"
        // så fjerne klassen "show"
        if (card1 && !card1.classList.contains("done")) {
            card1.classList.remove("show")
        }
        if (card2 && !card2.classList.contains("done")) {
            card2.classList.remove("show")
        }
        card1 = card
        card1.classList.add("show")
    }
    if (numberOfClicked === 2) {
        card2 = card
        card2.classList.add("show")

        if (card1 != card2) {
            card1Data = card1.getAttribute("data-card")
            card2Data = card2.getAttribute("data-card")
            if (card1Data == card2Data) {
                card1.classList.add("done")
                card2.classList.add("done")
                card1.removeEventListener("click", handleClick)
                card2.removeEventListener("click", handleClick)
            }
        }
        numberOfClicked = 0
    }
}

function createCards(numberOfCards) {
    for (let increment = 0; increment < numberOfCards; increment++) {
        const myHtml = `<li class="card" data-card=${increment}><span class="front">Card</span><span class="back"> ${increment}</span></li>`
        const myHtml2 = `<li class="card" data-card=${increment}><span class="front">Card</span><span class="back"> ${increment}</span></li>`

        cardsArray.push(myHtml)
        cardsArray.push(myHtml2)

    }
    let shuffleCardsArray = _.shuffle(cardsArray)

    insetCard(shuffleCardsArray)
}

function insetCard(shuffleCardsArray) {
    shuffleCardsArray.forEach(element => {
        ulDom.insertAdjacentHTML("beforeend", element)
        let cardDom = ulDom.querySelector(".card:last-of-type");
        addClickEvent(cardDom)
    });
}
function addClickEvent(card) {
    card.addEventListener("click", handleClick)
}

createCards(4)