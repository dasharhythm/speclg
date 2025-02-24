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

// Получаем все кнопки
const buttons = document.querySelectorAll('button');

// Перебираем каждую кнопку и добавляем обработчик событий
buttons.forEach((button) => {
    const metrikaId = button.dataset.metrika;
    if (metrikaId) {
        // добавляем ниже отдельно, тут ничего не делаем
    } else {
        button.addEventListener('click', function() {
            ym(97456114, 'reachGoal', 'button_click');
        });
    }
});


// Фильтрация по тегам и создание новых индикаторов
document.querySelectorAll('.tag').forEach((btn) => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter; // Получаем фильтр

        filterSlides('carousel-reviews', filter);
    });
});

document.querySelectorAll('[data-metrika]').forEach(button => {
    const metrikaId = button.dataset.metrika;
    ym(97456114,'reachGoal', metrikaId)
})

