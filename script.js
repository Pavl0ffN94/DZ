document.addEventListener('DOMContentLoaded', function () {

  const closeModalButton = document.getElementById('close-modal');
  const form = document.getElementById('form');
  
  function getFormData(event) {
    event.preventDefault();

    const text = document.getElementById('text');
    const date = document.getElementById('date');
    const pas = document.getElementById('pas');
    const pasConfirm = document.getElementById('pasConfirm');
    const color = document.getElementById('color');
    const colorDisplay = document.getElementById('colorDisplay');
    const check = document.getElementById('check');
    const modal = document.getElementById('modal');
    const isCheckbox = (type) => ['checkbox'].includes(type);

    const values = {
      text: text.value,
      date: date.value,
      pas: pas.value,
      pasConfirm: pasConfirm.value,
      color: color.value,
      check: check.checked,
    };

    const closeModalButton = document.getElementById('close-modal');
    closeModalButton.addEventListener('click', function () {
      const modal = document.getElementById('modal');
      modal.classList.remove('open');
    });

    const errors = []; 

    Object.keys(values).forEach((name) => {
      const value = values[name];
      const type = document.querySelector(`[name="${name}"]`).type;
      values[name] = isCheckbox(type) ? value : value.trim();

   
      if (value === '') {
        errors.push(`Поле "${name}" должно быть заполнено.`);
      }
    });
    

    function openModal(text) {
      const errorText = document.getElementById('errorText');
      errorText.textContent = text; 
      modal.classList.add('open');
    }
    function checkPassword() {
      const passwordField = document.querySelector('.form__input-pas');
      const confirmPasswordField = document.querySelector('.form__input-pas-confirm');

      if (passwordField.value.length < 8 ) {
        errors.push('Пароль должен состоять не менее чем из 8 символов!');
        return false;
      } if ( passwordField.value !== confirmPasswordField.value) {
        errors.push('Пароли должны совпадать!');
        return false;
      }
      return true;
    }

    if (checkPassword()) {
      openModal('Форма успешно отправлена!');
      form.reset();
      
      const errorElements = document.querySelectorAll('.error');
      errorElements.forEach((errorElement) => {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
      }); 
    } else {
      if (errors.length > 0) {
        const errorMessage = errors.join('\n');
        openModal(errorMessage);
      }
    }
  }

  form.addEventListener('submit', getFormData);

  closeModalButton.addEventListener('click', function () {
    const modal = document.getElementById('modal');
    modal.classList.remove('open');
  });
});