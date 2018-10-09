'use strict';
window.load = function (url, onLoad, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onLoad(xhr.response);
    } else {
      onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = 10000;

  xhr.open('GET', url);
  xhr.send();
};

var onError = function (message) {
  return message;
};

var onLoad = function (data) {
  window.render.ads = data;
  window.getSimilar(window.render.ads);
  window.getSimilarType(window.render.ads);
  window.updateCard();
  for (var i = 0; i < window.render.ads.length; i++) {
    window.pin.renderPins(i);
  }
};

window.load('https://js.dump.academy/keksobooking/data', onLoad, onError);


/* form upload*/

var URL = 'https://js.dump.academy/keksobooking';

window.upload = function (data, onSuccess, onBadData) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    onSuccess(xhr);
  });

  xhr.addEventListener('error', function () {
    onBadData('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onBadData('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = 10000;
  xhr.open('POST', URL);
  xhr.send(data);
};

function hideSuccessMessage() {
  window.data.successMessage.classList.add('hidden');
  document.removeEventListener('keydown', escPress);
}

function hideErrorMessage() {
  window.data.errorMessage.classList.add('hidden');
}

function escPress(evt) {
  if (evt.keyCode === window.data.ESC_KEYCODE) {
    hideSuccessMessage();
  }
}

var showSuccessMessage = function () {
  window.data.main.appendChild(window.data.successMessage);
  document.addEventListener('keydown', escPress);
  document.addEventListener('click', function () {
    hideSuccessMessage();
  });
};

var showErrorMessage = function () {
  window.data.main.appendChild(window.data.errorMessage);
  window.data.closeButton.addEventListener('click', function () {
    hideErrorMessage();
  });
  document.addEventListener('click', function () {
    hideErrorMessage();
  });
};

var onSuccessUpload = function () {
  showSuccessMessage();
  window.map.mapDeactivationHandler();
};

var onErrorUpload = function () {
  showErrorMessage();
};

window.data.form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  window.upload(new FormData(window.data.form), function (xhr) {
    if (xhr.status === 200) {
      onSuccessUpload();
    } else {
      onErrorUpload();
    }
  });
});
