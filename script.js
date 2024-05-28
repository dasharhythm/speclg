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



//
//
// FORM
//

var form = document.getElementById("contact-form");

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
            openModal('success-modal');
            closeModal('form-modal');
        } else {
            response.json().then(data => {
                alert("Ошибка: " + (data.errors ? data.errors.map(error => error.message).join(", ") : "Произошла ошибка при отправке формы."));
            });
        }
    }).catch(error => {
        alert("Произошла ошибка при отправке формы.");
    });
}

form.addEventListener("submit", handleSubmit);

//<script>document.getElementById('Button').addEventListener('click', function() { ym(97420268, 'reachGoal', 'button_click');});</script>

