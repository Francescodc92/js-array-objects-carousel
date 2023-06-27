/*
- bonus 1 Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l'immagine corrispondente.
- bonus 2 Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l'immagine attiva dovrà cambiare alla successiva.
  RAGIONAMENTO BASE: bonus 2
- al caricamento della pagina dovrà partire un interval che chiamerà la funzione che che serve a selezionare l'img successiva 

RAGIONAMENTO BASE: bonus 3


*/
/*-------------
DATA
------------- */
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, 
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, 
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    },
     {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, 
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];
/*-------------
Global variables
------------- */
const carouselContainer = document.querySelector(".img-container");
const thumbnailContainer = document.querySelector(".container-thumbnails");
let activeImg = 1
const prevArrow = document.querySelector('#left')
const nextArrow = document.querySelector('#right')

const createHTMLElement = (currentImage, index) => {
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("img-wrapper");
  
  let imgElement = `
    <img src="${currentImage.image}" class="img img_${index + 1}
  `
  if (index == 0) {
    imgElement += " active"
  }
  imgElement += ` alt="immagine ${index + 1}" />`


  carouselContainer.innerHTML += imgElement;
  const imageTitle = document.createElement('h3');
  imageTitle.innerHTML = currentImage.title;

  const imageDescription = document.createElement('p');
  imageDescription.innerHTML = currentImage.text;
  
  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container', `text_${index + 1}`);
  if(index == 0){
    textContainer.classList.add('active')
  };
  textContainer.append(imageTitle, imageDescription);
  
  carouselContainer.append(textContainer);

  imgWrapper.innerHTML += imgElement;
  thumbnailContainer.append(imgWrapper);
};

const selectPreviousElment = () => {
  const activeImgBox = document.querySelectorAll(".img_" + activeImg)
  const activeText = document.querySelector('.text_' + activeImg)


  activeImgBox.forEach((img) => {
    img.classList.remove("active")
  })
  activeText.classList.remove('active')

  if (activeImg == 1) {
    activeImg = images.length
  } else {
    activeImg--
  }
  const previousImgBox = document.querySelectorAll(".img_" + activeImg)
  const previousText = document.querySelector('.text_' + activeImg)

  
  previousImgBox.forEach((img) => {
    img.classList.add("active")
  })
  previousText.classList.add('active')
  
}

const selectNextElement = () => {
  const activeImgBox = document.querySelectorAll(".img_" + activeImg)
  const activeText = document.querySelector('.text_' + activeImg)


  activeImgBox.forEach((img) => {
    img.classList.remove("active")
  })
  activeText.classList.remove('active')

 if (activeImg == images.length) {
    activeImg = 1
  } else {
    activeImg++
  }
  const previousImgBox = document.querySelectorAll(".img_" + activeImg)
  const previousText = document.querySelector('.text_' + activeImg)

  
  previousImgBox.forEach((img) => {
    img.classList.add("active")
  })
  previousText.classList.add('active')
  
}

const startInterval = () => {
  const cangeImgInterval = setInterval(() => { 
    selectNextElement()
  }, 1000);
}

const sliderStart = () => {
  images.forEach((currentImage, index)=> {
    createHTMLElement(currentImage, index);
  });  
  startInterval()
}

sliderStart()
/*-------------
 events
--------------*/

prevArrow.addEventListener('click', selectPreviousElment)

nextArrow.addEventListener('click', selectNextElement)

