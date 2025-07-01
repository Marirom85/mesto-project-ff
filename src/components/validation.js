const validationMessages = {
  namePlace: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
  required: 'Это обязательное поле.',
  nameLength: 'Должно быть от 2 до 40 символов.',
  descriptionLength: 'Должно быть от 2 до 200 символов.',
  placeLength: 'Должно быть от 2 до 30 символов.',
  invalidUrl: 'Введите корректный URL.',
};

const namePlaceRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

function setInputError(input, message, config) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.toggle(config.inputErrorClass, !!message);
  if (errorElement) {
    errorElement.textContent = message || '';
    errorElement.classList.toggle(config.errorClass, !!message);
  }
}

function validateInputField(input, config) {
  const value = input.value.trim();

  if (!value) {
    setInputError(input, validationMessages.required, config);
    return false;
  }

  // Проверяем для полей 'name' и 'namePlace' (если есть такое поле)
  if ((input.name === 'name' || input.name === 'namePlace') && !namePlaceRegex.test(value)) {
    setInputError(input, validationMessages.namePlace, config);
    return false;
  }

  if (input.name === 'name' || input.name === 'namePlace') {
    if (value.length < 2 || value.length > 40) {
      setInputError(input, validationMessages.nameLength, config);
      return false;
    }
  }

  if (input.name === 'description') {
    if (value.length < 2 || value.length > 200) {
      setInputError(input, validationMessages.descriptionLength, config);
      return false;
    }
  }

  if (input.name === 'link') {
    // Если в html используете type="url", можно использовать валидность браузера
    if (!input.validity.valid) {
      setInputError(input, validationMessages.invalidUrl, config);
      return false;
    }
  }

  setInputError(input, '', config);
  return true;
}

function hasInvalidInput(inputList, config) {
  return inputList.some(input => !validateInputField(input, config));
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList, config)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      validateInputField(inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(formElement => {
    formElement.setAttribute('novalidate', true);
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(input => setInputError(input, '', config));
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

export { enableValidation, clearValidation };


