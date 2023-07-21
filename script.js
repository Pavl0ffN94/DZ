const isCheckbox = (type) => ['checkbox', 'radio'].includes(type);

const form = document.getElementById('form');

function getFormData(event) {
  event.preventDefault();

  const fields = document.querySelectorAll('input, select');

  const values = {};

  fields.forEach((field) => {
    const { name, value, type, checked } = field;
    values[name] = isCheckbox(type) ? checked : value;
  });

  function checkPassword() {
    const passwordField = form.querySelector('.form__input-pas');
    const confirmPasswordField = form.querySelector('.form__input-pas-confirm');
    
    if (passwordField.value.length < 8 || passwordField.value !== confirmPasswordField.value) {
      alert('Пароль должен состоять не менее чем из 8 символов и совпадать!');
      return false;
    }
    return true;
  }
  if (checkPassword()) {
    alert('Форма успешно отправлена!');
    form.reset();

    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach((errorElement) => {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    });
  } else {
    alert('Пожалуйста, заполните все поля и проверьте пароль!');
  }
}

form.addEventListener('submit', getFormData);
