const LoadQuestionItems = {
  load(handleData) {
    const options = {
      regionId: DEFAULT_REGION_ID,
      limit: TestOptions.numberOfQuestions,
      dateTime: new Date().getTime(),
      timer: TestOptions.isTimerSet,
    };
    $.ajax({
      type: 'GET',
      url: 'model/cct-questions.php',
      data: options,
      dataType: 'xml',
      success(xml) {
        handleData(xml);
      },
      error() {},
    });
  },
};
const LoadResults = {
  queryString: null,
  setQueryString(userAnswers) {
    LoadResults.queryString = userAnswers;
  },
  load(handleData) {
    $.ajax({
      type: 'GET',
      url: 'model/cct-results.php',
      data: LoadResults.queryString,
      success(xml) {
        handleData(xml);
      },
      error() {},
    });
  },
};
