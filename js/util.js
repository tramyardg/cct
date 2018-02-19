const MINUTES_CONSTANT = 60
const INCREMENT_SECONDS_BY_1000 = 1000
const DEFAULT_REGION_ID = 'AA'
const CustomAlert = { // utility not dependent on other module outside this file
  id: null,
  setId (alertId) {
    CustomAlert.id = alertId
    CustomAlert.hideAlert()
  },
  displayAlert (type, heading, text, duration) {
    CustomAlert.showAlert()
    $(CustomAlert.id).addClass('alert-' + type)
    $(CustomAlert.id).find('.alert-heading').text(heading)
    $(CustomAlert.id).find('#alertBody').text(text)
    $(CustomAlert.id).removeClass('hidden')
    CustomAlert.hideAlert(duration)
  },
  hideAlert (duration) {
    setTimeout(function () {
      $(CustomAlert.id).css('display', 'none')
    }, duration * INCREMENT_SECONDS_BY_1000) // 1000 for 1 second
  },
  showAlert () {
    $(CustomAlert.id).removeClass(
      'alert-warning',
      'alert-info',
      'alert-success',
      'alert-danger'
    )
    $(CustomAlert.id).css('display', 'block')
  },
  getQuizSubmittedAlert () {
    return CustomAlert.displayAlert(
      Str.success,
      Str.submitted,
      Str.resultDisplayed,
      60
    )
  },
  getTimeIsUpAlert () {
    return CustomAlert.displayAlert(
      Str.warning,
      Str.timeIsUp,
      Str.pleaseSubmitMsg,
      60
    )
  }
}
const EnlargeImage = {
  imageOverlay: null,
  imageOverlayClose: null,
  setConstruct (args) {
    EnlargeImage.imageOverlay = args.imageOverlay
    EnlargeImage.imageOverlayClose = args.imageOverlayClose
  },
  clickToEnlarge (ele) {
    let imageSource = $(ele).attr('src')
    $(EnlargeImage.imageOverlay).find('img').attr('src', imageSource)
    $(EnlargeImage.imageOverlay).fadeIn(100)
    EnlargeImage.closeImageOverlay()
  },
  closeImageOverlay () {
    $(EnlargeImage.imageOverlayClose).click(function () {
      $(EnlargeImage.imageOverlay).fadeOut(100)
    })
  }
}
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
  none: 'none'
}
const Duration = {
  five: 5,
  ten: 10,
  fifteen: 15,
  twenty: [20, 25],
  thirty: [30, 35],
  forty: [40, 45],
  fifty: [50, 55],
  sixty: [60, 65],
  seventy: [70, 75],
  eighty: [80, 85],
  ninety: [90, 95],
  hundred: [100, 105]
}