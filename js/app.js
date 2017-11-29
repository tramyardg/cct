$(document).ready(function () {
  testOptions.setTestOptionsConstruct('#test-options-form')
  testOptions.onSubmitTestOptions()
  timer.setTimerConstruct('#timer-box', '#seconds-span', '#minutes-span')
})
const MINUTES_CONSTANT = 60
const INCREMENT_SECONDS_BY_1000 = 1000
const HIDE_ELEMENT_CLASS = 'text-hide'
const testOptions = {
  isTimerSet: false,
  minutes: null,
  numberOfQuestions: null,
  testOptionsFormHTML: null,
  setTestOptionsConstruct (tofHTML) {
    testOptions.testOptionsFormHTML = tofHTML
  },
  hideTestOptionsForm () {
    $(testOptions.testOptionsFormHTML).addClass(HIDE_ELEMENT_CLASS)
  },
  setIsTimerSet (cond) {
    if (cond === true || cond === 'true') {
      testOptions.isTimerSet = true
    }
  },
  setMinutesByNumQuestions (num) {
    if (testOptions.isTimerSet) {
      switch (parseInt(num)) {
        case 10:
          testOptions.minutes = 15
          break
        case 20:
          testOptions.minutes = 30
          break
        case 30:
          testOptions.minutes = 45
          break
        case 40:
          testOptions.minutes = 60
          break
        case 50:
          testOptions.minutes = 75
          break
        case 60:
          testOptions.minutes = 90
          break
        case 70:
          testOptions.minutes = 105
          break
        case 80:
          testOptions.minutes = 120
          break
      }
    }
  },
  setNumberOfQuestions (num) {
    testOptions.numberOfQuestions = num
  },
  onSubmitTestOptions: function () {
    let formId = testOptions.testOptionsFormHTML
    $(formId).submit(function (event) {
      let values = []
      $(this).serializeArray().forEach((element) => {
        values.push(element)
      })
      testOptions.setNumberOfQuestions(values[0].value)
      testOptions.setIsTimerSet(values[1].value)
      testOptions.setMinutesByNumQuestions(values[0].value)
      testOptions.customToString()
      testOptions.runTimer()
      event.preventDefault()
    })
  },
  customToString () { // for debugging purposes
    console.log('is timer set ' + testOptions.isTimerSet)
    console.log('number of minutes ' + testOptions.minutes)
    console.log('number of questions ' + testOptions.numberOfQuestions)
  },
  runTimer () {
    if (testOptions.isTimerSet) {
      timer.displayTimer()
      timer.setSecondsByMinutes(testOptions.minutes)
      timer.startTimer()
    } else {
      timer.hideTimer()
    }
  }
}
const timer = {
  seconds: null,
  timerHTML: null,
  secondsHTML: null,
  minutesHTML: null,
  setTimerConstruct (timerBox, secHTML, minHTML) {
    timer.timerHTML = timerBox
    timer.secondsHTML = secHTML
    timer.minutesHTML = minHTML
  },
  displayTimer () {
    $(timer.timerHTML).removeClass(HIDE_ELEMENT_CLASS)
  },
  hideTimer () {
    $(timer.timerHTML).addClass(HIDE_ELEMENT_CLASS)
  },
  setSecondsByMinutes (passedMinutes) {
    timer.seconds = passedMinutes * MINUTES_CONSTANT
  },
  startTimer () {
    // let remainingMinutes
    // let remainingSeconds
    // let counter = timer.seconds
    setInterval(function () {
      // counter--
      // if (counter >= 0) {
      //
      // }
    }, INCREMENT_SECONDS_BY_1000)
  }
}
