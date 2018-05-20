/* eslint-disable no-undef */
const MINUTES_CONSTANT = 60;
const Timer = {
  seconds: null,
  timerHTML: null,
  secondsHTML: null,
  minutesHTML: null,
  allRadioButtons: null,
  isNoMoreTime: false,
  setTimerConstruct (args) {
    Timer.timerHTML = args.timerBox;
    Timer.secondsHTML = args.secHTML;
    Timer.minutesHTML = args.minHTML;
    Timer.allRadioButtons = args.radioButtons;
    Timer.hideTimer();
  },
  disableAllRadio () {
    $(Timer.allRadioButtons).prop('disabled', true);
  },
  displayTimer () {
    $(Timer.timerHTML).css('display', 'block');
  },
  hideTimer () {
    $(Timer.timerHTML).css('display', 'none');
  },
  setSecondsByMinutes (passedMinutes) {
    Timer.seconds = passedMinutes * MINUTES_CONSTANT;
  },
  startTimer () { // main
    let counter = Timer.seconds;
    // 30 secs for debugging purpose
    // let counter = 10;
    let remainingMinutes, remainingSeconds;
    setInterval(function () {
      counter--;
      if (counter >= 0) {
        remainingMinutes = Math.floor(counter / MINUTES_CONSTANT);
        remainingSeconds = counter % MINUTES_CONSTANT;
        let secondsText = ((remainingSeconds < 10) ? '0' + remainingSeconds : remainingSeconds);
        let minutesText = ((remainingMinutes < 10) ? '0' + remainingMinutes : remainingMinutes);
        $(Timer.secondsHTML).text(secondsText);
        $(Timer.minutesHTML).text(minutesText);
      }
      Timer.changeBadgeColor(counter);
      if (counter === 0) {
        Timer.isNoMoreTime = true;
        CustomAlert.getTimeIsUpAlert();
        // disabled Done button
        $(QuizSubmission.formId).find('button#finish-quiz').addClass('disabled');
        Timer.disableAllRadio();
        clearInterval(remainingSeconds);
        clearInterval(remainingMinutes);
      }
    }, INCREMENT_SECONDS_BY_1000);
  },
  changeBadgeColor (counter) {
    if (counter > MINUTES_CONSTANT / 2 && counter < MINUTES_CONSTANT) {
      $(Timer.secondsHTML).removeClass('badge-secondary').addClass('badge-warning');
      $(Timer.minutesHTML).removeClass('badge-secondary').addClass('badge-warning');
    } else if (counter < MINUTES_CONSTANT / 2) {
      $(Timer.secondsHTML).removeClass('badge-secondary').addClass('badge-danger');
      $(Timer.minutesHTML).removeClass('badge-secondary').addClass('badge-danger');
    }
  }
};
