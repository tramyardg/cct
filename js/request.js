const LoadQuestionItems = {
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
const LoadResults = {
  queryString: null,
  setQueryString (userAnswers) {
    LoadResults.queryString = userAnswers
  },
  load: function (handleData) {
    $.ajax({
      type: 'GET',
      url: 'model/cct-results.php',
      data: LoadResults.queryString,
      success: function (xml) {
        handleData(xml)
      },
      error: function () {}
    })
  }
}
