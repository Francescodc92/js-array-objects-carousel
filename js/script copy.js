/*

DA ELIMINARE

Bonus 1
- 1 Aggiungere il ciclo infinito del carosello. Ovvero se è attiva la prima immagine e l'utente clicca la freccia per andare all'immagine precedente, dovrà comparire l'ultima immagine dell'array e viceversa.

RAGIONAMENTO BONUS 1
cambiare la variabile activeImg quando arriviamo alla fine e all'inizio della lista con il valore iniziale nel caso del next e il valore finale nel caso del previous

 Aggiungere la visualizzazione di tutte le thumbnails sulla destra dell'immagine grande attiva, come nello screenshot proposto. Tutte le miniature avranno un layer di opacità scura, tranne quella corrispondente all'immagine attiva, che invece avrà un bordo colorato.
  Al click delle frecce, oltre al cambio di immagine attiva, gestire il cambio di miniatura attiva.


*/

const imgElement = [
  "./img/01.webp",
  "./img/02.webp",
  "./img/03.webp",
  "./img/04.webp",
  "./img/05.webp",
 
]

const carouselContainer = document.querySelector(".img-container")
const thumbnailContainer = document.querySelector(".container-thumbnails")

imgElement.forEach((img, i) => {
  let imgElement = `
    <img src="${img}" class="img img_${i + 1}
  `

  if (i == 0) {
    imgElement += " active"
  }

  imgElement += ` alt="img" />`

  carouselContainer.innerHTML += imgElement

  const imgWrapper = document.createElement("div")
  imgWrapper.classList.add("img-wrapper")
  imgWrapper.innerHTML += imgElement
  thumbnailContainer.append(imgWrapper)
})

let activeImg = 1
const leftArrow = document.getElementById("left")
const rightArrow = document.getElementById("right")
let i = imgElement.length - 1

leftArrow.addEventListener("click", () => {
  const activeImgBox = document.querySelectorAll(".img_" + activeImg)

  activeImgBox.forEach((img) => {
    img.classList.remove("active")
  })

  if (activeImg == 1) {
    activeImg = imgElement.length
  } else {
    activeImg--
  }

  const previousImgBox = document.querySelectorAll(".img_" + activeImg)

  previousImgBox.forEach((img) => {
    img.classList.add("active")
  })
})

rightArrow.addEventListener("click", () => {
  const activeImgBox = document.querySelectorAll(".img_" + activeImg)
  activeImgBox.forEach((img) => {
    img.classList.remove("active")
  })

  if (activeImg == imgElement.length) {
    activeImg = 1
  } else {
    activeImg++
  }
  const nextImgBox = document.querySelectorAll(".img_" + activeImg)
  nextImgBox.forEach((img) => {
    img.classList.add("active")
  })
})
