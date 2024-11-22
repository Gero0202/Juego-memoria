
const imagenes = [
    "./img/imagen1.jpg", "./img/imagen2.jpg", "./img/imagen3.jpg", "./img/imagen4.jpg",
    "./img/imagen5.jpg", "./img/imagen6.jpg", "./img/imagen7.jpg", "./img/imagen8.jpg"
]

const tablero = document.getElementById("game-board")
const reiniciarBoton = document.getElementById("reset-button")


let flippedCards = []
let cartasIguales = []

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5)
}

function crearTablero() {
    let imagenesDobles = [...imagenes, ...imagenes]
    let shuffledImagenes = shuffle(imagenesDobles)

    shuffledImagenes.forEach(src => {
        let card = document.createElement("div")
        card.classList.add("card")
        card.dataset.imagen = src

        let img = document.createElement("img")
        img.src = src
        card.appendChild(img)

        card.addEventListener("click", flipCard)
        tablero.appendChild(card)
    })
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped")
        flippedCards.push(this)

        if (flippedCards.length === 2) {
            checkForMatch()
        }
    }
}

function checkForMatch() {
    let [card1, card2] = flippedCards

    if (card1.dataset.imagen === card2.dataset.imagen) {
        cartasIguales.push(card1, card2)
        flippedCards = []

        if (cartasIguales.length === imagenes.length * 2) {
            setTimeout(() => alert("¡Ganaste!"), 500)
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped")
            card2.classList.remove("flipped")
            flippedCards = []
        }, 1000)
    }
}

function resetGame() {
    tablero.innerHTML = ''
    flippedCards = []
    cartasIguales = []
    crearTablero()
}

reiniciarBoton.addEventListener("click", resetGame)

crearTablero()
