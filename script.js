const carousel = document.querySelector('.carousel');
const slides = Array.from(carousel.children);
let slideWidth = slides[0].getBoundingClientRect().width;

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let indicators = document.querySelectorAll('.indicator');
let slideSize = 2; // По умолчанию считаем, что на декстопе

const mediaQueryIsMobile = window.matchMedia("(max-width: 600px)");

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


var overlay = document.querySelector('.modal-overlay');
overlay.addEventListener("click", function (event) {
    if (event.target === overlay) { // Если клик был на оверлей, закрыть модалку
        closeModal();
    }
});


let previousScrollPosition = 0; // Переменная для хранения позиции прокрутки

function openModal() {
    previousScrollPosition = window.scrollY; // Сохраняем позицию прокрутки
    document.body.style.overflow = "hidden"; // Отключаем прокрутку
    overlay.style.display = 'flex'; // Показываем модалку
}

function closeModal() {
    document.body.style.overflow = "auto"; // Включаем прокрутку
    window.scrollTo(0, previousScrollPosition); // Возвращаем позицию прокрутки
    overlay.style.display = 'none'; // Скрываем модалку
}


function goToLink(url) {
    window.open(url, '_blank');
}


function toggleMenu() {
    const menuItems = document.querySelector('.menu-items');
    const overlay = document.querySelector('.overlay');
    const menuToggle = document.querySelector('.menu-toggle');
    menuItems.classList.toggle('active');
    overlay.classList.remove('hidden');

    setTimeout(function callBack (){ overlay.classList.toggle('active');},0) 

    const isActive = menuItems.classList.contains('active')
    if (!isActive) {
        setTimeout(function callBack (){overlay.classList.add('hidden')},300) 
        
    }
}



// Находим все заголовки аккордеона
const accordionTitles = document.querySelectorAll('.accordion-title');

// Добавляем обработчик клика для каждого заголовка
accordionTitles.forEach((title) => {
    title.addEventListener('click', () => {
        // Получаем родительский элемент (секцию аккордеона)
        const section = title.parentElement;
        
        // Переключаем класс 'open' для открытия/закрытия контента
        section.classList.toggle('open');
    });
});

document.querySelectorAll('.accordion-title').forEach((header) => {
    header.addEventListener('click', () => {
        header.classList.toggle('open');
    });
});