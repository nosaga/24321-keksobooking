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

  function hideSuccessMessage() {
    window.Data.successMessage.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', hideSuccessMessage);
  }

  function hideErrorMessage() {
    window.Data.errorMessage.classList.add('hidden');
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.Data.ESC_KEYCODE) {
      hideSuccessMessage();
    }
  }

  var showSuccessMessage = function () {
    window.Data.main.appendChild(window.Data.successMessage);
    window.Data.successMessage.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', hideSuccessMessage);
  };

  var showErrorMessage = function () {
    window.Data.main.appendChild(window.Data.errorMessage);
    window.Data.closeButton.addEventListener('click', function () {
      hideErrorMessage();
    });
    document.addEventListener('click', function () {
      hideErrorMessage();
    });
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

  window.Data.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    upload(new FormData(window.Data.form), onLoad, onError);
  });
})();

