

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
        setTimeout(function callBack() { overlay.classList.add('hidden') }, 400)
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
