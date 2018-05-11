/* eslint-disable no-undef */
const INCREMENT_SECONDS_BY_1000 = 1000;
const CustomAlert = { // utility not dependent on other module outside this file
  id: null,
  setId (alertId) {
    CustomAlert.id = alertId;
    CustomAlert.hideAlert();
  },
  displayAlert (type, heading, text, duration) {
    CustomAlert.showAlert();
    $(CustomAlert.id).addClass('alert-' + type);
    $(CustomAlert.id).find('.alert-heading').text(heading);
    $(CustomAlert.id).find('#alertBody').text(text);
    $(CustomAlert.id).removeClass('hidden');
    CustomAlert.hideAlert(duration);
  },
  hideAlert (duration) {
    setTimeout(function () {
      $(CustomAlert.id).css('display', 'none');
    }, duration * INCREMENT_SECONDS_BY_1000); // 1000 for 1 second
  },
  showAlert () {
    $(CustomAlert.id).removeClass(
      'alert-warning',
      'alert-info',
      'alert-success',
      'alert-danger'
    );
    $(CustomAlert.id).css('display', 'block');
  },
  getTimeIsUpAlert () {
    return CustomAlert.displayAlert(
      Str.warning,
      Str.timeIsUp,
      Str.pleaseSubmitMsg,
      60
    );
  }
};
const Str = {
  timeIsUp: 'Time is up!',
  pleaseSubmitMsg: 'Please submit the test!',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  success: 'success',
  submitted: 'This quiz has been submitted.',
  resultDisplayed: 'The result will be displayed in a moment. Please wait.',
  noAnswered: 'No questions answered',
  display: 'display',
  block: 'block',
  disabled: 'disabled',
  none: 'none',
  pleaseAnswerSome: 'Please answer some question before submitting the quiz',
  answeredSoFar: 'Question(s) answered so far: ',
  currentSessionIncomplete: 'The current quiz session is not completed.'
};
