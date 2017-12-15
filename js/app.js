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
  $('[data-toggle="tooltip"]').tooltip()
})
const MINUTES_CONSTANT = 60
const INCREMENT_SECONDS_BY_1000 = 1000
const DEFAULT_REGION_ID = 'AA'
const TestOptions = {
  isTimerSet: false,
  minutes: null,
  numberOfQuestions: null,
  testOptionsFormHTML: null,
  setTestOptionsConstruct (tofHTML) {
    TestOptions.testOptionsFormHTML = tofHTML
  },
  hideTestOptionsForm () {
    $(TestOptions.testOptionsFormHTML).remove()
  },
  setIsTimerSet (cond) {
    if (cond === true || cond === 'true') {
      TestOptions.isTimerSet = true
    }
  },
  setMinutesByNumQuestions (num) {
    if (TestOptions.isTimerSet) {
      switch (parseInt(num)) {
        case 10:
          TestOptions.minutes = 15
          break
        case 20:
          TestOptions.minutes = 30
          break
        case 30:
          TestOptions.minutes = 45
          break
        case 40:
          TestOptions.minutes = 60
          break
        case 50:
          TestOptions.minutes = 75
          break
        case 60:
          TestOptions.minutes = 90
          break
        case 70:
          TestOptions.minutes = 105
          break
        case 80:
          TestOptions.minutes = 120
          break
      }
    }
  },
  setNumberOfQuestions (num) {
    TestOptions.numberOfQuestions = num
  },
  onSubmitTestOptions: function () { // main
    Timer.hideTimer()
    CustomAlert.hideAlert()
    let formId = TestOptions.testOptionsFormHTML
    $(formId).submit(function (event) {
      let values = []
      $(this).serializeArray().forEach((element) => {
        values.push(element)
      })
      TestOptions.setNumberOfQuestions(values[0].value)
      TestOptions.setIsTimerSet(values[1].value)
      TestOptions.setMinutesByNumQuestions(values[0].value)
      TestOptions.customToString()
      LoadXMLDoc.load(function (output) {
        QCatalog.setCatalog(output)
      })
      TestOptions.runTimer()
      TestOptions.hideTestOptionsForm()
      event.preventDefault()
    })
  },
  customToString () { // for debugging purposes
    console.log('is Timer set ' + TestOptions.isTimerSet)
    console.log('number of minutes ' + TestOptions.minutes)
    console.log('number of questions ' + TestOptions.numberOfQuestions)
  },
  runTimer () {
    if (TestOptions.isTimerSet) {
      Timer.displayTimer()
      Timer.setSecondsByMinutes(TestOptions.minutes)
      Timer.startTimer()
    } else {
      Timer.hideTimer()
    }
  }
}
const Timer = {
  seconds: null,
  timerHTML: null,
  secondsHTML: null,
  minutesHTML: null,
  allRadioButtons: null,
  isNoMoreTime: false,
  setTimerConstruct (args) {
    Timer.timerHTML = args.timerBox
    Timer.secondsHTML = args.secHTML
    Timer.minutesHTML = args.minHTML
    Timer.allRadioButtons = args.radioButtons
    Timer.hideTimer()
  },
  disableAllRadio () {
    $(Timer.allRadioButtons).prop('disabled', true)
  },
  displayTimer () {
    $(Timer.timerHTML).css('display', 'block')
  },
  hideTimer () {
    $(Timer.timerHTML).css('display', 'none')
  },
  setSecondsByMinutes (passedMinutes) {
    Timer.seconds = passedMinutes * MINUTES_CONSTANT
  },
  startTimer () { // main
    // let counter = Timer.seconds
    // TODO remove hard coded seconds, use above line
    let counter = 30
    let remainingMinutes, remainingSeconds
    setInterval(function () {
      counter--
      if (counter >= 0) {
        remainingMinutes = Math.floor(counter / MINUTES_CONSTANT)
        remainingSeconds = counter % MINUTES_CONSTANT
        let secondsText = ((remainingSeconds < 10) ? '0' + remainingSeconds : remainingSeconds)
        let minutesText = ((remainingMinutes < 10) ? '0' + remainingMinutes : remainingMinutes)
        $(Timer.secondsHTML).text(secondsText)
        $(Timer.minutesHTML).text(minutesText)
      }
      Timer.changeBadgeColor(counter)
      if (counter === 0) {
        Timer.isNoMoreTime = true
        CustomAlert.displayAlert('warning', 'Time is up!', 'Please submit the test.')
        Timer.disableAllRadio()
        clearInterval(remainingSeconds)
        clearInterval(remainingMinutes)
      }
    }, INCREMENT_SECONDS_BY_1000)
  },
  changeBadgeColor (counter) {
    if (counter > MINUTES_CONSTANT / 2 && counter < MINUTES_CONSTANT) {
      $(Timer.secondsHTML).removeClass('badge-secondary').addClass('badge-warning')
      $(Timer.minutesHTML).removeClass('badge-secondary').addClass('badge-warning')
    } else if (counter < MINUTES_CONSTANT / 2) {
      $(Timer.secondsHTML).removeClass('badge-secondary').addClass('badge-danger')
      $(Timer.minutesHTML).removeClass('badge-secondary').addClass('badge-danger')
    }
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
    h += Templates.finishNextPrevButtons()
    $(QCatalog.questionForm).append(h)
    QCatalog.customToString()
    ShowHideItems.hideItemsExcept(1) // hide items except the first one
    // INITIALIZE elements here (only js generated elem not pre-built via html)
    NextPrevDiv.setConstruct({ // initialize previous and next button here
      nextBtn: '#next-button',
      prevBtn: '#prev-button'
    })
    QuizSubmission.setConstruct({
      formId: '#questions-form'
    })
    QuizSubmission.onClickDoneButton()
    QuizSubmission.onClickSubmitButton('button#submit-quiz')
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
    let totalButtons = (QCatalog.numOfMCs * 4) + (QCatalog.numOfTFs * 2)
    console.log('total radio buttons = ' + totalButtons)
  },
  catalogMapper (h, qItem) {
    h += Templates.navigateItemsWithButton(qItem.length)
    for (let i = 0; i < qItem.length; i++) {
      QCatalog.commonArgsMapper(qItem, i)
      QCatalog.argsEnMapper(qItem, i)
      QuizSubmission.quizIds.push(qItem[i].getElementsByTagName('QUIZID')[0].innerHTML)
      h += Templates.openQuestionBody((i + 1))
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
const LoadXMLDoc = {
  load: function (handleData) {
    let options = {
      regionId: DEFAULT_REGION_ID,
      limit: TestOptions.numberOfQuestions,
      dateTime: new Date().getTime(),
      timer: TestOptions.isTimerSet
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
const NavigateItemByIndex = {
  onclickButtonWithIndex (index) {
    ShowHideItems.showItemByItemIndex(index) // show the item with the index
    NavigateItemByIndex.setItemButtonToActive(index) // and make the corresponding button active
  },
  setItemButtonToActive (index) {
    $('.btn-item').removeClass('active') // remove all active class
    $('.btn-navigator-' + index).addClass('active') // and make this one active
  }
}
const ShowHideItems = {
  hideItemsExcept (index) {
    $(QCatalog.questionForm + ' .list-group').each(function (item) {
      if (item !== null && item !== (index - 1)) { // each function index starts at 0
        $(this).hide()
      }
    })
  },
  showItemByItemIndex (index) {
    if (index !== null) {
      $('.question-item-' + index).show() // show the item with the index
      ShowHideItems.hideItemsExcept(index) // hide all the items except this item with index number
    }
  }
}
const NextPrevDiv = {
  nextBtn: null,
  prevBtn: null,
  listGroup: {
    main: '.list-group',
    first: ' .list-group:first',
    last: ' .list-group:last',
    visible: ' .list-group:visible'
  },
  setConstruct (args) { // call after items are created
    NextPrevDiv.nextBtn = args.nextBtn
    NextPrevDiv.prevBtn = args.prevBtn
    NextPrevDiv.clickNextButton()
    NextPrevDiv.clickPrevButton()
  },
  clickNextButton () {
    let itemClass = NextPrevDiv.listGroup.main
    let visibleItem = NextPrevDiv.listGroup.visible
    let firstItem = NextPrevDiv.listGroup.first
    $(NextPrevDiv.nextBtn).click(function () {
      if ($(QCatalog.questionForm + visibleItem).next(itemClass).length !== 0) {
        $(QCatalog.questionForm + visibleItem).next(itemClass).show().prev(itemClass).hide()
        NavigateItemByIndex.setItemButtonToActive($(QCatalog.questionForm + visibleItem).attr('data-number'))
      } else {
        $(QCatalog.questionForm + visibleItem).hide()
        $(QCatalog.questionForm + firstItem).show()
        NavigateItemByIndex.setItemButtonToActive($(QCatalog.questionForm + firstItem).attr('data-number'))
      }
      return false
    })
  },
  clickPrevButton () {
    let itemClass = NextPrevDiv.listGroup.main
    let visibleItem = NextPrevDiv.listGroup.visible
    let lastItem = NextPrevDiv.listGroup.last
    $(NextPrevDiv.prevBtn).click(function () {
      if ($(QCatalog.questionForm + visibleItem).prev(itemClass).length !== 0) {
        $(QCatalog.questionForm + visibleItem).prev(itemClass).show().next(itemClass).hide()
        NavigateItemByIndex.setItemButtonToActive($(QCatalog.questionForm + visibleItem).attr('data-number'))
      } else {
        $(QCatalog.questionForm + visibleItem).hide()
        $(QCatalog.questionForm + lastItem).show()
        NavigateItemByIndex.setItemButtonToActive($(QCatalog.questionForm + lastItem).attr('data-number'))
      }
      return false
    })
  }
}
const QuizSubmission = {
  formId: null,
  quizIds: [], // array of quiz ids
  setConstruct (args) {
    QuizSubmission.formId = args.formId
  },
  onClickDoneButton () {
    console.log($(QuizSubmission.formId))
    $(QuizSubmission.formId).submit(function (event) {
      let checkedItemArray = []
      let countCheckedItems = null
      QuizSubmission.quizIds.forEach((element) => {
        $('input[type=radio][name=' + element + ']').each(function () {
          if ($(this)[0].checked) {
            countCheckedItems++
            checkedItemArray.push($(this).parentsUntil('ul').parent().first().attr('data-number'))
          }
        })
      })
      QuizSubmission.getCheckedItemsArray(checkedItemArray, countCheckedItems)
      event.preventDefault()
      return false
    })
  },
  getCheckedItemsArray (itemsArray, numCheckedItems) {
    // display when:
    // 1) the timer is set, there still more time, and there still unanswered item(s)
    // 2) the timer is not set, and there still unanswered item(s)
    if (TestOptions.isTimerSet && !Timer.isNoMoreTime && numCheckedItems !== QuizSubmission.quizIds.length) {
      QuizSubmission.displayAlertMessage(itemsArray)
    } else if (!TestOptions.isTimerSet && numCheckedItems !== QuizSubmission.quizIds.length) {
      QuizSubmission.displayAlertMessage(itemsArray)
    } else {
      CustomAlert.hideAlert()
    }
  },
  displayAlertMessage (itemsArray) {
    let num = (itemsArray.length > 0 ? itemsArray.join(', ') : 'none')
    return CustomAlert.displayAlert(
      'warning',
      'There are questions left unanswered.',
      'Question(s) answered so far: ' + num
    )
  },
  onClickSubmitButton (ele) {
    console.log($(ele))
  }
}
// TODO add quit button maybe if the user wants to quit (skips and evaluates only the answered questions)
// group items that are need to be initialize after test options submission
