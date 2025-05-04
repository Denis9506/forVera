  const photos = [
    { src: 'img/1.jpg', text: 'Ты как весна — нежная, светлая и неповторимая.' },
    { src: 'img/2.jpg', text: 'Твоя улыбка — мой свет.' },
    { src: 'img/3.jpg', text: 'Настоящая красотка, которую я люблю всем сердцем!' },
    { src: 'img/4.jpg', text: 'Весёлая, смешная, забавная! То что нужно! Так держать.' },
    { src: 'img/5.jpg', text: 'Ты смотришься так нежно и приятно, будто солнышко в радостный день.' },
    { src: 'img/6.jpg', text: 'Умница, отличница, ответственная и пунктуальная! Гордость моя и своей семьи!' },
    { src: 'img/7.jpg', text: 'Ты настолько яркая, что невозможно тебя забыть и потерять!' },
    { src: 'img/8.jpg', text: 'Милашкаааааа!!! Невозможно удержаться от такого взгляда...' },
    { src: 'img/9.jpg', text: 'Красота во всём! Уплыву с тобой за край мира!' },
    { src: 'img/10.jpg', text: 'Смех и радость ты несёшь!😂😂😂' },
    { src: 'img/11.jpg', text: 'Роскошь и элегантность! Не избавиться от мыслей как ты смотришься...😍😍😍' },
    { src: 'img/12.jpg', text: 'Бусиииинннкааа!!! Твой взор меня манит.' },
    { src: 'img/13.jpg', text: 'Королева! Госпожа! Богиня!💫💫💫' },
    { src: 'img/14.jpg', text: 'Какая же ты всё-таки нежная и красочная!' },
    { src: 'img/15.jpg', text: 'Люблю каждое мгновение рядом с тобой.' },
  ];
  let currentIndex = 0;

  // Генерация галереи
  const galleryContainer = document.getElementById("galleryContainer");
  photos.forEach((photo, index) => {
    const div = document.createElement("div");
    div.className = "photo";
    div.onclick = () => showPhoto(index);
    div.innerHTML = `<img src="${photo.src}" alt="Фото ${index + 1}" />`;
    galleryContainer.appendChild(div);
  });

  function showPhoto(index) {
    currentIndex = index;
    updatePhotoModal();
    openModal("photoModal");
  }

  function updatePhotoModal() {
    const photo = photos[currentIndex];
    const img = document.getElementById("largePhoto");
    const text = document.getElementById("photoText");

    const content = document.getElementById("photoModalContent");
    content.classList.remove("fade");
    void content.offsetWidth; // сброс анимации
    content.classList.add("fade");

    img.src = photo.src;
    text.textContent = photo.text;
  }

  function changePhoto(direction) {
    currentIndex = (currentIndex + direction + photos.length) % photos.length;
    updatePhotoModal();
  }

  function openModal(id) {
    document.getElementById(id).classList.add("show");
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    const content = modal.querySelector(".modal-content");
  
    modal.classList.add("fade-out");
  
    content.addEventListener("animationend", function handler() {
      modal.classList.remove("show", "fade-out");
      content.removeEventListener("animationend", handler);
    });
  }

  function copyCode() {
    const codeText = document.getElementById("secretCode").innerText;
    const match = codeText.match(/Секретный код\s*:? (.+)/i);
    const codeOnly = match ? match[1] : "";
  
    navigator.clipboard.writeText(codeOnly)
      .then(() => {
        const overlay = document.getElementById("copyOverlay");
        overlay.classList.add("show");
        setTimeout(() => overlay.classList.remove("show"), 300);
      })
      .catch(err => alert("Ошибка при копировании"));
  }
  
  document.addEventListener("wheel", function (event) {
    const direction = event.deltaY > 0 ? 1 : -1;
    scrollBySection(direction);
    event.preventDefault();
  }, { passive: false });

  
  document.addEventListener('wheel', function (event) {
    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;

    if (event.deltaY > 0) {
      window.scrollTo({ top: scrollY + sectionHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: scrollY - sectionHeight, behavior: 'smooth' });
    }

    event.preventDefault();
  }, { passive: false });


  let currentSection = 0;
const sections = document.querySelectorAll(".section");

function scrollBySection(direction) {
  const newIndex = currentSection + direction;
  const sectionHeight = window.innerHeight;
  if (newIndex < 0 || newIndex >= sections.length) return;
  if (direction > 0) {
    window.scrollTo({ top: 0 + sectionHeight, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0 - sectionHeight, behavior: 'smooth' });
  }
  sections[currentSection].classList.remove("active");
  sections[newIndex].classList.add("active");
  currentSection = newIndex;
}

let touchStartY = 0;
let touchEndY = 0;

document.addEventListener("touchstart", (event) => {
  if (event.target.closest(".photo")) {
    return; 
  }

  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", (event) => {

  if (event.target.closest(".photo")) {
    return;
  }

  touchEndY = event.changedTouches[0].clientY;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50; 

  const deltaY = touchStartY - touchEndY;
  if (Math.abs(deltaY) > swipeThreshold) {
    if (deltaY > 0) {
      scrollBySection(1);
    } else {
      scrollBySection(-1);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
    sections[0].classList.add("active");
  });
  