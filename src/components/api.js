import { createRequest } from "../utils/request.js";

const baseUrl = "https://mesto.nomoreparties.co/v1/wff-cohort-41";
const request = createRequest(baseUrl);

class Api {
  constructor({ headers }) {
    this._headers = headers;
  }

  getUserInfo() {
    return request("/users/me", { headers: this._headers });
  }

  getInitialCards() {
    return request("/cards", { headers: this._headers });
  }

  updateUserInfo({ name, about }) {
    return request("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  }

  addCard({ name, link }) {
    return request("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return request(`/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  unlikeCard(cardId) {
    return request(`/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  updateAvatar({ avatar }) {
    return request("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
  }
}

const api = new Api({
  headers: {
    authorization: "9b711e70-0272-4e5c-944b-5407ffffd0b3",
    "Content-Type": "application/json",
  },
});

export default api;
