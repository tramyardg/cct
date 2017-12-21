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
      'success',
      'This quiz has been submitted.',
      'The result will be displayed in a moment. Please wait.',
      60
    )
  },
  getTimeIsUpAlert () {
    return CustomAlert.displayAlert(
      'warning',
      'Time is up!',
      'Please submit the test.',
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
