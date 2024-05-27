let previousScrollPosition = 0; // Переменная для хранения позиции прокрутки

function openModal(modalId) {
    const overlay = document.querySelector('#' + modalId);
    previousScrollPosition = window.scrollY; // Сохраняем позицию прокрутки
    document.body.style.overflow = "hidden"; // Отключаем прокрутку
    overlay.style.display = 'flex'; // Показываем модалку
}

function closeModal(modalId) {
    const overlay = document.querySelector('#' + modalId);
    document.body.style.overflow = "auto"; // Включаем прокрутку
    window.scrollTo(0, previousScrollPosition); // Возвращаем позицию прокрутки
    overlay.style.display = 'none'; // Скрываем модалку
}


function initModal(overlay) {
    const modalId = overlay.id;
    console.log('modalId')

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) { // Если клик был на оверлей, закрыть модалку
            closeModal(), closeSuccessModal();
        }
    });

    overlay.querySelectorAll('.x').forEach(function (el) {
        el.addEventListener('click', function () {
            closeModal(modalId);
        })
    });
}

document.querySelectorAll('.modal-overlay').forEach(function (modalItem) {
    initModal(modalItem);
})
