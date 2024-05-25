let overlay = document.querySelector('.modal-overlay');

if (overlay) {
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
}