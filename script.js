const firstNameField = $('#first-name');
const lastNameField = $('#last-name');
const emailField = $('#email');
const passwordField = $('#password');
const confirmPasswordField = $('#confirm-password');
const allFields = $('#first-name, #last-name, #email, #password, #confirm-password');

$.fn.setValidators = function(validators) {
  this.validators = validators;
  return this;
}

$.fn.validate = function() {
  if (Array.isArray(this.validators)) {
    this.validators.forEach(validator => validator.apply(this, validator.arguments));
  }
  return this;
}

firstNameField.setValidators([
  requiredValidator,
  function() {
    maxLengthValidator.call(firstNameField, 10);
  }
]);

lastNameField.setValidators([
  requiredValidator,
  function() {
    maxLengthValidator.call(lastNameField, 10);
  }
]);

emailField.setValidators([emailValidator, requiredValidator]);

passwordField.setValidators([
  passwordValidator,
  function() {
    theSameValidator.call(passwordField, confirmPasswordField);
  },
  requiredValidator
]);

confirmPasswordField.setValidators([requiredValidator]);

$('#form').submit(function (e) {
  e.preventDefault();

  firstNameField.validate();
  lastNameField.validate();
  emailField.validate();
  passwordField.validate();
  confirmPasswordField.validate();
});

allFields.focus(function () {
  $(this).tooltip('dispose');
});

function requiredValidator() {
  const title = 'Это поле обязательное для заполнения';

  if (!this.val()) {
    setTooltipWithTitleAndShow(this, title);
  }
}

function emailValidator() {
  const emailRegexp = /^.+[^\.]\@.+[^\.]$/;
  const title = 'Неверный формат email';

  if (!emailRegexp.exec(this.val())) {
    setTooltipWithTitleAndShow(this, title);
  }
}

function maxLengthValidator(maxlength) {
  const title = 'Длина поля не должна превышать ' + maxlength + ' символов';

  if (this.val().length > maxlength) {
    setTooltipWithTitleAndShow(this, title);
  }
}

function passwordValidator() {
  const passwordRegexp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/;
  const title = 'Пароль должен иметь длину не менее 6 символов и содержать хотя бы по одному из символов A-Z a-z 0-9';

  if (!passwordRegexp.exec(this.val())) {
    setTooltipWithTitleAndShow(this, title);
  }
}

function theSameValidator(elem) {
  const title = 'Пароли не совпадают';
  if (this.val() && elem.val() && this.val() !== elem.val()) {
    setTooltipWithTitleAndShow(this, title);
    setTooltipWithTitleAndShow(elem, title);
  }
}

function setTooltipWithTitleAndShow(elem, title) {
  elem.tooltip('dispose');
  elem.tooltip({
    container: 'body',
    placement: 'left',
    trigger: 'manual',
    title: title
  });
  elem.tooltip('show');
}