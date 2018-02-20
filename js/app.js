const TestOptions = {
  isTimerSet: false, minutes: null, numberOfQuestions: null, testOptionsFormHTML: null,
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
        values.push(element) // store form fields values
      })
      // user selections
      TestOptions.setNumberOfQuestions(values[0].value)
      TestOptions.setIsTimerSet(values[1].value)
      TestOptions.setMinutesByNumQuestions(values[0].value)
      // prints current session specs
      TestOptions.customToString()
      // pass user selection
      LoadQuestionItems.load(function (output) {
        QCatalog.setCatalog(output)
        console.log(output)
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
const QCatalog = { // creates and displays the questions
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
    ///////////////////////////////////////
    QCatalog.catalog = aCatalog
    let item = $(QCatalog.catalog).find('ITEM')
    QCatalog.catalog.catalogLength = item.length
    let h = ''
    h += QCatalog.catalogMapper(h, item)
    $(QCatalog.questionForm).empty()
    h += Templates.finishNextPrevButtons()
    $(QCatalog.questionForm).append(h)
    ///////////////////////////////////////
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
      let userAnswers = {itemsWithAnswer: $(QuizSubmission.formId).serialize()}
      if (userAnswers.itemsWithAnswer !== '' || userAnswers.itemsWithAnswer.indexOf('=') !== -1 ||
        userAnswers.itemsWithAnswer.indexOf('&') !== -1) {
        QuizSubmission.setAnsweredItems($(QuizSubmission.formId).serializeArray())
        LoadResults.setQueryString(userAnswers)
        LoadResults.load(function (data) {
          console.log(data)
        })
      } else {
        CustomAlert.displayAlert(Str.info, Str.noAnswered,
          'Please answer some question before submitting the quiz.',
          10
        )
      }
      event.preventDefault()
      return false
    })
  },
  setAnsweredItems (itemsSubmitted) {
    let answeredItem = [] // holds answered items to be displayed in result view
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
    if (TestOptions.isTimerSet && !Timer.isNoMoreTime && numCheckedItems !== QuizSubmission.quizIds.length) {
      QuizSubmission.notDoneAlertMessage(itemsArray)
    } else if (!TestOptions.isTimerSet && numCheckedItems !== QuizSubmission.quizIds.length) {
      QuizSubmission.notDoneAlertMessage(itemsArray)
    } else {
      // CustomAlert.getQuizSubmittedAlert()
      // disabled Done and Submit buttons
      $(QuizSubmission.formId).find('button#finish-quiz').addClass('disabled')
      $(QuizSubmission.formId).find('button#submit-quiz').addClass('disabled')
    }
  },
  notDoneAlertMessage (itemsArray) {
    let num = (itemsArray.length > 0 ? itemsArray.join(', ') : 'none')
    return CustomAlert.displayAlert(
      Str.warning,
      'The current quiz session is not completed.',
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
