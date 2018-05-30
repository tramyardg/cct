/* eslint-disable no-undef */
$(document).ready(function () {
  $('.loader-io').hide();
  // init elements
  CustomAlert.setId('#customAlert');
  Timer.setTimerConstruct({
    timerBox: '#timer-box',
    secHTML: '#seconds-span',
    minHTML: '#minutes-span',
    radioButtons: '.q-option,input[type=radio]'
  });
  EnlargeImage.setConstruct({
    imageOverlay: '.image-overlay',
    imageOverlayClose: '.image-overlay-close'
  });
  // -------------------------------------------------
  TestOptions.setTestOptionsConstruct('#test-options-form');
  TestOptions.onSubmitTestOptions();
  QCatalog.setQuestionForm('#questions-form');
  QuizResultNum.setNeededSelectors({
    numCorrectAnswers: '#correct-questions',
    numOfQuestionsAnswered: '#total-questions-answered',
    accuracyPercent: '#accuracy',
    timeTaken: {sel: '#time-taken', minSel: Timer.minutesHTML, secSel: Timer.secondsHTML}
  });
});
const loaderFunc = function () {
  return '<svg width="10%" height="10%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-reload"><g transform="rotate(318 50 50)"><path d="M50 15A35 35 0 1 0 74.787 25.213" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" stroke="#5699d2" stroke-width="12"></path><path ng-attr-d="{{config.darrow}}" ng-attr-fill="{{config.color}}" d="M49 3L49 27L61 15L49 3" fill="#5699d2"></path><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></g></svg>';
};
$(document)
  .ajaxStart(function () {
    $('.loader-io').append(loaderFunc()).show();
  }).ajaxStop(function () {
    $('.loader-io').hide();
  });
