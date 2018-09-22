'use strict';
var checkString = function (objectParam, elem, adKey) {
  if (objectParam === ' ' || typeof (objectParam) !== 'string') {
    elem.remove();
  } else {
    elem.innderHTML = adKey;
  }
};

var checkStrings = function (objectParamOne, objectParamTwo, elem, adKey) {
  if ((objectParamOne === ' ' || objectParamTwo === ' ') || (typeof (objectParamOne) !== 'string' || typeof (objectParamTwo) !== 'string')) {
    elem.remove();
  } else {
    elem.innderHTML = adKey;
  }
};

var checkNumber = function (objectParam, elem, adKey) {
  if (isNaN(objectParam)) {
    elem.remove();
  } else {
    elem.innderHTML = adKey;
  }
};

var checkNumbers = function (objectParamOne, objectParamTwo, elem, adKey) {
  if (isNaN(objectParamOne) || isNaN(objectParamTwo)) {
    elem.remove();
  } else {
    elem.innderHTML = adKey;
  }
};

var checkArray = function (objectParam, elem, adKey) {
  if (!(Array.isArray(objectParam))) {
    elem.remove();
  } else {
    elem.innderHTML = adKey;
  }
};

var checkData = function (obj, elem) {
  checkString(obj.offer.title, elem.querySelector('.popup__title'), obj.offer.title);
  checkString(obj.offer.address, elem.querySelector('.popup__text--address'), obj.offer.objdress);
  checkString(obj.offer.type, elem.querySelector('.popup__type'), obj.offer.type);
  checkNumber(obj.offer.price, elem.querySelector('.popup__text--price'), obj.offer.price);
  checkNumbers(obj.offer.rooms, obj.offer.guests, elem.querySelector('.popup__text--capacity'), (obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей'));
  checkStrings(obj.offer.checkin, obj.offer.checkout, elem.querySelector('.popup__text--time'), 'Заезд после ' + obj.offer.checkin + ' выезд до ' + obj.offer.checkout);
  checkString(obj.offer.features, elem.querySelector('.popup__features'), obj.offer.features);
  checkString(obj.offer.description, elem.querySelector('.popup__description'), obj.offer.description);
  checkString(obj.author.avatar, elem.querySelector('.popup__avatar'), obj.author.avatar);
  checkArray(obj.offer.photos, elem.querySelector('.popup__photos'), obj.offer.photos);
};
