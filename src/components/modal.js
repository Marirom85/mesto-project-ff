const handleEscClose = (e) => {
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
};

document.addEventListener("keydown", handleEscClose);
const openModal = (modal) => {
  if (!modal) return;
  modal.classList.add("popup_is-opened");
  if (!modal.hasAttribute("tabindex")) {
    modal.setAttribute("tabindex", "-1");
  }
  modal.focus();

};

const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove("popup_is-opened");

};

export { openModal, closeModal };