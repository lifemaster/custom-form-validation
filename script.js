const firstNameField = $('#first-name');
const lastNameField = $('#last-name');
const emailField = $('#email');
const passwordField = $('#password');
const confirmPasswordField = $('#confirm-password');
const allFields = $('#first-name, #last-name, #email, #password, #confirm-password');

const emailRegexp = /^.+[^\.]\@.+[^\.]$/;
const passwordRegexp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/;

$('#form').submit(function (e) {
  e.preventDefault();
  formValidate();
});

allFields.focus(function () {
  $(this).tooltip('dispose');
});

function formValidate() {
  // first name validator
  if (!firstNameField.val()) {
    setTooltipWithTitle(firstNameField, 'Это поле обязательное для заполнения');
    firstNameField.tooltip('show');
  } else if (firstNameField.val().length > 10) {
    setTooltipWithTitle(firstNameField, 'Длина поля не должна превышать 10 символов');
    firstNameField.tooltip('show');
  }

  // last name validator
  if (!lastNameField.val()) {
    setTooltipWithTitle(lastNameField, 'Это поле обязательное для заполнения');
    lastNameField.tooltip('show');
  } else if (lastNameField.val().length > 10) {
    setTooltipWithTitle(lastNameField, 'Длина поля не должна превышать 10 символов');
    lastNameField.tooltip('show');
  }

  // email validator
  if (!emailField.val()) {
    setTooltipWithTitle(emailField, 'Это поле обязательное для заполнения');
    emailField.tooltip('show');
  } else if (!emailRegexp.exec(emailField.val())) {
    setTooltipWithTitle(emailField, 'Неверный формат email');
    emailField.tooltip('show');
  }

  // password validator
  if (passwordField.val() && confirmPasswordField.val() && passwordField.val() !== confirmPasswordField.val()) {
    setTooltipWithTitle(passwordField, 'Пароли не совпадают');
    passwordField.tooltip('show');

    setTooltipWithTitle(confirmPasswordField, 'Пароли не совпадают');
    confirmPasswordField.tooltip('show');
    return;
  }

  if (!passwordField.val()) {
    setTooltipWithTitle(passwordField, 'Это поле обязательное для заполнения');
    passwordField.tooltip('show');
  } else if (!passwordRegexp.exec(passwordField.val())) {
    setTooltipWithTitle(passwordField, 'Пароль должен иметь длину не менее 6 символов и содержать хотя бы по одному из символов A-Z a-z 0-9');
    passwordField.tooltip('show');
  }

  if (!confirmPasswordField.val()) {
    setTooltipWithTitle(confirmPasswordField, 'Это поле обязательное для заполнения');
    confirmPasswordField.tooltip('show');
  }
}

function setTooltipWithTitle(elem, title) {
  elem.tooltip('dispose')
  elem.tooltip({
    container: 'body',
    placement: 'left',
    trigger: 'manual',
    title: title
  });
}