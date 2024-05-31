/**
 * 
 * @param {*} carousel — root element of carousel
 */
function initCarousel(carousel) {
    const slidesContainer = carousel.querySelector('.slides');
    const scrollContainer = slidesContainer
    const indicatorsContainer = carousel.querySelector('.indicators');
    const slides = Array.from(scrollContainer.children);
    let slideWidth = slides[0].getBoundingClientRect().width;

    // // Зафиксировать высоту scrollContainer
    const scrollContainerHeight = scrollContainer.clientHeight;
    scrollContainer.style.height = `${scrollContainerHeight}px`;

    let prevButton = carousel.querySelector('.prev');
    let nextButton = carousel.querySelector('.next');

    if (carousel.id) {
        const caruoselControls = document.querySelector(`[data-carousel-id=${carousel.id}]`)
        prevButton = caruoselControls.querySelector('.prev');
        nextButton = caruoselControls.querySelector('.next');
    }


    let indicators = carousel.querySelectorAll('.indicator');
    let slideStep = getSlideStep();
    let indicatorsCount = Math.ceil(slides.length / slideStep)
    let currentSlideIndex = 0;

    const mediaQueryIsMobile = window.matchMedia("(max-width: 1200px)");

    function refreshIndicators(event) {
        const isMobile = event.matches
        slideStep = isMobile ? 1 : getSlideStep();
        indicatorsCount = Math.ceil(slides.length / slideStep)
        createIndicators(indicatorsCount)
        indicators = carousel.querySelectorAll('.indicator'); // Обновляем массив индикаторов
    }

    // Функция для обновления видимости кнопок
    function updateButtonVisibility() {
        if (currentSlideIndex === 0) {
            prevButton.classList.remove('visible')
        } else {
            prevButton.classList.add('visible')
        }

        if (currentSlideIndex >= slides.length - slideStep) {
            nextButton.classList.remove('visible')
        } else {
            nextButton.classList.add('visible')
        }
    }

    // Добавляем слушателя на изменения
    mediaQueryIsMobile.addEventListener("change", refreshIndicators);
    refreshIndicators(mediaQueryIsMobile);
    updateButtonVisibility();


    // Функция для создания индикаторов
    function createIndicators(slidesToShow) {
        indicatorsContainer.innerHTML = ''; // Очищаем старые индикаторы

        // Создаем новые индикаторы в зависимости от количества видимых слайдов
        for (let i = 0; i < slidesToShow; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) {
                indicator.classList.add('active'); // Первый индикатор активный
            }
            indicator.addEventListener('click', () => {
                goToSlide(i * slideStep); // Переход к первому слайду в паре
            });
            indicatorsContainer.appendChild(indicator);
        }

        indicators = indicatorsContainer.querySelectorAll('.indicator'); // Обновляем массив индикаторов
    }

    // Функция для установки активного индикатора
    function setActiveIndicator(slideIndex) {
        indicators.forEach((indicator, i) => {
            if (i === Math.round(slideIndex / slideStep)) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Функция для перехода к конкретному слайду
    function goToSlide(slideIndex) {
        if (currentSlideIndex === slideIndex) return;
        currentSlideIndex = slideIndex;
        scrollContainer.scrollTo({ left: slideWidth * slideIndex, behavior: 'smooth' });
        updateButtonVisibility();
        // Не вызываем тут setActiveIndicator, т.к. есть обработчик событий на скролл 
        // и он вызывется автоматически при вызове scrollTo на scrollContainer
    }

    // Обработчики для кнопок "назад" и "вперед"
    prevButton.addEventListener('click', () => {
        const prevSlideIndex = Math.max(currentSlideIndex - slideStep, 0);
        goToSlide(prevSlideIndex);
    });

    nextButton.addEventListener('click', () => {
        const lastSlideIndex = slides.length - 1;
        const nextSlideIndex = Math.min(currentSlideIndex + slideStep, lastSlideIndex);
        goToSlide(nextSlideIndex);
    });

    // Обработчик для отслеживания прокрутки
    scrollContainer.addEventListener('scroll', () => {
        const newIndex = Math.round(scrollContainer.scrollLeft / slideWidth);
        if (newIndex !== currentSlideIndex) {
            currentSlideIndex = newIndex;
            setActiveIndicator(currentSlideIndex);
        }
    });

    /// НЕ ОТНОСИТСЯ К КАРУСЕЛИ

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
            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });

            // Обновляем индикаторы и текущий индекс
            createIndicators(visibleSlides / slideStep); // Создаем индикаторы для видимых слайдов
            currentSlideIndex = 0; // Начинаем с первого видимого слайда
            setActiveIndicator(currentSlideIndex);
        });
    });

    function getSlideStep() {
        if (slidesContainer.classList.contains('show-1')) return 1;
        if (slidesContainer.classList.contains('show-2')) return 2;
        if (slidesContainer.classList.contains('show-3')) return 3;
        if (slidesContainer.classList.contains('show-4')) return 4;
        if (slidesContainer.classList.contains('show-5')) return 5;
        return 1; // По умолчанию
    }
}

document.querySelectorAll('.carousel').forEach(function (carouselItem) {
    initCarousel(carouselItem);
})