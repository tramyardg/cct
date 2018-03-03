$(document).ready(() => {
  // init elements
  CustomAlert.setId('#customAlert');
  Timer.setTimerConstruct({
    timerBox: '#timer-box',
    secHTML: '#seconds-span',
    minHTML: '#minutes-span',
    radioButtons: '.q-option,input[type=radio]',
  });
  EnlargeImage.setConstruct({
    imageOverlay: '.image-overlay',
    imageOverlayClose: '.image-overlay-close',
  });
  // -------------------------------------------------
  TestOptions.setTestOptionsConstruct('#test-options-form');
  TestOptions.onSubmitTestOptions();
  QCatalog.setQuestionForm('#questions-form');
});
