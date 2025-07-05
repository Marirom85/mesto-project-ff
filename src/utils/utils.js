// Универсальная функция управления текстом кнопки
export function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  button.textContent = isLoading ? loadingText : buttonText;
}

// Универсальная функция обработки сабмита формы
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

// Универсальная функция вставки карточки
export function renderCard(item, callbacks, container, method = "prepend") {
  const cardElement = callbacks.createCard(item, callbacks);
  container[method](cardElement);
}