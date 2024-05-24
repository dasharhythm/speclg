let overlay = document.querySelector('.modal-overlay');
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

    setTimeout(function callBack() { overlay.classList.toggle('active'); }, 0)

    const isActive = menuItems.classList.contains('active')
    if (!isActive) {
        setTimeout(function callBack() { overlay.classList.add('hidden') }, 300)

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