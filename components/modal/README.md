# Modal

```html
<div class="modal-overlay">
    <div class="modal" id="success-modal">
        <button class="modal-close" onclick="closeModal()">
            <img id="close" src="assets/close.svg" alt="close button">
        </button>
        <div class="modal-content">
        </div>
    </div>
</div>
```

```html
<div class="modal-overlay" id="success-modal">
    <div class="modal">
        <button class="modal-close close-handler">
            <img id="close" src="assets/close.svg" alt="close button">
        </button>
        <div class="modal-content">
            <button class="my-button close-handler">Закрыть</button>
        </div>
    </div>
</div>
```

```
function initModal(modalOverlay) {
    const closeEl = modalOverlay.querySelector(.close-handler)
    const modalEl = modalOverlay.querySelector()
    ...
    closeEl.addEventListener(() => {
        modalEl.classList.toggle('open')
    })
}
```


TODO:
1 избавиться от closeModal в html, находить его через JS от корневого элемента модалки