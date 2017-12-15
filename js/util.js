const CustomAlert = {
  id: null,
  setId (alertId) {
    CustomAlert.id = alertId
    CustomAlert.hideAlert()
  },
  displayAlert (type, heading, text) {
    CustomAlert.showAlert()
    $(CustomAlert.id).addClass('alert-' + type)
    $(CustomAlert.id).find('.alert-heading').text(heading)
    $(CustomAlert.id).find('#alertBody').text(text)
    $(CustomAlert.id).removeClass('hidden')
  },
  hideAlert () {
    $(CustomAlert.id).css('display', 'none')
  },
  showAlert () {
    $(CustomAlert.id).css('display', 'block')
  }
}
