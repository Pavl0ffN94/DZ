document.addEventListener('DOMContentLoaded', function () {
  const closeModalButton = document.querySelector('.close-modal');
  const formElements = document.querySelector('.form');
  const modal = document.querySelector('.modal');

  function openModal(text) {
    const errorText = modal.querySelector('.error-text');
    errorText.textContent = text;
    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
  }

  function getFormData(event) {
    event.preventDefault();
    const values = {};

    formElements.childNodes.forEach(child => {
      if (child.nodeName === 'INPUT') {
        values[child.name] = child.value;
      }
    });

    // Проверка на заполнение полей "text" и "date"
    if (values['text'] === '') {
      openModal('Поле Имя должно быть заполнено.');
      return;
    }

    if (values['date'] === '') {
      openModal('Поле даты должно быть заполнено.');
      return;
    }

    // Проверка паролей
    const passwordField = values['pas'];
    const confirmPasswordField = values['pasConfirm'];

    if (passwordField.length < 8) {
      openModal('Пароль должен состоять не менее чем из 8 символов!');
      return;
    }

    if (passwordField !== confirmPasswordField) {
      openModal('Пароли должны совпадать!');
      return;
    }

    openModal('Форма успешно отправлена!');
    formElements.reset();
  }

  formElements.addEventListener('submit', getFormData);

  closeModalButton.addEventListener('click', closeModal);

  // Обработка нажатия на клавишу "Esc" для закрытия модального окна
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  // Закрытие модального окна при клике вне его области
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});
