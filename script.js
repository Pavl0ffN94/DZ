document.addEventListener('DOMContentLoaded', function () {
  const closeModalButton = document.querySelector('.clos-modal');
  const formElements = document.querySelector('.form');
  const modal = document.querySelector('.modal');

  function showModal(text) {
    const errorText = modal.querySelector('.error-text');
    errorText.textContent = text;
    modal.classList.add('opend');
  }

  function closeModal() {
    modal.classList.remove('opend');
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
    if (values['name'] === '') {
      showModal('Поле Имя должно быть заполнено.');
      return;
    }

    if (values['date'] === '') {
      showModal('Поле даты должно быть заполнено.');
      return;
    }

    // Проверка паролей
    const passwordField = values['pas'];
    const confirmPasswordField = values['confirmPas'];

    if (passwordField.length < 8) {
      showModal('Пароль должен состоять не менее чем из 8 символов!');
      return;
    }

    if (passwordField !== confirmPasswordField) {
      showModal('Пароли должны совпадать!');
      return;
    }

    showModal('Форма успешно отправлена!');
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
});
