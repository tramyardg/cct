const CustomAlert = {
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
    }, duration * 1000) // 1000 for 1 second
  },
  showAlert () {
    $(CustomAlert.id).removeClass(
      'alert-warning',
      'alert-info',
      'alert-success',
      'alert-danger'
    )
    $(CustomAlert.id).css('display', 'block')
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
