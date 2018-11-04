'use strict';
(function () {

  var main = document.querySelector('main');
  var form = document.querySelector('.ad-form');
  var formReset = document.querySelector('.ad-form__reset');
  var adsDialog = document.querySelector('.map');
  var formFields = document.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');
  var formAddress = form.elements.address;
  var mapPins = adsDialog.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var successBlock = document.querySelector('#success');
  var successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorMessage = document.querySelector('#error')
    .content
    .querySelector('.error');
  var closeButton = document.querySelector('#error')
    .content
    .querySelector('.error__button');
  var adsBar = adsDialog.querySelector('.map__filters-container');
  var adsTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var photosTile = document.querySelector('#card')
    .content
    .querySelector('.popup__photos');
  var photosTemplate = photosTile
    .querySelector('.popup__photo');
  var TypeItems = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var CheckInItems = ['12:00', '13:00', '14:00'];
  var CheckOutItems = CheckInItems;
  var FeaturesItems = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PinHeight = 70;
  var PinWidth = 50;
  var MainPinHeight = 87;
  var MainPinWidth = 65;
  var MAIN_PIN_COORDS_X = 570;
  var MAIN_PIN_COORDS_Y = 375;
  var ESC_KEYCODE = 27;
  window.Data = {
    main: main,
    form: form,
    adsDialog: adsDialog,
    formFields: formFields,
    mapPinMain: mapPinMain,
    formAddress: formAddress,
    mapPins: mapPins,
    mapPinTemplate: mapPinTemplate,
    adsBar: adsBar,
    adsTemplate: adsTemplate,
    photosTile: photosTile,
    photosTemplate: photosTemplate,
    TypeItems: TypeItems,
    CheckInItems: CheckInItems,
    CheckOutItems: CheckOutItems,
    FeaturesItems: FeaturesItems,
    PinHeight: PinHeight,
    PinWidth: PinWidth,
    MainPinHeight: MainPinHeight,
    MainPinWidth: MainPinWidth,
    ESC_KEYCODE: ESC_KEYCODE,
    MAIN_PIN_COORDS_X: MAIN_PIN_COORDS_X,
    MAIN_PIN_COORDS_Y: MAIN_PIN_COORDS_Y,
    successMessage: successMessage,
    errorMessage: errorMessage,
    closeButton: closeButton,
    formReset: formReset,
    successBlock: successBlock,
    mapOverlay: mapOverlay,
  };
})();
