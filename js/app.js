const TestOptions = {
  isTimerSet: false,
  minutes: null,
  numberOfQuestions: null,
  testOptionsFormHTML: null,
  setTestOptionsConstruct (tofHTML) {
    TestOptions.testOptionsFormHTML = tofHTML
  },
  hideTestOptionsForm () {
    $(TestOptions.testOptionsFormHTML).parentsUntil('.card').parent().remove()
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
      LoadQuestionItems.load(function (output) {
        QCatalog.setCatalog(output)
      })
      TestOptions.runTimer()
      TestOptions.hideTestOptionsForm()
      event.preventDefault()
    })
  },
  customToString () { // for debugging purposes
    // TODO remove before release
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
        CustomAlert.getTimeIsUpAlert()
        // disabled Done button
        $(QuizSubmission.formId).find('button#finish-quiz').addClass('disabled')
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
    // INITIALIZE elements here (only js generated elem and not pre-built via html)
    NextPrevDiv.setConstruct({ // initialize previous and next button here
      nextBtn: '#next-button',
      prevBtn: '#prev-button'
    })
    QuizSubmission.setConstruct({
      formId: '#questions-form'
    })
    QuizSubmission.onClickDoneButton()
    QuizSubmission.onClickSubmitButton()
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
    // TODO remove before release
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
  quizIds: [],
  answeredItems: [],
  setConstruct (args) {
    QuizSubmission.formId = args.formId
  },
  getDoneQuestionsById () { // id from data attribute data-number
    let checkedItemsDataNum = []
    let countCheckedItems = null
    QuizSubmission.quizIds.forEach((element) => {
      $('input[type=radio][name=' + element + ']').each(function () {
        if ($(this)[0].checked) {
          countCheckedItems++
          checkedItemsDataNum.push($(this).parentsUntil('ul').parent().first().attr('data-number'))
        }
      })
    })
    return {numOfCheckedItems: countCheckedItems, indexOfCheckedItems: checkedItemsDataNum}
  },
  onClickDoneButton () {
    $(QuizSubmission.formId).find('button#finish-quiz').click(function (event) {
      QuizSubmission.displayNotDoneMessage(
        QuizSubmission.getDoneQuestionsById().indexOfCheckedItems,
        QuizSubmission.getDoneQuestionsById().numOfCheckedItems
      )
      // works similarly as onClickSubmitButton
      event.preventDefault()
      return false
    })
  },
  onClickSubmitButton () {
    $(QuizSubmission.formId).find('button#submit-quiz').click(function (event) {
      // get answered questions with ids and answers
      //    with these ids, get the corresponding html elements and store them as object
      //    these html elements are needed for displaying result later (items)
      // with these ids and answers make a request to evaluate the answers
      //    the return data determines if the answer is correct by using a flag 1 and 0
      //    new: also the return data must include the answers
      //    use the template to display the numerical result
      //    use the data to style the html above to be displayed as result
      let userAnswers = {itemsWithAnswer: $(QuizSubmission.formId).serialize()}
      if (userAnswers.itemsWithAnswer !== '' || userAnswers.itemsWithAnswer.indexOf('=') !== -1 ||
        userAnswers.itemsWithAnswer.indexOf('&') !== -1) {
        QuizSubmission.setAnsweredItems($(QuizSubmission.formId).serializeArray())
        LoadResults.setQueryString(userAnswers)
        LoadResults.load(function (data) {
          console.log(data)
        })
      } else {
        CustomAlert.displayAlert(
          'info',
          'No questions answered',
          'Please answer some question before submitting the quiz.',
          10
        )
      }
      event.preventDefault()
      return false
    })
  },
  setAnsweredItems (itemsSubmitted) {
    let answeredItem = []
    itemsSubmitted.forEach((element) => {
      let listGroups = $('.list-group .list-group-item input[name=' + element.name + ']')
      let itemSel = listGroups.parentsUntil('ul').parent()
      answeredItem.push(itemSel.first()[0])
    })
    $('#collapseAnsweredQuestions').empty()
    answeredItem.forEach((element) => {
      $('#collapseAnsweredQuestions').append($(element))
      let questionDataNum = $(element).attr('data-number') // display by block
      $('.question-item-' + questionDataNum).removeAttr('style') // still does not say something (no styling)
    })
  },
  displayNotDoneMessage (itemsArray, numCheckedItems) {
    // display when:
    // 1) the timer is set, there still more time, and there still unanswered item(s)
    // 2) the timer is not set, and there still unanswered item(s)
    if (TestOptions.isTimerSet && !Timer.isNoMoreTime && numCheckedItems !== QuizSubmission.quizIds.length) {
      QuizSubmission.notDoneAlertMessage(itemsArray)
    } else if (!TestOptions.isTimerSet && numCheckedItems !== QuizSubmission.quizIds.length) {
      QuizSubmission.notDoneAlertMessage(itemsArray)
    } else {
      CustomAlert.getQuizSubmittedAlert()
      // disabled Done and Submit buttons
      $(QuizSubmission.formId).find('button#finish-quiz').addClass('disabled')
      $(QuizSubmission.formId).find('button#submit-quiz').addClass('disabled')
    }
  },
  notDoneAlertMessage (itemsArray) {
    let num = (itemsArray.length > 0 ? itemsArray.join(', ') : 'none')
    return CustomAlert.displayAlert(
      'warning',
      'There are questions left unanswered.',
      'Question(s) answered so far: ' + num,
      5
    )
  }
}
const QuizResultNum = {
  numCorrectAnswers: null,
  numOfQuestions: null,
  accuracyPercent: null,
  calcAccuracy () {
    return (QuizResultNum.numCorrectAnswers / QuizResultNum.numOfQuestions) * 100
  },
  setConstruct (args) {
    QuizResultNum.numCorrectAnswers = args.numCorrectAnswers
    QuizResultNum.numOfQuestions = TestOptions.numberOfQuestions
    QuizResultNum.accuracyPercent = QuizResultNum.calcAccuracy()
  }
}
