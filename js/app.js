$(document).ready(function () {
  testOptions.onSubmitTestOptions('#test-options-form')
})
/**
 * check if timer is set
 * if timer is set then defined
 * the minutes accordingly
 * @type {{}}
 */
const testOptions = {
  isTimerSet: false,
  getMinutesByNumQuestions (numOfQuestions) {
    if (testOptions.isTimerSet) {
      switch (parseInt(numOfQuestions)) {
        case 10:
          return 15
        case 20:
          return 30
        case 30:
          return 45
        case 40:
          return 60
        case 50:
          return 75
        case 60:
          return 90
        case 70:
          return 105
        case 80:
          return 120
      }
    }
    return 15
  },
  setIsTimerSet (cond) {
    if (cond === true || cond === 'true') {
      testOptions.isTimerSet = true
    }
  },
  onSubmitTestOptions: function (formId) {
    $(formId).submit(function (event) {
      // get the number of question
      let values = []
      $(this).serializeArray().forEach((element) => {
        values.push(element)
      })
      testOptions.setIsTimerSet(values[1].value)
      console.log(testOptions.isTimerSet)
      console.log(testOptions.getMinutesByNumQuestions(values[0].value))
      event.preventDefault()
      // testOptions.getMinutesByNumQuestions()
      // get if timer is set
    })
  }
}
