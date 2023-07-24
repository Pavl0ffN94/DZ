document.addEventListener('DOMContentLoaded', function () {

  const closeModalButton = document.querySelector('.close-modal');
  const form = document.querySelector('.form');
  const modal = document.querySelector('.modal');
  console.log(modal);
  
  function getFormData(event) {
    event.preventDefault();

    const text = document.querySelector('.form__input-text');
    const pas = document.querySelector('.form__input-pas');
    const pasConfirm = document.querySelector('.form__input-pas-confirm');
    const colorDisplay = document.querySelector('colorDisplay');
 
    const isCheckbox = (type) => ['checkbox'].includes(type);
    const passwordField = document.querySelector('.form__input-pas');
    const confirmPasswordField = document.querySelector('.form__input-pas-confirm');
    const errorText = document.getElementById('errorText');

    const values = {
      text: text.value,
      pas: pas.value,
      pasConfirm: pasConfirm.value,
    };

    closeModalButton.addEventListener('click', function () {
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
      errorText.textContent = text; 
      modal.classList.add('open');
    }
    function checkPassword() {
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
    modal.classList.remove('.open');
  });
});
