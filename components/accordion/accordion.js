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
