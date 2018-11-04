'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'gif', 'jpeg', 'png'];
  var data = window.data;
  var fileChooser = data.form.elements.images;
  var photo = document.querySelector('.ad-form__photo');
  photo.insertAdjacentHTML('afterBegin', '<img src="img/muffin-grey.svg\" alt="фото объекта размещения" width="40" height="44">');
 /* var img = document.createElement('img');
  img.innerHTML = '<img src="" alt="фото объекта размещения" width="40" height="44">'
  img.setAttribute('src', 'img/muffin-grey.svg');*/
  var preview = photo.children[0];
  console.log(preview);


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
        console.log(preview.src);
      });

      reader.readAsDataURL(file);
    }
  });
})();
