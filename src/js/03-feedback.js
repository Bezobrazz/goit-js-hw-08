import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
let inputEmail = form.elements.email;
let inputMessage = form.elements.message;

inputEmail.addEventListener('input', onInputHandler);
inputMessage.addEventListener('input', onInputHandler);
const localStorageKey = 'feedback-form-state';

function onInputHandler(e) {
  const { name, value } = e.target;

  const storedData = JSON.parse(localStorage.getItem(localStorageKey)) || {};

  storedData[name] = value;

  const updateInputTime = throttle(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(storedData));
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

  localStorage.removeItem(localStorageKey);

  console.log(inputsValuesObj);
}

function fillFormFields() {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey));

  if (savedData) {
    inputEmail.value = savedData.email || '';
    inputMessage.value = savedData.message || '';
  }
}

document.addEventListener('DOMContentLoaded', fillFormFields);
