const handleEscClose = (e) => {
  if (e.key === "Escape" && document.querySelector(".popup_is-opened")) {
    console.log("попа");
    closeModal(e.target);
  }
};
const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  modal.focus();
  modal.addEventListener("keydown", handleEscClose);
};
const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  modal.removeEventListener("keydown", handleEscClose);
};
export { openModal, closeModal };