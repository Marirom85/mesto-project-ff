
function handleEscClose(e) {
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

function openModal(modal) {
  if (!modal) return;

  modal.classList.add("popup_is-opened");
  modal.setAttribute("tabindex", "-1");
  modal.focus();

  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("popup_is-opened");
  modal.removeAttribute("tabindex");

  document.removeEventListener("keydown", handleEscClose);
}

export { openModal, closeModal };