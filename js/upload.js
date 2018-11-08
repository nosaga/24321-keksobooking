'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking';

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open('POST', URL);
    xhr.send(data);
  };

  var hideSuccessMessage = function () {
    window.data.successMessage.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', hideSuccessMessage);
  }

  var hideErrorMessage = function () {
    window.data.errorMessage.classList.add('hidden');
    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('click', hideErrorMessage);
  }

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      hideSuccessMessage();
    }
  }

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      hideErrorMessage();
    }
  }

  var showSuccessMessage = function () {
    window.data.main.appendChild(window.data.successMessage);
    window.data.successMessage.classList.remove('hidden');
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', hideSuccessMessage);
  };

  var showErrorMessage = function () {
    window.data.main.appendChild(window.data.errorMessage);
    window.data.errorMessage.classList.remove('hidden');
    window.data.closeButton.addEventListener('click', hideErrorMessage);
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', hideErrorMessage);
  };

  var onSuccessUpload = function () {
    showSuccessMessage();
    window.map.deactivationHandler();
    window.pin.setPinCoords();
  };

  var onErrorUpload = function () {
    showErrorMessage();
  };

  var onLoad = function (xhr) {
    if (xhr.status === 200) {
      onSuccessUpload();
    } else {
      onErrorUpload();
    }
  };
  var onError = function (response) {
    throw new Error(response);
  };

  window.data.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    upload(new FormData(window.data.form), onLoad, onError);
  });
})();

