// Обработка ответа от fetch
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Функция для создания универсального запроса с базовым URL
export function createRequest(baseUrl) {
  return function request(endpoint, options) {
    return fetch(baseUrl + endpoint, options).then(checkResponse);
  };
}