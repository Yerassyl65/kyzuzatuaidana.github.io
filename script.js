document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    const button = document.getElementById('music-button');

    button.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            button.textContent = "Pause Music";
        } else {
            audio.pause();
            button.textContent = "Play Music";
        }
    });

    // Автоматическая прокрутка вниз после загрузки страницы
    setTimeout(function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }, 2000); // 2 секунды задержка перед началом прокрутки
});



const endDate = new Date("2024-08-27T18:00:00").getTime();

// Функция обновления обратного отсчета
function updateCountdown() {
    const now = new Date().getTime();
    const distance = endDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        days + "  :  " + hours + "  :  " + minutes + "  :  " + seconds ;

    // Если отсчёт завершён
    if (distance < 0) {
        clearInterval(interval);
        document.getElementById("countdown").innerHTML = "Той басталды";
    }
}

// Запуск обновления каждые секунды
const interval = setInterval(updateCountdown, 1000);

// Вызов функции один раз для начальной установки
updateCountdown();


const scriptURL = 'https://script.google.com/macros/s/AKfycbzQyfaVkalfHFy67OZWpn2pR8_-8kIJ7r8nDuP8nUlCbiTTilFqVub2SVfPsitqdJRT/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        console.log('Success!', response);
        document.getElementById("feedbackMessage").style.display = "block"; // показываем сообщение
    })
    .catch(error => console.error('Error!', error.message))
})

let index = 0;

function showSlide(i) {
  const slides = document.querySelectorAll('.gallery-wrapper img');
  const totalSlides = slides.length;

  if (i >= totalSlides) index = 0;
  if (i < 0) index = totalSlides - 1;

  const offset = -index * 100;
  document.querySelector('.gallery-wrapper').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  index++;
  showSlide(index);
}

function prevSlide() {
  index--;
  showSlide(index);
}

// Touch event listeners
let startX;

document.querySelector('.gallery').addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.querySelector('.gallery').addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX > endX + 50) nextSlide();
  if (startX < endX - 50) prevSlide();
});

showSlide(index);

document.addEventListener('DOMContentLoaded', function() {
  const slideInElements = document.querySelectorAll('.slide-in');
  
  function checkSlide() {
      slideInElements.forEach(slideInElement => {
          // Положение правой границы элемента
          const slideInAt = window.scrollX + window.innerWidth - slideInElement.offsetWidth / 2;
          // Положение левой границы элемента
          const elementRight = slideInElement.offsetLeft + slideInElement.offsetWidth;
          const isHalfShown = slideInAt > slideInElement.offsetLeft;
          const isNotScrolledPast = window.scrollX < elementRight;
          
          if (isHalfShown && isNotScrolledPast) {
              slideInElement.classList.add('active');
          } else {
              slideInElement.classList.remove('active');
          }
      });
  }
  
  // Вызов функции проверки при скролле и загрузке страницы
  window.addEventListener('scroll', checkSlide);
  window.addEventListener('resize', checkSlide);
  checkSlide();
});


document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Stop observing the target once it has become visible
          }
      });
  });

  boxes.forEach(box => {
      observer.observe(box);
  });
});