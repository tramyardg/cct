$(document).ready(function () {
  testOptions.setTestOptionsConstruct('#test-options-form')
  testOptions.onSubmitTestOptions()
  timer.setTimerConstruct({
    timerBox: '#timer-box',
    secHTML: '#seconds-span',
    minHTML: '#minutes-span',
    radioButtons: '.q-option,input[type=radio]'
  })
  customAlert.setId('#customAlert')
  QCatalog.setQuestionForm('#questions-form')
  // testProgress.setTestProgressConstruct('form#questions-form', '#progressbar', '.progress-label')
  // testProgress.testProgressMain()
  enlargeImage.setConstruct({
    imageOverlay: '.image-overlay',
    imageOverlayClose: '.image-overlay-close'
  })
})
const MINUTES_CONSTANT = 60
const INCREMENT_SECONDS_BY_1000 = 1000
const DEFAULT_REGION_ID = 'AA'
const testOptions = {
  isTimerSet: false,
  minutes: null,
  numberOfQuestions: null,
  testOptionsFormHTML: null,
  setTestOptionsConstruct (tofHTML) {
    testOptions.testOptionsFormHTML = tofHTML
  },
  hideTestOptionsForm () {
    $(testOptions.testOptionsFormHTML).remove()
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
  onSubmitTestOptions: function () { // main
    timer.hideTimer()
    customAlert.hideAlert()
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
      loadXMLDoc.load(function (output) {
        QCatalog.setCatalog(output)
      })
      testOptions.runTimer()
      testOptions.hideTestOptionsForm()
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
  allRadioButtons: null,
  setTimerConstruct (args) {
    timer.timerHTML = args.timerBox
    timer.secondsHTML = args.secHTML
    timer.minutesHTML = args.minHTML
    timer.allRadioButtons = args.radioButtons
    timer.hideTimer()
  },
  disableAllRadio () {
    $(timer.allRadioButtons).prop('disabled', true)
  },
  displayTimer () {
    $(timer.timerHTML).css('display', 'block')
  },
  hideTimer () {
    $(timer.timerHTML).css('display', 'none')
  },
  setSecondsByMinutes (passedMinutes) {
    timer.seconds = passedMinutes * MINUTES_CONSTANT
  },
  startTimer () { // main
    // let counter = timer.seconds
    let counter = 5
    let remainingMinutes, remainingSeconds
    setInterval(function () {
      counter--
      if (counter >= 0) {
        remainingMinutes = Math.floor(counter / MINUTES_CONSTANT)
        remainingSeconds = counter % MINUTES_CONSTANT
        let secondsText = ((remainingSeconds < 10) ? '0' + remainingSeconds : remainingSeconds)
        let minutesText = ((remainingMinutes < 10) ? '0' + remainingMinutes : remainingMinutes)
        $(timer.secondsHTML).text(secondsText)
        $(timer.minutesHTML).text(minutesText)
      }
      timer.changeBadgeColor(counter)
      if (counter === 0) {
        customAlert.displayAlert('warning', 'Time is up!', 'Please submit the test.')
        timer.disableAllRadio()
        clearInterval(remainingSeconds)
        clearInterval(remainingMinutes)
      }
    }, INCREMENT_SECONDS_BY_1000)
  },
  changeBadgeColor (counter) {
    if (counter > MINUTES_CONSTANT / 2 && counter < MINUTES_CONSTANT) {
      $(timer.secondsHTML).removeClass('badge-secondary').addClass('badge-warning')
      $(timer.minutesHTML).removeClass('badge-secondary').addClass('badge-warning')
    } else if (counter < MINUTES_CONSTANT / 2) {
      $(timer.secondsHTML).removeClass('badge-secondary').addClass('badge-danger')
      $(timer.minutesHTML).removeClass('badge-secondary').addClass('badge-danger')
    }
  }
}
const customAlert = {
  id: null,
  setId (alertId) {
    customAlert.id = alertId
    customAlert.hideAlert()
  },
  displayAlert (type, heading, text) {
    customAlert.showAlert()
    $(customAlert.id).addClass('alert-' + type)
    $(customAlert.id).find('.alert-heading').text(heading)
    $(customAlert.id).find('#alertBody').text(text)
    $(customAlert.id).removeClass('hidden')
  },
  hideAlert () {
    $(customAlert.id).css('display', 'none')
  },
  showAlert () {
    $(customAlert.id).css('display', 'block')
  }
}
const QCatalog = {
  catalog: null,
  questionForm: null,
  catalogLength: null || 0,
  commonArgs: {
    questionId: null,
    regionId: null || 'QC',
    diagramId: null,
    type: null || 1,
    diagram: null
  },
  argsEn: {
    question: null,
    optionA: null,
    optionB: null,
    optionC: null,
    optionD: null,
    referralEn: null
  },
  argsFr: {
    questionFr: null,
    optionAFr: null,
    optionBFr: null,
    optionCFr: null,
    optionDFr: null,
    referralFr: null
  },
  numOfMCs: 0,
  numOfTFs: 0,
  setQuestionForm (form) {
    QCatalog.questionForm = form
  },
  setCatalog (aCatalog) {
    QCatalog.catalog = aCatalog
    let item = $(QCatalog.catalog).find('ITEM')
    QCatalog.catalog.catalogLength = item.length
    let h = ''
    h += QCatalog.catalogMapper(h, item)
    $(QCatalog.questionForm).empty()
    h += `<button type="submit" class="btn btn-outline-success mb-sm-2">Finish</button>`
    $(QCatalog.questionForm).append(h)
    QCatalog.customToString()
  },
  commonArgsMapper (qItem, i) {
    QCatalog.commonArgs.questionId = qItem[i].getElementsByTagName('QUIZID')[0].innerHTML
    QCatalog.commonArgs.regionId = qItem[i].getElementsByTagName('REGIONID')[0].innerHTML
    QCatalog.commonArgs.diagramId = qItem[i].getElementsByTagName('DIAGRAMID')[0].innerHTML
    QCatalog.commonArgs.type = qItem[i].getElementsByTagName('QUESTIONTYPE')[0].innerHTML
    QCatalog.commonArgs.diagram = qItem[i].getElementsByTagName('DIAGRAM')[0].innerHTML
  },
  argsEnMapper (qItem, i) {
    QCatalog.argsEn.question = qItem[i].getElementsByTagName('QUESTION')[0].innerHTML
    QCatalog.argsEn.optionA = qItem[i].getElementsByTagName('OPTIONA')[0].innerHTML
    QCatalog.argsEn.optionB = qItem[i].getElementsByTagName('OPTIONB')[0].innerHTML
    QCatalog.argsEn.optionC = qItem[i].getElementsByTagName('OPTIONC')[0].innerHTML
    QCatalog.argsEn.optionD = qItem[i].getElementsByTagName('OPTIOND')[0].innerHTML
    QCatalog.argsEn.referralEn = qItem[i].getElementsByTagName('REFERRAL')[0].innerHTML
  },
  customToString () { // for debugging purpose
    console.log('num of mc ' + QCatalog.numOfMCs)
    console.log('num of tf ' + QCatalog.numOfTFs)
    let mcButtons = QCatalog.numOfMCs * 4
    let tfButtons = QCatalog.numOfTFs * 2
    let totalButtons = mcButtons + tfButtons
    console.log('total radio buttons = ' + totalButtons)
  },
  catalogMapper (h, qItem) {
    for (let i = 0; i < qItem.length; i++) {
      QCatalog.commonArgsMapper(qItem, i)
      QCatalog.argsEnMapper(qItem, i)
      h += Templates.openQuestionBody()
      h += Templates.questionItemBody(i, QCatalog.catalog.catalogLength, QCatalog.commonArgs, QCatalog.argsEn)
      if (QCatalog.commonArgs.type === '1') {
        QCatalog.numOfTFs++
        h += Templates.tfQuestion(QCatalog.commonArgs)
      } else {
        QCatalog.numOfMCs++
        h += Templates.mcQuestion(QCatalog.commonArgs, QCatalog.argsEn)
      }
      h += Templates.closeQuestionBody()
    }
    return h
  }
}
const loadXMLDoc = {
  load: function (handleData) {
    let options = {
      regionId: DEFAULT_REGION_ID,
      limit: testOptions.numberOfQuestions,
      dateTime: new Date().getTime(),
      timer: testOptions.isTimerSet
    }
    $.ajax({
      type: 'GET',
      url: 'model/cct-questions.php',
      data: options,
      dataType: 'xml',
      success: function (xml) {
        handleData(xml)
      },
      error: function () {}
    })
  }
}
const testProgress = { // TODO should be real-time
  progressBarDivId: null,
  progressBarLabel: null,
  currentProgress: null,
  totalQuestions: null,
  setTestProgressConstruct (elemId, label) {
    testProgress.progressBarDivId = elemId
    testProgress.progressBarLabel = label
  },
  setTotalNumQuestion (form) {
    testProgress.totalQuestions = $(form).find('ul').length
  },
  testProgressMain () {
    $(testProgress.progressBarDivId).progressbar({
      value: false,
      change: function () {
        $(testProgress.progressBarLabel).text($(testProgress.progressBarDivId).progressbar('value') + '% complete')
      },
      complete: function () {
        $(testProgress.progressBarLabel).text('Complete!')
      }
    })
    testProgress.progress(0)
  },
  progress (currentProgress) {
    let val = $(testProgress.progressBarDivId).progressbar('value') || 0
    $(testProgress.progressBarDivId).progressbar('value', val + currentProgress)
  }
}
const enlargeImage = {
  imageOverlay: null,
  imageOverlayClose: null,
  setConstruct (args) {
    enlargeImage.imageOverlay = args.imageOverlay
    enlargeImage.imageOverlayClose = args.imageOverlayClose
  },
  clickToEnlarge (ele) {
    let imageSource = $(ele).attr('src')
    $(enlargeImage.imageOverlay).find('img').attr('src', imageSource)
    $(enlargeImage.imageOverlay).fadeIn(100)
    enlargeImage.closeImageOverlay()
  },
  closeImageOverlay () {
    $(enlargeImage.imageOverlayClose).click(function () {
      $(enlargeImage.imageOverlay).fadeOut(100)
    })
  }
}
