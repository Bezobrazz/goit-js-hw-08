import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
let inputEmail = form.elements.email;
let inputMessage = form.elements.message;

inputEmail.addEventListener('input', onInputHandler);
inputMessage.addEventListener('input', onInputHandler);

function onInputHandler(e) {
  const inputName = e.target.name;
  const inputValue = e.target.value;
  const localStorageKey = `feedback-form-state-${inputName}`;

  const updateInputTime = throttle(() => {
    localStorage.setItem(localStorageKey, inputValue);
  }, 500);
  updateInputTime();
}

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();

  const inputsValuesObj = {
    email: inputEmail.value,
    message: inputMessage.value,
  };

  inputEmail.value = '';
  inputMessage.value = '';

  localStorage.clear();

  console.log(inputsValuesObj);
}

function fillFormFields() {
  const emailLocalStorageKey = 'feedback-form-state-email';
  const messageLocalStorageKey = 'feedback-form-state-message';

  const savedEmail = localStorage.getItem(emailLocalStorageKey);
  const savedMessage = localStorage.getItem(messageLocalStorageKey);

  if (savedEmail !== null) {
    inputEmail.value = savedEmail;
  }
  if (savedMessage !== null) {
    inputMessage.value = savedMessage;
  }
}
document.addEventListener('DOMContentLoaded', fillFormFields);
