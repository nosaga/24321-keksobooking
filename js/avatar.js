'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'gif', 'jpeg', 'png'];

  var data = window.data;
  var avatarChooser = data.form.elements.avatar;
  var avatarPreview = document.querySelector('.ad-form-header__preview').children[0];
  var photoChooser = data.form.elements.images;
  var photo = document.querySelector('.ad-form__photo');
  photo.insertAdjacentHTML('afterBegin', '<img src="img/muffin-grey.svg\" alt="фото объекта размещения" width="40" height="44">');
  setStyles(photo);
  var photoPreview = photo.children[0];
  avatarChooser.addEventListener('change', function () {
    setImageHandler(avatarChooser, avatarPreview);
  });

  photoChooser.addEventListener('change', function () {
    setImageHandler(photoChooser, photoPreview);
  })

  function setImageHandler(elem, preview) {
    var file = elem.files[0];
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
  }

  function setStyles(elem) {
    elem.style.display = 'flex';
    elem.style.alignItems = 'center';
    elem.style.justifyContent = 'center';
  }
})();
