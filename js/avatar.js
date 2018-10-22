'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'gif', 'jpeg', 'png'];
  var data = window.data;
  var fileChooser = data.form.elements.avatar;
  var preview = document.querySelector('.ad-form-header__preview').children[0];

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
