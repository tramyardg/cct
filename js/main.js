$(document).ready(function () {
  TestOptions.setTestOptionsConstruct('#test-options-form')
  TestOptions.onSubmitTestOptions()
  Timer.setTimerConstruct({
    timerBox: '#timer-box',
    secHTML: '#seconds-span',
    minHTML: '#minutes-span',
    radioButtons: '.q-option,input[type=radio]'
  })
  CustomAlert.setId('#customAlert')
  QCatalog.setQuestionForm('#questions-form')
  EnlargeImage.setConstruct({
    imageOverlay: '.image-overlay',
    imageOverlayClose: '.image-overlay-close'
  })
})
