/*
- bonus 1 Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l'immagine corrispondente.

- bonus 2 Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l'immagine attiva dovrà cambiare alla successiva.

- bonus 3 Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
  RAGIONAMENTO BASE: bonus 2
- al caricamento della pagina dovrà partire un interval che chiamerà la funzione che che serve a selezionare l'img successiva 

RAGIONAMENTO BASE: bonus 3
1 aggiungere un bottone all'html al click del quale l'interval si stopperà e quindi le img smetteranno di scorrere, al secondo click l'intervallo partirà facendo scorrere di nuovo le img
  - creare una variabile che controlla l'intervallo , se questa variabile è vera l'intervallo partirà altrimenti si stopperà 

2 aggiungere un nuovo bottone che regolerà l'andamento dello slider 
  - creare una variabile che decida l'andamento , se la variabile e vera l'intervallo chiamerà la funzione per andare avanti altrimenti quella per andare indietro
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
const prevArrow = document.querySelector('#left');
const nextArrow = document.querySelector('#right');
const pouseStartButton = document.getElementById('pouse-start-interval');
const cangeDirectionbutton = document.getElementById('cange-direction')
let activeImg = 1;
let autoplayStatus = false;
let cangeImgInterval;
let isDirectionNext = true;

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
  
};

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
  
};

const startInterval = (isDirectionNext) => {
  autoplayStatus = !autoplayStatus;
  clearInterval(cangeImgInterval)
  cangeImgInterval = setInterval(() => { 
    if(isDirectionNext){
      selectNextElement();
    }else {
      selectPreviousElment();
    }
  }, 3000);
  
}

const cangeDirectionSlide = () =>{
  isDirectionNext = !isDirectionNext
  startInterval(isDirectionNext)
}

const sliderStart = () => {
  images.forEach((currentImage, index)=> {
    createHTMLElement(currentImage, index);
  });  
  startInterval(isDirectionNext)
};

sliderStart();
/*-------------
 events
--------------*/

prevArrow.addEventListener('click', selectPreviousElment)
nextArrow.addEventListener('click', selectNextElement)
pouseStartButton.addEventListener('click', ()=> {
  if(autoplayStatus) {
    autoplayStatus = !autoplayStatus
    clearInterval(cangeImgInterval)
    pouseStartButton.innerHTML = '<i class="fa-regular fa-circle-play"></i>'
  }else{
    startInterval(isDirectionNext)
    pouseStartButton.innerHTML = '<i class="fa-regular fa-circle-pause"></i>'
  }
})
cangeDirectionbutton.addEventListener('click', cangeDirectionSlide)
