const carousel = document.querySelector('.carousel');
const slides = Array.from(carousel.children);
let slideWidth = slides[0].getBoundingClientRect().width;


let prevButton = carousel.querySelector('.prev');
let nextButton = carousel.querySelector('.next');

if (carousel.id) {
    const caruoselControls = document.querySelector(`[data-carousel-id=${carousel.id}]`)
    prevButton = caruoselControls.querySelector('.prev');
    nextButton = caruoselControls.querySelector('.next');
}


let indicators = document.querySelectorAll('.indicator');
let slideSize = 2; // По умолчанию считаем, что на декстопе

const mediaQueryIsMobile = window.matchMedia("(max-width: 1200px)");

function refreshIndicators(event) {
    const isMobile = event.matches
    slideSize = isMobile ? 1 : 2;
    createIndicators(slides.length / slideSize)
    indicators = document.querySelectorAll('.indicator'); // Обновляем массив индикаторов

}

// Добавляем слушателя на изменения
mediaQueryIsMobile.addEventListener("change", refreshIndicators);
refreshIndicators(mediaQueryIsMobile);

// Текущий индекс
let currentIndex = 0;


// Функция для создания индикаторов
function createIndicators(slidesToShow) {
    const indicatorContainer = document.querySelector('.indicators');
    indicatorContainer.innerHTML = ''; // Очищаем старые индикаторы

    // Создаем новые индикаторы в зависимости от количества видимых слайдов
    for (let i = 0; i < slidesToShow; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) {
            indicator.classList.add('active'); // Первый индикатор активный
        }
        indicator.addEventListener('click', () => {
            goToSlide(i * slideSize); // Переход к первому слайду в паре
        });
        indicatorContainer.appendChild(indicator);
    }

    indicators = document.querySelectorAll('.indicator'); // Обновляем массив индикаторов
}

// Функция для установки активного индикатора
function setActiveIndicator(index) {
    indicators.forEach((indicator, i) => {
        if (i === Math.floor(index / slideSize)) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Функция для перехода к конкретному слайду
function goToSlide(index) {
    currentIndex = index;
    carousel.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
    setActiveIndicator(currentIndex);
}

// Обработчики для кнопок "назад" и "вперед"
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        goToSlide(Math.max(currentIndex - slideSize, 0));
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - slideSize) {
        goToSlide(Math.min(currentIndex + slideSize, slides.length - slideSize));
    }
});

// Обработчик для отслеживания прокрутки
carousel.addEventListener('scroll', () => {
    const newIndex = Math.floor(carousel.scrollLeft / slideWidth);
    if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        setActiveIndicator(currentIndex);
    }
});

/// 

// Фильтрация по тегам и создание новых индикаторов
document.querySelectorAll('.tag').forEach((btn) => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter; // Получаем фильтр

        let visibleSlides = 0; // Считаем видимые слайды
        slides.forEach((slide) => {
            if (filter === 'all' || slide.classList.contains(filter)) {
                slide.classList.add('show');
                visibleSlides++; // Увеличиваем счетчик видимых слайдов
            } else {
                slide.classList.remove('show');
            }
        });

        // Прокручиваем карусель в начало
        carousel.scrollTo({ left: 0, behavior: 'smooth' });

        // Обновляем индикаторы и текущий индекс
        createIndicators(visibleSlides / slideSize); // Создаем индикаторы для видимых слайдов
        currentIndex = 0; // Начинаем с первого видимого слайда
        setActiveIndicator(currentIndex);
    });
});

