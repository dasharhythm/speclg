let overlay = document.querySelector('.modal-overlay');

if (overlay) {
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) { // Если клик был на оверлей, закрыть модалку
            closeModal(), closeSuccessModal();
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

    function closeSuccessModal() {
        document.body.style.overflow = "auto"; // Включаем прокрутку
        window.scrollTo(0, previousScrollPosition); // Возвращаем позицию прокрутки
        overlay.style.display = 'none'; // Скрываем модалку
    }

}

var form = document.getElementById("contact-form");
var successModal = document.getElementById("success-modal");

async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.reset();
            showSuccessModal();
        } else {
            response.json().then(data => {
                alert("Ошибка: " + (data.errors ? data.errors.map(error => error.message).join(", ") : "Произошла ошибка при отправке формы."));
            });
        }
    }).catch(error => {
        alert("Произошла ошибка при отправке формы.");
    });
}

function showSuccessModal() {
    var formModal = document.querySelector('.modal');
    formModal.classList.add('hidden');
    successModal.classList.remove('hidden');
}

function closeSuccessModal() {
    successModal.classList.add('hidden');
}

form.addEventListener("submit", handleSubmit);


