const handleFormSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formObject = Object.fromEntries(formData.entries());
  resetForm(e.target);
  return formObject;
};

const resetForm = (form) => {
  form.reset();
};

const fillFormInputs = (inputsArray, dataArray) => {
  inputsArray.forEach((input, index) => {
    input.value = dataArray[index].textContent;
  });
};

const modalResetForm = (modal) => {
  const form = modal.querySelector(".popup__form");
  if (form) {


resetForm(form);
  }
};

export { fillFormInputs, resetForm, modalResetForm, handleFormSubmit };